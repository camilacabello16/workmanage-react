import React, { useState, useEffect } from 'react';
import { Menu, Button } from 'antd';
import 'antd/dist/antd.css';
import {
    PieChartOutlined,
    UnorderedListOutlined
} from '@ant-design/icons'

const { SubMenu } = Menu;

const LeftMenuLayout = () => {
    return (
        <div>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Boards
                </Menu.Item>
                <SubMenu key="sub1" icon={<UnorderedListOutlined />} title="Workspaces">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
}

export default LeftMenuLayout;