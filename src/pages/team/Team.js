import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import {
    Card,
    Row,
    Col,
    Button,
    Space,
    Tooltip,
    Table,
    Modal,
    notification
} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    API_TEAM,
    API_TEAM_SEARCH,
    ROOT_API
} from '../../components/constant/api';
import FormTeam from './FormTeam';

const Team = () => {
    const [listTeam, setListTeam] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const [visibleUser, setVisibleUser] = useState(false);
    const [currentUsers, setCurrentUsers] = useState([]);
    const [teamDetail, setTeamDetail] = useState({});

    const getListTeam = () => {
        axios.post(ROOT_API + API_TEAM_SEARCH, {
            pageIndex: pageIndex,
            pageSize: pageSize,
            hostId: JSON.parse(window.localStorage.getItem('auth_user'))?.id
        }).then(res => {
            setListTeam(res.data.content);
        })
    }

    useEffect(() => {
        getListTeam();
    }, []);

    const openModalTeam = () => {
        setIsCreate(true);
        setVisible(true);
    }

    const openModalUser = (data) => {
        setCurrentUsers(data.filter(o => o.user.id != JSON.parse(window.localStorage.getItem('auth_user')).id));
        setVisibleUser(true);
    }

    const editTeam = (record) => {
        setTeamDetail(record);
        setIsCreate(false);
        setVisible(true);
    }

    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    const deleteTeam = (id) => {
        Modal.confirm({
            title: "Bạn có muốn xóa nhóm này không?",
            okText: "Đồng ý",
            okType: "danger",
            cancelText: "Hủy",
            onOk() {
                axios.delete(ROOT_API + API_TEAM + '/' + id).then(res => {
                    openNotificationWithIcon('success', 'Xóa nhóm thành công');
                    getListTeam();
                }).catch(err => {
                    console.log(err);
                    openNotificationWithIcon('error', 'Có lỗi xảy ra');
                });
                // getListWorkspace();
                // getOwnWorkspace();
                // history.push('/');
            },
            onCancel() { },
        });
    }

    const columns = [
        {
            title: 'STT',
            key: 'STT',
            render: (text, record, index) => <span>{index + 1}</span>
        },
        {
            title: 'Tên',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: 'Mô tả',
            key: 'description',
            dataIndex: 'description'
        },
        {
            title: 'Thành viên',
            key: 'users',
            render: (text, record) => {
                return (
                    <Tooltip title="Danh sách thành viên">
                        <UserOutlined
                            className="icon_action"
                            style={{
                                color: '#58D68D'
                            }}
                            onClick={() => openModalUser(record.teamUsers)}
                        />
                    </Tooltip>
                );
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (text, record) => {
                return (
                    <span>
                        <Tooltip title="Sửa">
                            <EditOutlined
                                className="icon_action"
                                style={{
                                    color: '#3498DB'
                                }}
                                onClick={() => editTeam(record)}
                            />
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <DeleteOutlined
                                className="icon_action"
                                style={{
                                    color: '#E74C3C'
                                }}
                                onClick={() => deleteTeam(record.id)}
                            />
                        </Tooltip>
                    </span>

                );
            }
        },
    ];

    const columnUser = [
        {
            title: 'STT',
            key: 'STT',
            render: (text, record, index) => <span>{index + 1}</span>
        },
        {
            title: 'Tên',
            key: 'name',
            render: (text, record) => <span>{record.user.username}</span>
        },
        {
            title: 'Email',
            key: 'email',
            render: (text, record) => <span>{record.user.email}</span>
        },
    ]

    return (
        <React.Fragment>
            <Card
                title={[
                    <Row>
                        <Col span={12}>
                            Nhóm
                        </Col>
                        <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button type='primary' onClick={openModalTeam}>Tạo nhóm</Button>
                        </Col>
                    </Row>
                ]}
            >
                <Table
                    columns={columns}
                    dataSource={listTeam}
                />
            </Card>
            <FormTeam
                visible={visible}
                setVisible={setVisible}
                isCreate={isCreate}
                getListTeam={getListTeam}
                teamDetail={teamDetail}
            />
            <Modal
                title="Danh sách thành viên"
                footer={false}
                visible={visibleUser}
                onCancel={() => setVisibleUser(false)}
                width={800}
            >
                <Table
                    columns={columnUser}
                    dataSource={currentUsers}
                />
            </Modal>
        </React.Fragment>
    );
}

export default Team;