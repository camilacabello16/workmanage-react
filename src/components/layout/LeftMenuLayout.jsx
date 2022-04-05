import React, { useState, useEffect } from 'react';
import { Menu, Button } from 'antd';
import 'antd/dist/antd.css';
import {
    PieChartOutlined,
    UnorderedListOutlined,
    MenuOutlined
} from '@ant-design/icons';
import {
    API_WORKSPACE_USER_GET_BY_USER,
    ROOT_API,
    API_WORKSPACE_SEARCH
} from '../constant/api';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const LeftMenuLayout = () => {
    const [listWorkspaceOwn, setListWorkspaceOwn] = useState([]);

    const getOwnWorkspace = () => {
        axios.post(ROOT_API + API_WORKSPACE_SEARCH, {
            userId: JSON.parse(window.localStorage.getItem('auth_user')).id,
            role: "ROLE_WORKSPACE_MANAGER",
            pageIndex: 0,
            pageSize: 100
        }).then(res => {
            console.log(res);
            let listParentWp = [];
            res.data.content.forEach(element => {
                if (element.parent == null) {
                    listParentWp.push(element);
                }
            });
            setListWorkspaceOwn(listParentWp);
        })
    }

    useEffect(() => {
        getOwnWorkspace();
    }, []);

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
            {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
                Boards
            </Menu.Item> */}
            <SubMenu key="sub2" icon={<MenuOutlined />} title="My Workspaces">
                {listWorkspaceOwn.map((item, index) => {
                    return (
                        <Menu.Item key={index}>
                            <Link to={'workspace?id=' + item.id}>
                                {item.name}
                            </Link>
                        </Menu.Item>
                    );
                })}
            </SubMenu>
            <SubMenu key="sub1" icon={<UnorderedListOutlined />} title="Workspaces">

                {/* <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item> */}
            </SubMenu>
        </Menu >
    );
}

export default LeftMenuLayout;