import React, { useState, useEffect } from "react";
import {
    Menu,
    Row,
    Col,
    Button,
    Tabs,
    Card,
    Form,
    Select,
    notification,
    Input,
    DatePicker,
    Space,
} from 'antd';
import moment from "moment";
import { DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import axios from "axios";
import { API_RESGISTER } from "components/constant/api";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const { TabPane } = Tabs;
const { Option } = Select;

const ProfileManage = () => {
    const [activeKey, setActiveKey] = useState('1');
    const [form] = Form.useForm();
    var object = {};
    let userJSON;
    useEffect(() => {
        userJSON = window.localStorage.getItem('auth_user');
        if (userJSON && userJSON != '') {
            openNotificationWithIcon("success", "Username or password correct");
            form.setFieldsValue({
                displayName: JSON.parse(userJSON).displayName,
                email: JSON.parse(userJSON).email,
                birthday: moment(JSON.parse(userJSON).dob)
            })
            getData();
        } else {
            openNotificationWithIcon("error", "Username or password wrong");
        }
    }, [])
    const getData = () => {
        userJSON = window.localStorage.getItem('auth_user');
        object.id = JSON.parse(userJSON).id;
        object.username = JSON.parse(userJSON).username;
        object.roles = [{
            id: 4,
            name: "ROLE_USER",
            description: null,
            authority: "ROLE_USER"
        }]
        object.active = true;
        object.email = JSON.parse(userJSON).email;
        object.person = {
            displayName: JSON.parse(userJSON).displayName,
            gender: "M",
            id: JSON.parse(userJSON).person.id,
            birthDate: JSON.parse(userJSON).dob
        }
    }
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };
    const onFinishTab1 = async (values) => {
        getData();
        object.person.displayName = values.displayName;
        object.person.birthDate = values.birthday;
        axios.post(API_RESGISTER, object).then(response => {
            openNotificationWithIcon("success", "Cập nhật tên thành công");
            window.localStorage.setItem("auth_user", JSON.stringify(response.data));
            console.log(object);
        }).catch(err => {
            console.log(err);
            openNotificationWithIcon("error", "Lỗi hệ thống(displayName)");
        });
    };
    const onFinishTab2 = async (values) => {
        getData();
        object.email = values.email;
        axios.post(API_RESGISTER, object).then(response => {
            openNotificationWithIcon("success", "Cập nhật Email thành công");
            window.localStorage.setItem("auth_user", JSON.stringify(response.data));
            console.log(object);
        }).catch(err => {
            console.log(err);
            openNotificationWithIcon("error", "Lỗi hệ thống(Email)");
        });
    };
    const onFinishTab3 = async (values) => {
        getData();
        object.password = values.newPassword;
        object.changePass = true;
        axios.post(API_RESGISTER, object).then(response => {
            openNotificationWithIcon("success", "Cập nhật mật khẩu thành công");
            window.localStorage.setItem("auth_user", JSON.stringify(response.data));
            console.log(object);
        }).catch(err => {
            console.log(err);
            console.log(object);
            openNotificationWithIcon("error", "Lỗi hệ thống(password)");
        });
    };

    return (
        <Tabs defaultActiveKey={activeKey} onChange={(e) => setActiveKey(e)}>
            <TabPane tab="Hồ sơ và hiển thị" key="1" >
                <h3>Giới thiệu về bạn</h3>
                <Card >
                    <Form onFinish={onFinishTab1} form={form}>
                        <Row>
                            <Col span={4}>
                                <span>Họ tên</span>
                            </Col>
                            <Col span={20} style={{ textAlign: 'right' }}>
                                <p>Ai có thể thấy nội dung này?</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <Form.Item name="displayName" >
                                    <Input style={{ width: '100%', textAlign: 'left' }}>
                                    </Input>
                                </Form.Item>
                            </Col>
                            <Col span={16} style={{ textAlign: 'right' }}>
                                <Select style={{ width: '30%', textAlign: 'left' }} placeholder="Bất kỳ ai" disabled={true}
                                >
                                    <Option>
                                        <DeleteOutlined style={{ marginRight: 5 }} />
                                        <span style={{ marginTop: 50 }} >Mọi người</span>
                                    </Option>
                                    <Option>
                                        <DeleteOutlined style={{ marginRight: 5 }} />
                                        <span>Chỉ mình tôi</span>
                                    </Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <span>Ngày sinh</span>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                <p>Ai có thể thấy nội dung này?</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} >
                                <Form.Item name="birthday" placeholder="Chọn ngày sinh">
                                    <DatePicker />
                                </Form.Item>
                            </Col>
                            <Col span={16} style={{ textAlign: 'right' }}>
                                <Select style={{
                                    width: '30%',
                                    textAlign: 'left'
                                }}
                                    placeholder="Bất kỳ ai"
                                    disabled={true}
                                >
                                </Select>
                            </Col>
                        </Row>
                        <Col span={4} style={{ marginTop: 30 }}>
                            <Button type="primary" htmlType="submit">
                                Lưu thay đổi
                            </Button>
                        </Col>
                    </Form>
                </Card>
            </TabPane>
            <TabPane tab="Email" key="2">
                <Form
                    layout="vertical"
                    autoComplete="off"
                    style={{ width: '50%' }}
                    onFinish={onFinishTab2}
                    form={form}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'email',
                                warningOnly: true,
                            },
                            {
                                type: 'string',
                            },
                        ]}
                    >
                        <Input style={{ width: '100%', textAlign: 'left' }}>
                        </Input>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Lưu thay đổi
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </TabPane>
            <TabPane tab="Bảo mật" key="3">
                <Form
                    name="basic"
                    wrapperCol={{
                        span: 8,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    onFinish={onFinishTab3}
                >
                    <Form.Item
                        label="Mật khẩu mới*"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập mật khẩu mới',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 8,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </TabPane>
        </Tabs >
    );
}

export default ProfileManage;