import React, { useState, useEffect } from 'react';
import {
    Menu,
    Input,
    Button,
    Row,
    Col,
    Dropdown,
    Space,
    Tooltip,
    notification,
    Select
} from 'antd';
import 'antd/dist/antd.css';
import { BellOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import FormWorkspace from 'pages/workspace/FormWorkspace';
import {
    ROOT_API,
    API_RECEIVE_NOTIFICATION,
    API_WORKSPACE_USER_INVITE,
    API_NOTIFICATION_DELETE,
    API_WORKSPACE_USER,
    API_WORKSPACE,
    API_WORKSPACE_SEARCH
} from '../constant/api';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const MenuLayout = ({ getOwnWorkspace, getListWorkspace }) => {
    const [visible, setVisible] = useState(false);
    const [isInsert, setIsInsert] = useState(true);
    const [listNotification, setListNotification] = useState([]);
    const [listWorkspace, setListWorkspace] = useState([]);

    const history = useHistory();

    const logout = () => {
        window.localStorage.removeItem('auth_user');
        window.localStorage.removeItem('token_expire_time');
        // window.localStorage.removeItem('jwt_token');
        window.location.href = '/login';
    }

    const profile = () => {
        //window.localStorage.removeItem('auth_user');
        //window.localStorage.removeItem('token_expire_time');
        // window.localStorage.removeItem('jwt_token');
        history.push('profile');
    }

    const getNotification = () => {
        axios.get(ROOT_API + API_RECEIVE_NOTIFICATION, { headers: { "Authorization": `Bearer ${window.localStorage.getItem('jwt_token')}` } }).then(res => {
            setListNotification(res.data);
        })
    }

    const getListWorkspace2 = () => {
        axios.post(ROOT_API + API_WORKSPACE_SEARCH, {
            pageSize: 1000,
            pageIndex: 0,
            userId: JSON.parse(window.localStorage.getItem('auth_user')).id
        }).then(res => {
            res.data.content = res.data.content.filter(o => o.parent == null);
            setListWorkspace(res.data.content);
        })
    }

    let userJSON;
    useEffect(() => {
        userJSON = window.localStorage.getItem('auth_user');
        getNotification();
        getListWorkspace2();
    }, []);

    const menuUser = (
        <Menu
            style={{
                width: 200
            }}
        >
            <Row
                style={{
                    display: 'flex',
                    alignItem: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    borderBottom: '1px solid #999'
                }}
            >
                <Col span={6}>
                    <div
                        style={{
                            width: 25,
                            height: 25,
                            margin: 'auto',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translateY(-50%) translateX(-50%)'
                        }}
                    >
                        <img src='https://crm-v2-dev.247post.vn/images/avatar.png' style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translateY(-50%) translateX(-50%)'
                        }} />
                    </div>
                </Col>
                <Col span={18}>
                    <span>userK</span>
                    <p style={{ marginBottom: 0 }}>hieu@gmail.com</p>
                </Col>
            </Row>
            <Menu.Item onClick={profile}>
                Thông tin
            </Menu.Item>
            <Menu.Item onClick={logout}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    const deleteNoti = (id) => {
        axios.delete(ROOT_API + API_RECEIVE_NOTIFICATION + '/' + id).then(res => {
            getNotification();
        })
    }

    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    const acceptInvite = (workspaceId, notiId) => {
        axios.put(ROOT_API + API_WORKSPACE_USER + '/invite/' + workspaceId + '/' + true).then(res => {
            console.log(res);
            openNotificationWithIcon('success', 'Join Workspace success');
            deleteNoti(notiId);
            getListWorkspace();
            getNotification();
        }).catch(err => {
            openNotificationWithIcon('error', 'Join Workspace fail');
        })
    }

    const notificationList = (
        <Space style={{ width: 400 }}>
            {listNotification.map((item, index) => {
                return (
                    <Row style={{ width: '100%' }} key={index}>
                        <Col span={20}>
                            {item.notificationDto.content}
                        </Col>
                        <Col span={4} style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Tooltip title="Đồng ý">
                                <CheckCircleOutlined
                                    style={{
                                        fontSize: 20,
                                        color: '#17A589'
                                    }}
                                    onClick={() => { acceptInvite(item.notificationDto.workspaceId, item.id) }}
                                />
                            </Tooltip>
                            <Tooltip title="Từ chối">
                                <CloseCircleOutlined
                                    style={{
                                        fontSize: 20,
                                        color: '#E74C3C'
                                    }}
                                    onClick={() => deleteNoti(item.id)}
                                />
                            </Tooltip>
                        </Col>
                    </Row>
                );
            })}
        </Space >
    );

    return (
        <div>
            <Menu mode="horizontal" style={{ height: 46 }}>
                <Row
                    style={{
                        width: '100%'
                    }}
                >
                    <Col span={8}>
                        {/* <Input.Search
                            style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                marginLeft: 10
                            }}
                        /> */}
                        <Select
                            placeholder="Tìm workspace"
                            showSearch
                            filterOption="children"
                            style={{ width: '100%', marginLeft: 10 }}
                            onChange={(e) => history.push('/workspace?id=' + e + '&type=manager')}
                        >
                            {listWorkspace.map((item, index) => {
                                return (
                                    <Select.Option value={item.id} key={index}>
                                        {item.name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Col>
                    <Col span={14}
                        style={{
                            display: 'flex',
                            justifyContent: 'end'
                        }}
                    >
                        <Button style={{ marginTop: 7 }} type="primary" onClick={() => setVisible(true)}>Tạo không gian làm việc mới</Button>
                    </Col>
                    <Col span={1} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Dropdown overlay={notificationList} trigger={['click']}>
                            <div>
                                <BellOutlined
                                    style={{
                                        fontSize: 20,
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)'
                                    }}
                                >
                                </BellOutlined>
                                {listNotification.length > 0 &&
                                    <div
                                        style={{
                                            backgroundColor: 'red',
                                            color: '#fff',
                                            width: 20,
                                            height: 20,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 100,
                                            marginTop: 20,
                                            marginLeft: 9
                                        }}
                                    >1</div>
                                }
                            </div>
                        </Dropdown>
                    </Col>
                    <Col span={1}>
                        <Dropdown overlay={menuUser} placement="bottomRight">
                            <div
                                style={{
                                    width: 30,
                                    height: 30,
                                    margin: 'auto',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translateY(-50%) translateX(-50%)'
                                }}
                            >
                                <img src='https://crm-v2-dev.247post.vn/images/avatar.png' style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translateY(-50%) translateX(-50%)'
                                }} />
                            </div>
                        </Dropdown>
                    </Col>
                </Row>
            </Menu>
            <FormWorkspace
                getOwnWorkspace={getOwnWorkspace}
                visible={visible}
                setIsVisible={setVisible}
                isInsert={isInsert}
            />
        </div>
    );
}

export default MenuLayout;