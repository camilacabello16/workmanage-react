import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    Card,
    Button,
    notification,
    Space
} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_RESGISTER, API_CHECK_EMAIL, API_CHECK_USERNAME } from 'components/constant/api';
const Registration = () => {
    var object = {};
    let gotoLogin = false;
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };
    useEffect(() => {
        if (gotoLogin) {
            window.location.href = '/login';
        }
    }, [])
    const onCheckEmail = async (values) => {
        let requestBody = 'email=' + values.email;
        // console.log(API_RESGISTER + API_CHECK_EMAIL + requestBody);
        const res = await axios.post(API_RESGISTER + API_CHECK_EMAIL, requestBody).then(response => {
            if (!response.data) {

                onCheckUserName(values);
            }
            else {
                openNotificationWithIcon("error", "Email đã tồn tại");
            }
        }).catch(err => {
            console.log(err);
            openNotificationWithIcon("error", "Có lỗi xảy ra");
        });
    };
    const onCheckUserName = async (values) => {
        // console.log(API_RESGISTER + API_CHECK_USERNAME + values.userName);
        const res = await axios.get(API_RESGISTER + API_CHECK_USERNAME + values.userName).then(response => {
            if (!response.data) {

                onFinish(values);
            }
            else {
                openNotificationWithIcon("error", "Tên đã tồn tại");
            }
        }).catch(err => {
            console.log(err);
            openNotificationWithIcon("error", "Có lỗi xảy ra");
        });
    };
    const onFinish = (values) => {
        object.roles = [{
            id: 4,
            name: "ROLE_USER",
            description: null,
            authority: "ROLE_USER"
        }]
        object.active = true;
        object.email = values.email;
        object.person = {
            displayName: values.name,
            gender: "M"
        }
        object.username = values.userName;
        object.password = values.password;
        axios.post(API_RESGISTER, object).then(response => {
            setTimeout(() => {
                window.location.href = '/login';
            }, [2000]);
            openNotificationWithIcon("success", "Đăng kí thành công. Đăng nhập để tiếp tục!");
        }).catch(err => {
            console.log(err);
            openNotificationWithIcon("error", "Có lỗi xảy ra");
        });
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                backgroundImage: 'url(https://crm-v2-dev.247post.vn/images/bg.svg)',
                position: 'relative',
                backgroundColor: '#99999921'
            }}
        >
            <Space
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingTop: 15
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            width: 100,
                            height: 100
                        }}
                    >
                        <img
                            src={require('../../asset/logo3.png')}
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </div>
                    <span
                        style={{
                            fontSize: 40,
                            fontWeight: 'bold'
                        }}
                    >Joinco</span>
                </div>
                {/* <p
                    style={{
                        fontSize: 20
                    }}
                >Chào mừng đến với Joinco</p> */}
            </Space>
            <Card
                style={{
                    width: '25%',
                    margin: 'auto',
                    //paddingTop: 200,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                    //padding: 30,
                    // border: '1px solid',
                    // borderRadius: 5
                }}
                bordered
            >
                <Form
                    onFinish={onCheckEmail}
                >
                    <Form.Item
                        name="userName"
                        rules={[
                            { required: true, message: 'Tài khoản không được bỏ trống' }
                        ]}
                    >
                        <Input
                            style={{ width: '100%', padding: 8 }}
                            placeholder="Tài khoản"
                        />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: 'Tên không được bỏ trống' }
                        ]}
                    >
                        <Input
                            style={{ width: '100%', padding: 8 }}
                            placeholder="Tên"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Email không được bỏ trống' },
                            { type: 'email' }
                        ]}
                    >
                        <Input
                            style={{ width: '100%', padding: 8 }}
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Mật khẩu không được bỏ trống' }
                        ]}
                        style={{ marginTop: 10 }}
                    >
                        <Input type={"password"} style={{ width: '100%', padding: 8 }} placeholder="Mật khẩu" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Xác nhận mật khẩu không chính xác'));
                                },
                            }),
                        ]}
                        style={{ marginTop: 10 }}
                    >
                        <Input type={"password"} style={{ width: '100%', padding: 8 }} placeholder="Xác nhận mật khẩu" />
                    </Form.Item>
                    <p>Bạn đã có tài khoản? <Link onClick={() => window.location.href = '/login'} >Đăng nhập ngay</Link></p>
                    <Button
                        type='primary'
                        htmlType='submit'
                        style={{
                            width: '100%',
                            // backgroundColor: '#17A589',
                            // borderColor: '#17A589',
                            height: 40
                        }}
                    >Sign Up</Button>
                </Form>
            </Card>
        </div>
    );
}

export default Registration;