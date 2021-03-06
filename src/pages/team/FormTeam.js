import {
    Modal,
    Form,
    Select,
    Input,
    notification
} from 'antd';
import {
    API_TEAM,
    API_TEAM_SEARCH,
    ROOT_API,
    API_USER
} from '../../components/constant/api';
import axios from 'axios';
import { useEffect, useState } from 'react';

const { Option } = Select;

const FormTeam = ({ visible, setVisible, isCreate, getListTeam, teamDetail }) => {
    const [form] = Form.useForm();
    const [listUser, setListUser] = useState([]);
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };

    useEffect(() => {
        if (!isCreate) {
            let userArr = [];
            teamDetail.teamUsers.filter(o => o.user.id != JSON.parse(window.localStorage.getItem('auth_user')).id).forEach(e => {
                userArr.push(e.user.id);
            })
            form.setFieldsValue({
                name: teamDetail.name,
                description: teamDetail.description,
                listUser: userArr
            });
        }
    }, [teamDetail]);

    const getUsers = () => {
        axios.get(ROOT_API + API_USER + '/1/1000', { headers: { "Authorization": `Bearer ${window.localStorage.getItem('jwt_token')}` } }).then(res => {
            let userArr = [];
            res.data.content.forEach(element => {
                if (element.id != JSON.parse(window.localStorage.getItem('auth_user')).id) {
                    userArr.push(element);
                }
            });
            setListUser(userArr);
        })
    }

    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    const onSubmit = () => {
        form.validateFields().then(value => {
            let listUser = [];
            value.listUser.forEach(element => {
                let obj = {};
                obj.id = element
                listUser.push(obj);
            });
            value.users = listUser;
            value.hostId = JSON.parse(window.localStorage.getItem('auth_user')).id;
            delete value.listUser;
            console.log(value);
            if (isCreate) {
                axios.post(ROOT_API + API_TEAM, value).then(res => {
                    console.log(res);
                    openNotificationWithIcon('success', 'Th??m nh??m th??nh c??ng');
                    getListTeam();
                    setVisible(false);
                    form.resetFields();
                }).catch(err => {
                    openNotificationWithIcon('success', 'Th??m nh??m th???t b???i');
                })
            } else {
                axios.put(ROOT_API + API_TEAM + '/' + teamDetail.id, value).then(res => {
                    console.log(res);
                    openNotificationWithIcon('success', 'C???p nh???t nh??m th??nh c??ng');
                    getListTeam();
                    setVisible(false);
                    form.resetFields();
                }).catch(err => {
                    openNotificationWithIcon('success', 'C?? l???i x???y ra');
                })
            }
        })
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Modal
            title="T???o nh??m"
            visible={visible}
            onCancel={() => setVisible(false)}
            onOk={onSubmit}
        >
            <Form
                form={form}
                {...layout}
                labelAlign="left"
            >
                <Form.Item
                    label="T??n"
                    name="name"
                    rules={[
                        { required: true, message: 'Vui l??ng nh???p t??n nh??m' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="M?? t???"
                    name="description"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Th??nh vi??n"
                    name="listUser"
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                    >
                        {listUser.map((item, index) => {
                            return (
                                <Option key={index} value={item.id}>{item.username}</Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default FormTeam;