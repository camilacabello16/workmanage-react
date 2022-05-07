import React, { useState, useEffect } from 'react';
import { Menu, Button } from 'antd';
import 'antd/dist/antd.css';
import {
    PieChartOutlined,
    UnorderedListOutlined,
    MenuOutlined,
    TeamOutlined
} from '@ant-design/icons';
import {
    API_WORKSPACE_USER_GET_BY_USER,
    ROOT_API,
    API_WORKSPACE_SEARCH,
    API_WORKSPACE_USER_SEARCH
} from '../constant/api';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const { SubMenu } = Menu;

const LeftMenuLayout = ({ listWorkspaceOwn }) => {
    const history = useHistory();

    const [listWorkspace, setListWorkspace] = useState([]);

    const getWorkspace = () => {
        axios.post(ROOT_API + API_WORKSPACE_USER_SEARCH, {
            userId: JSON.parse(window.localStorage.getItem('auth_user')).id,
            role: "ROLE_WORKSPACE_USER",
            pageIndex: 0,
            pageSize: 100
        }).then(res => {
            let listParentWp = [];
            res.data.content.forEach(element => {
                if (element.parent == null) {
                    listParentWp.push(element);
                }
            });
            setListWorkspace(listParentWp);
        })
    }

    useEffect(() => {
        getWorkspace();
    }, []);

    return (
        <Menu
            //defaultSelectedKeys={['5']}
            defaultOpenKeys={['sub1', 'sub2']}
            mode="inline"
            style={{
                height: '100vh'
            }}
            theme="dark"
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px 0',
                    cursor: 'pointer'
                }}
                onClick={() => history.push(
                    '/'
                )}
            >
                <img
                    src={require('../../asset/logo2.jpg')}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 10,
                    }}
                />
                <span
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}
                >Joinco</span>
            </div>
            {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
                Boards
            </Menu.Item> */}
            <SubMenu key="sub2" icon={<MenuOutlined />} title="Không gian làm việc của tôi">
                {listWorkspaceOwn.map((item, index) => {
                    return (
                        <Menu.Item key={index}>
                            <Link
                                // to={
                                //     'workspace?id=' + item.workSpace.id
                                //     // state: { workspaceItem: item }
                                // }
                                // onClick={() => {
                                //     history.push({
                                //         pathname: `${'workspace?id=' + item.workSpace.id}`,
                                //         state: { workspaceItem: item }
                                //     })
                                // }}
                                to={'workspace?id=' + item.workSpace.id + '&type=manager'}
                            // to={{ pathname: `${'workspace?id=' + item.workSpace.id + '&type=' + 'manager'}`, state: { workspaceItem: item } }}
                            >
                                {item.workSpace.name}
                            </Link>
                        </Menu.Item>
                    );
                })}
            </SubMenu>
            <SubMenu key="sub1" icon={<UnorderedListOutlined />} title="Không gian làm việc">

                {/* <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item> */}
                {listWorkspace.map((item, index) => {
                    return (
                        <Menu.Item key={index}>
                            <Link to={'workspace?id=' + item.workSpace.id + '&type=user'}>
                                {item.workSpace.name}
                            </Link>
                        </Menu.Item>
                    );
                })}
            </SubMenu>
            <Menu.Item icon={<TeamOutlined />}>
                <Link to="/team" >
                    Nhóm
                </Link>
            </Menu.Item>
        </Menu >
    );
}

export default LeftMenuLayout;