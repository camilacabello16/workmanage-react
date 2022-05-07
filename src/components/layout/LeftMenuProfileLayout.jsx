import React, { useState, useEffect } from 'react';
import { Menu, Button } from 'antd';
import 'antd/dist/antd.css';
import {
    PieChartOutlined,
    UnorderedListOutlined,
    MenuOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

const LeftMenuProfileLayout = () => {
    return (
        <Menu
            defaultSelectedKeys={['5']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            style={{
                height: '100%'
            }}
            theme="dark"
        >
            <Menu.Item>
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
                            width: 40,
                            height: 40,
                            marginRight: 10
                        }}
                    />
                    <span
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}
                    >Joinco</span>
                </div>
            </Menu.Item>
            <Menu.Item key="ProfileAndShow">Hồ sơ và hiển thị</Menu.Item>
            <Menu.Item key="Email">Email</Menu.Item>
            <Menu.Item key="Private">Bảo mật</Menu.Item>
            <Menu.Item key="Account option">Tùy chọn tài khoản</Menu.Item>
            <Menu.Item key="Connect">Các ứng dụng được kết nối</Menu.Item>
            <Menu.Item key="Project">Sản phẩm</Menu.Item>
        </Menu>
    );
}

export default LeftMenuProfileLayout;