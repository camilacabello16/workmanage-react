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
import axios from 'axios';
import { API_ENPOINT } from 'components/constant/api';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic Y29yZV9jbGllbnQ6c2VjcmV0'
    }
}

const Login = () => {
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    const onFinish = async (values) => {
        let requestBody = 'client_id=core_client&grant_type=password&client_secret=secret';
        requestBody = requestBody + '&username=' + values.userName + '&password=' + values.password;
        const res = await axios.post(API_ENPOINT + '/oauth/token', requestBody, config).then(response => {
            console.log(response);
            var dateObj = new Date(Date.now() + response.data.expires_in * 1000);
            window.localStorage.setItem("token_expire_time", dateObj);
            setSession(response.data.access_token);
        }).catch(err => {
            console.log(err);
            openNotificationWithIcon("error", "Username or password wrong");
        });
        //alert('Here')
        await getCurrentUser().then(res => {
            console.log(res);
            setLoginUser(res.data);
        });

        await getAllMenuItemByRoleList().then(res => {
            //window.localStorage.setSessionItem("navigations",res.data);
            //window.localStorage.setLocalStorageItem("navigations", res.data);
            openNotificationWithIcon("success", "Login success");
            window.location.href = "/";
        });

        //window.localStorage.setItem('user', JSON.stringify(values));
        // openNotificationWithIcon("success", "Login success")
        // window.location.href = "/";
    };

    const getAllMenuItemByRoleList = async () => {
        var url = API_ENPOINT + "/api/menuitem/getmenubyuser";
        return axios.get(url);
    };

    const setLoginUser = async (user) => {
        window.localStorage.setItem("auth_user", JSON.stringify(user));
        return user;
    }

    const getCurrentUser = async () => {
        let url = API_ENPOINT + "/api/users/getCurrentUser";
        return await axios.get(url);
    };

    const setSession = (token) => {
        if (token) {
            window.localStorage.setItem("jwt_token", token);
            cookies.set("jwt_token", token, { path: '/' });
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            window.localStorage.removeItem('jwt_token');
            //delete axios.defaults.headers.common["Authorization"];
        }
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