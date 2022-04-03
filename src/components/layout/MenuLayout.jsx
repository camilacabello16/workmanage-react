import React, { useState, useEffect } from 'react';
import {
    Menu,
    Input,
    Button,
    Row,
    Col,
    Dropdown,
    Space,
    Tooltip
} from 'antd';
import 'antd/dist/antd.css';
import { BellOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

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
    );

    const notificationList = (
        <Space style={{ width: 400 }}>
            <Row style={{ width: '100%' }}>
                <Col span={20}>
                    Hiếu mời bạn vào workspace
                </Col>
                <Col span={4} style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Tooltip title="Đồng ý">
                        <CheckCircleOutlined
                            style={{
                                fontSize: 20,
                                color: '#17A589'
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Từ chối">
                        <CloseCircleOutlined
                            style={{
                                fontSize: 20,
                                color: '#E74C3C'
                            }}
                        />
                    </Tooltip>
                </Col>
            </Row>
            <Row style={{ width: '100%' }}>
                <Col span={20}>
                    Hiếu mời bạn vào workspace
                </Col>
                <Col span={4} style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Tooltip title="Đồng ý">
                        <CheckCircleOutlined
                            style={{
                                fontSize: 20,
                                color: '#17A589'
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Từ chối">
                        <CloseCircleOutlined
                            style={{
                                fontSize: 20,
                                color: '#E74C3C'
                            }}
                        />
                    </Tooltip>
                </Col>
            </Row>
            <Row style={{ width: '100%' }}>
                <Col span={20}>
                    Hiếu mời bạn vào workspace
                </Col>
                <Col span={4} style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Tooltip title="Đồng ý">
                        <CheckCircleOutlined
                            style={{
                                fontSize: 20,
                                color: '#17A589'
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Từ chối">
                        <CloseCircleOutlined
                            style={{
                                fontSize: 20,
                                color: '#E74C3C'
                            }}
                        />
                    </Tooltip>
                </Col>
            </Row>
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
                    <Col span={1} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Dropdown overlay={notificationList} trigger={['click']}>
                            <BellOutlined
                                style={{
                                    fontSize: 20,
                                    position: 'absolute',
                                    top: '50%',
                                    transform: 'translateY(-50%)'
                                }}
                            />
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
        </div>
    );
}

export default MenuLayout;