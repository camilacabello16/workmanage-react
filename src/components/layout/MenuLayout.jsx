import React, { useState, useEffect } from 'react';
import {
    Menu,
    Input,
    Button,
    Row,
    Col,
    Dropdown
} from 'antd';
import 'antd/dist/antd.css';
import { BellOutlined } from '@ant-design/icons';

const MenuLayout = () => {
    const logout = () => {
        window.localStorage.removeItem('user');
        window.location.href = '/login';
    }

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
                    <span>Duc Hieu</span>
                    <p style={{ marginBottom: 0 }}>hieu@gmail.com</p>
                </Col>
            </Row>
            <Menu.Item>
                Profile
            </Menu.Item>
            <Menu.Item onClick={logout}>
                Logout
            </Menu.Item>
        </Menu>
    )

    return (
        <div>
            <Menu mode="horizontal" style={{ height: 46 }}>
                <Row
                    style={{
                        width: '100%'
                    }}
                >
                    {/* <Col span={2}>
                        <Menu.Item key="logo" style={{ color: '#fff' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <img
                                    src={require('../../asset/logo2.jpg')}
                                    style={{
                                        width: 25,
                                        height: 25,
                                        marginRight: 10
                                    }}
                                />
                                <span>Joinco</span>
                            </div>
                        </Menu.Item>
                    </Col> */}
                    {/* <Col span={2}>
                        <Menu.SubMenu
                            key="workspace"
                            title="Workspaces"
                            style={{ color: '#fff' }}
                        >
                            <Menu.Item key="1" >workspace1</Menu.Item>
                            <Menu.Item key="2" >workspace2</Menu.Item>
                        </Menu.SubMenu>
                    </Col> */}
                    <Col span={8}>
                        <Input.Search
                            style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                marginLeft: 10
                            }}
                        />
                    </Col>
                    <Col span={14}></Col>
                    {/* <Col span={4} style={{ textAlign: 'center' }}>
                        <Menu.Item key="create">
                            <Button type="primary">Create Workspace</Button>
                        </Menu.Item>
                    </Col> */}

                    <Col span={1} style={{ display: 'flex', justifyContent: 'center' }}>
                        <BellOutlined
                            style={{
                                fontSize: 20,
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)'
                            }}
                        />
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
        </div>
    );
}

export default MenuLayout;