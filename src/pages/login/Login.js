import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Form,
    Input,
    Card,
    Button,
    notification
} from 'antd'

const Login = () => {
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    const onFinish = (values) => {
        console.log(values);
        window.localStorage.setItem('user', JSON.stringify(values));
        openNotificationWithIcon("success", "Login success")
        window.location.href = "/home";
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
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="userName"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên đăng nhập' }
                        ]}
                    >
                        <Input
                            style={{ width: '100%', padding: 8 }}
                            placeholder="Tên đăng nhập"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu' }
                        ]}
                        style={{ marginTop: 10 }}
                    >
                        <Input type={"password"} style={{ width: '100%', padding: 8 }} placeholder="Mật khẩu" />
                    </Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        style={{
                            width: '100%',
                            // backgroundColor: '#17A589',
                            // borderColor: '#17A589',
                            height: 40
                        }}
                        >Đăng nhập</Button>
                </Form>
            </Card>
        </div>
    );
}

export default Login;