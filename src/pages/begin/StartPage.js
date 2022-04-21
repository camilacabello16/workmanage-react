import { useState, useEffect } from 'react';
import {
    ROOT_API,
    API_WORKSPACE_SEARCH,
    API_WORKSPACE_USER_SEARCH
} from '../../components/constant/api';
import axios from 'axios';
import {
    Card
} from 'antd';
import { useHistory } from 'react-router-dom';

const StartPage = ({ listWorkspace, listOwnWorkspace }) => {
    const history = useHistory();

    // const [listWorkspace, setListWorkspace] = useState([]);
    // const [listOwnWorkspace, setListOwnWorkspace] = useState([]);

    // const getListWorkspace = () => {
    //     axios.post(ROOT_API + API_WORKSPACE_USER_SEARCH, {
    //         userId: JSON.parse(window.localStorage.getItem('auth_user')).id,
    //         role: "ROLE_WORKSPACE_USER",
    //         pageIndex: 0,
    //         pageSize: 100,
    //         status: 1
    //     }).then(res => {
    //         let listParentWp = [];
    //         res.data.content.forEach(element => {
    //             if (element.workSpace.parent == null) {
    //                 listParentWp.push(element);
    //             }
    //         });
    //         setListWorkspace(listParentWp);
    //     })
    // }

    // const getListOwnWorkspace = () => {
    //     axios.post(ROOT_API + API_WORKSPACE_USER_SEARCH, {
    //         userId: JSON.parse(window.localStorage.getItem('auth_user')).id,
    //         role: "ROLE_WORKSPACE_MANAGER",
    //         pageIndex: 0,
    //         pageSize: 100,
    //         status: 1
    //     }).then(res => {
    //         let listParentWp = [];
    //         res.data.content.forEach(element => {
    //             if (element.workSpace.parent == null) {
    //                 listParentWp.push(element);
    //             }
    //         });
    //         setListOwnWorkspace(listParentWp);
    //     })
    // }

    // useEffect(() => {
    //     getListWorkspace();
    //     getListOwnWorkspace();
    // }, []);

    const WorkspaceItem = (item, index) => {
        return (
            <Card
                key={index}
                style={{
                    width: '20%',
                    marginRight: 10,
                    backgroundColor: '#e5e5e5',
                    cursor: 'pointer'
                }}
                onClick={() => history.push(
                    '/workspace?id=' + item.id,
                )}
            >
                <p style={{ fontWeight: 'bold' }}>{item.workSpace.name}</p>
            </Card>
        );
    }

    return (
        <div>
            <Card
                title="My Workspace"
            >
                <div
                    style={{
                        display: 'flex'
                    }}
                >
                    {listOwnWorkspace.map((item, index) => {
                        return (
                            <Card
                                key={index}
                                style={{
                                    width: '20%',
                                    marginRight: 10,
                                    backgroundColor: '#17A589',
                                    cursor: 'pointer'
                                }}
                                onClick={() => history.push(
                                    '/workspace?id=' + item.workSpace.id + '&type=manager',
                                )}
                            >
                                <p style={{ fontWeight: 'bold', color: '#fff' }}>{item.workSpace.name}</p>
                            </Card>
                        );
                    })}
                </div>

            </Card>
            <Card
                title="Workspace"
            >
                <div
                    style={{
                        display: 'flex'
                    }}
                >
                    {listWorkspace.map((item, index) => {
                        return (
                            <Card
                                key={index}
                                style={{
                                    width: '20%',
                                    marginRight: 10,
                                    backgroundColor: '#17A589',
                                    cursor: 'pointer'
                                }}
                                onClick={() => history.push(
                                    '/workspace?id=' + item.workSpace.id + '&type=user',
                                )}
                            >
                                <p style={{ fontWeight: 'bold', color: '#fff' }}>{item.workSpace.name}</p>
                            </Card>
                        );
                    })}
                </div>

            </Card>
        </div>
    );
}

export default StartPage;