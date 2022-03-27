import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Form,
    Input,
    Card,
    Button,
    notification,
    Space,
    Image
} from 'antd';
import { Link } from 'react-router-dom';

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
        window.location.href = "/";
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
                    paddingTop: 80
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
                <p
                    style={{
                        fontSize: 20
                    }}
                >Welcome to joinco.com</p>
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
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="userName"
                        rules={[
                            { required: true, message: 'Username is required' }
                        ]}
                    >
                        <Input
                            style={{ width: '100%', padding: 8 }}
                            placeholder="User Name"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Password is required' }
                        ]}
                        style={{ marginTop: 10 }}
                    >
                        <Input type={"password"} style={{ width: '100%', padding: 8 }} placeholder="Password" />
                    </Form.Item>
                    <p>Don't have an account yet? <Link to={"/registration"} onClick={() => window.localStorage.setItem('isSignUp', true)}>Sign up</Link></p>
                    <Button
                        type='primary'
                        htmlType='submit'
                        style={{
                            width: '100%',
                            // backgroundColor: '#17A589',
                            // borderColor: '#17A589',
                            height: 40
                        }}
                    >Log In</Button>
                </Form>
            </Card>
        </div>
    );
}

export default Login;