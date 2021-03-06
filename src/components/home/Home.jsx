import MenuLayout from 'components/layout/MenuLayout';
import { useHistory } from 'react-router-dom';
import {
    Menu,
    Row,
    Col,
    PageHeader,
    Button,
    Tabs,
    Card,
    Table,
    Tooltip,
    Modal,
    Select,
    notification
} from 'antd';
import LeftMenuLayout from 'components/layout/LeftMenuLayout';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    UserAddOutlined,
    UserDeleteOutlined
} from '@ant-design/icons';
import { useState, useEffect, useMemo } from 'react';
import 'antd/dist/antd.less';
import FormWorkspace from '../../pages/workspace/FormWorkspace';
import FormBoard from 'pages/board/FormBoard';
import {
    API_WORKSPACE,
    API_WORKSPACE_USER_GET_BY_USER,
    ROOT_API,
    API_USER,
    API_WORKSPACE_USER,
    API_WORKSPACE_USER_INVITE,
    API_TEAM_SEARCH,
    API_SEND_MAIL
} from '../constant/api';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const { SubMenu } = Menu;
const { TabPane } = Tabs;
const { Option } = Select;

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const Home = (props, { getOwnWorkspace, getListWorkspace }) => {
    let query = useQuery();
    const location = useLocation()

    const history = useHistory();
    const [activeKey, setActiveKey] = useState('1');
    const [listBoard, setListBoard] = useState([
        {
            id: 1,
            name: 'board 1',
            member: 'hieu',
            description: 'abc',
            createdDate: '22/03/2022',
            createdBy: 'Hieu'
        }
    ]);
    const [isVisible, setIsVisible] = useState(false);
    const [visibleBoardModal, setVisibleBoardModal] = useState(false);
    const [visibleModalInvite, setVisibleModalInvite] = useState(false);
    //user
    const [listUser, setListUser] = useState([]);
    const [workspaceDetail, setWorkspaceDetail] = useState({});
    const [currentBoard, setCurrentBoard] = useState({});
    const [workspaceEdit, setWorkspaceEdit] = useState({});
    const [isInsert, setIsInsert] = useState(false);
    const [userNameInvite, setUserNameInvite] = useState('');
    const [listUserData, setListUserData] = useState([]);
    const [userType, setUserType] = useState('');
    const [listTeam, setListTeam] = useState([]);
    const [keyUserTab, setKeyUserTab] = useState('1');
    const [listUserByTeam, setListUserByTeam] = useState([]);

    const editWorkspace = () => {
        setWorkspaceEdit(workspaceDetail);
        setIsInsert(false);
        openFormWorkspace();
    }

    const getWorkspaceDetail = () => {
        axios.get(ROOT_API + API_WORKSPACE + '/' + query.get("id")).then(res => {
            setWorkspaceDetail(res.data);
            setListBoard(res.data.childs);
            setListUserData(res.data.workSpaceUsers.filter(o => o.status == 1));
        })
    }

    const getListTeam = () => {
        axios.post(ROOT_API + API_TEAM_SEARCH, {
            pageIndex: 0,
            pageSize: 100,
            hostId: JSON.parse(window.localStorage.getItem('auth_user'))?.id
        }).then(res => {
            setListTeam(res.data.content);
        })
    }

    const getUsers = () => {
        axios.get(ROOT_API + API_USER + '/1/1000', { headers: { "Authorization": `Bearer ${window.localStorage.getItem('jwt_token')}` } }).then(res => {
            let userArr = [];
            res.data.content.forEach(element => {
                if (element.id != JSON.parse(window.localStorage.getItem('auth_user')).id) {
                    userArr.push(element);
                }
            });
            setListUser(userArr);
        })
    }

    useEffect(() => {
        // let userId = JSON.parse(window.localStorage.getItem('auth_user')).id;
        // axios.get(ROOT_API + API_WORKSPACE_USER_GET_BY_USER + '/' + userId).then(res => {
        //     console.log(res);
        // })
        getWorkspaceDetail();
        getUsers();
        getListTeam();
        setUserType(query.get("type"));
        // console.log(location);
    }, [query.get("id")])

    const openFormWorkspace = () => {
        setIsInsert(true);
        setIsVisible(true);
    }

    const openBoardModal = () => {
        setCurrentBoard({});
        setVisibleBoardModal(true);
    }

    const openModalInvite = () => {
        setVisibleModalInvite(true);
    }

    const removeUser = (id) => {
        Modal.confirm({
            title: "B???n c?? mu???n lo???i th??nh vi??n n??y kh??ng?",
            okText: "Yes",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                console.log(id);
                axios.put(ROOT_API + API_WORKSPACE_USER_INVITE + '/' + id + '/' + false).then(res => {
                    openNotificationWithIcon('success', 'Lo???i th??nh vi??n th??nh c??ng');
                    getWorkspaceDetail();
                }).catch(err => {
                    console.log(err);
                });
                // getListWorkspace();
                // getOwnWorkspace();
                // history.push('/');
            },
            onCancel() { },
        });
    }

    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    const deleteBoard = (id) => {
        Modal.confirm({
            title: "B???n c?? mu???n x??a b???ng n??y kh??ng?",
            okText: "Yes",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                axios.delete(ROOT_API + API_WORKSPACE + '/' + id).then(res => {
                    openNotificationWithIcon('success', 'X??a th??nh c??ng');
                    getWorkspaceDetail();
                })
            },
            onCancel() { },
        });
    }

    const deleteWorkspace = () => {
        Modal.confirm({
            title: "B???n c?? mu???n x??a kh??ng gian l??m vi???c n??y kh??ng?",
            okText: "Yes",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                axios.delete(ROOT_API + API_WORKSPACE + '/' + query.get("id")).then(res => {
                    openNotificationWithIcon('success', 'X??a th??nh c??ng');
                    getOwnWorkspace();
                    history.push('/');
                }).catch(err => {
                    getOwnWorkspace();
                    history.push('/');
                    // openNotificationWithIcon('error', 'C?? l???i x???y ra');
                })
            },
            onCancel() { },
        });
    }

    const inviteMember = () => {
        axios.post(ROOT_API + API_WORKSPACE_USER + '/' + query.get("id") + '/' + userNameInvite).then(res => {
            openNotificationWithIcon('success', 'M???i th??nh vi??n th??nh c??ng');
            setVisibleModalInvite(false);
        }).catch(err => {
            openNotificationWithIcon('success', 'C?? l???i x???y ra');
        });
        axios.post(ROOT_API + API_SEND_MAIL, {
            managerName: JSON.parse(window.localStorage.getItem('auth_user')).username,
            workspaceName: workspaceDetail.name,
            emailReceiver: listUser.find(o => o.username == userNameInvite)?.email
        }).then(res => {
            console.log(res);
        })
    }

    const leaveWorkspace = () => {
        var workspaceUserId = listUser.find(o => o.user.id == JSON.parse(window.localStorage.getItem('auth_user')).id)?.id;

        Modal.confirm({
            title: "B???n c?? mu???n r???i kh???i kh??ng gian l??m vi???c n??y kh??ng?",
            okText: "Yes",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                axios.put(ROOT_API + API_WORKSPACE_USER_INVITE + '/' + workspaceUserId + '/' + false).then(res => {

                    openNotificationWithIcon('success', '???? r???i kh???i kh??ng gian l??m vi???c');
                }).catch(err => {
                    console.log(err);
                });
                // getListWorkspace();
                // getOwnWorkspace();
                // history.push('/');
                window.location.href = "/";
            },
            onCancel() { },
        });
    }

    const setListInviteTeam = (e) => {
        const user = listTeam.find(o => o.id == e).teamUsers.filter(o => o.user.id != JSON.parse(window.localStorage.getItem('auth_user')).id);
        console.log(user);
        const listUser = [];
        user.forEach(e => {
            listUser.push(e.user.username);
        });
        setListUserByTeam(listUser);
        console.log(listUser);
    }

    const inviteTeam = () => {
        listUserByTeam.forEach(e => {
            axios.post(ROOT_API + API_WORKSPACE_USER + '/' + query.get("id") + '/' + e).then(res => {
                openNotificationWithIcon('success', 'M???i th??nh vi??n th??nh c??ng');
                setVisibleModalInvite(false);
            }).catch(err => {
                openNotificationWithIcon('success', 'C?? l???i x???y ra');
            });
            axios.post(ROOT_API + API_SEND_MAIL, {
                managerName: JSON.parse(window.localStorage.getItem('auth_user')).username,
                workspaceName: workspaceDetail.name,
                emailReceiver: listUser.find(o => o.username == e)?.email
            }).then(res => {
                console.log(res);
            })
        })
    }

    const callbackTab = (key) => {
        setKeyUserTab(key);
    }

    const columnBoard = [
        {
            title: 'STT',
            key: 'STT',
            render: (text, record, index) => <span>{index + 1}</span>
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
        },
        {
            title: 'Member',
            key: 'member',
            dataIndex: 'workspaceUser',
        },
        {
            title: 'Created Date',
            key: 'createdDate',
            dataIndex: 'createdDate',
        },
        {
            title: 'Created By',
            key: 'createdBy',
            dataIndex: 'createdBy',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return (
                    <span>
                        <Tooltip title="Chi ti???t">
                            <EyeOutlined
                                className="icon_action"
                                style={{ color: "#28a745", fontSize: 18 }}
                                onClick={() => history.push(
                                    '/board?id=' + record.id + '&type=' + userType,
                                )}
                            />
                        </Tooltip>
                        <Tooltip title="M???i">
                            <UserAddOutlined
                                className="icon_action"
                                style={{ color: "#F1C40F", fontSize: 18 }}
                                onClick={openModalInvite}
                            />
                        </Tooltip>
                        <Tooltip
                            title={'C???p nh???t'}
                        >
                            <EditOutlined
                                className="icon_action"
                                style={{ color: "#2db7f5", fontSize: 18 }}
                                onClick={() => {
                                    setCurrentBoard(record);
                                    setVisibleBoardModal(true);
                                }
                                }
                            />
                        </Tooltip>
                        <Tooltip
                            title={'X??a'}
                        >
                            <DeleteOutlined
                                className="icon_action"
                                style={{ color: "#E74C3C", fontSize: 18 }}
                                onClick={() => deleteBoard(record.id)}
                            />
                        </Tooltip>
                    </span>
                );
            }
        }
    ]

    const columnUser = [
        {
            title: 'STT',
            key: 'STT',
            dataIndex: 'id',
            render: (text, record, index) => <span>{index + 1}</span>
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'username',
            render: (text, record) => {
                return (
                    <span>{record.user?.username}</span>
                );
            }
        },
        {
            title: 'Role',
            key: 'role',
            dataIndex: 'role',
            render: (text, record) => {
                return (
                    <span>{text == 'ROLE_WORKSPACE_MANAGER' ? 'Manager' : 'Member'}</span>
                );
            }
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
            render: (text, record) => {
                return (
                    <span>{record.user?.email}</span>
                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return (
                    <span>
                        {query.get("type") == 'manager' &&
                            <Tooltip
                                title={'Remove'}
                            >
                                <UserDeleteOutlined
                                    className="icon_action"
                                    style={{ color: "#E74C3C", fontSize: 18 }}
                                    onClick={() => removeUser(record.id)}
                                />
                            </Tooltip>
                        }
                    </span>
                );
            }
        }
    ]

    return (
        <div style={{ height: 'calc(100vh - 46px)' }}>
            <PageHeader
                title={workspaceDetail.name}
                extra={query.get("type") == 'manager' ?
                    [
                        <Button type='primary' onClick={openModalInvite}>M???i</Button>,
                        // <Button
                        //     type="primary"
                        //     onClick={openFormWorkspace}
                        // >Create</Button>,
                        <Button type="primary" onClick={editWorkspace}>C???p nh???t</Button>,
                        <Button type="primary" onClick={deleteWorkspace}>X??a</Button>
                    ] : [
                        <Button type="danger" onClick={leaveWorkspace}>R???i kh??ng gian</Button>
                    ]
                }
            />
            <Card
                bordered
                style={{
                    height: 'calc(100% - 75px)'
                }}
            >
                <Tabs defaultActiveKey={activeKey} onChange={(e) => setActiveKey(e)}>
                    <TabPane tab="B???ng" key="1">
                        <Card
                            title={
                                <Row>
                                    <Col span={20}></Col>
                                    <Col span={4} style={{ textAlign: 'right' }}>
                                        {query.get("type") == 'manager' &&
                                            <Button type='primary' onClick={openBoardModal}>T???o b???ng</Button>
                                        }
                                    </Col>
                                </Row>
                            }
                        >
                            {/* <Table
                                columns={columnBoard}
                                dataSource={listBoard}
                            /> */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap'
                                }}
                            >
                                {listBoard?.map((item, index) => {
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
                                                '/board?id=' + item.id + '&type=' + query.get("type"),
                                            )}
                                        >
                                            <p style={{ fontWeight: 'bold' }}>{item.name}</p>
                                        </Card>
                                    );
                                })}
                            </div>

                        </Card>
                    </TabPane>
                    <TabPane tab="Th??nh vi??n" key="2">
                        <Card
                            title={
                                <Row>
                                    <Col span={20}></Col>
                                    {/* <Col span={4} style={{ textAlign: 'right' }}>
                                        {query.get('type') == 'manager' &&
                                            <Button type='primary' >Invite</Button>
                                        }
                                    </Col> */}
                                </Row>
                            }
                        >
                            <Table
                                columns={columnUser}
                                dataSource={listUserData}
                            />
                        </Card>
                    </TabPane>
                    {/* <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                    </TabPane> */}
                </Tabs>
            </Card>
            <FormWorkspace
                visible={isVisible}
                setIsVisible={setIsVisible}
                workspaceEdit={workspaceEdit}
                isInsert={isInsert}
                getWorkspaceDetail={getWorkspaceDetail}
                getOwnWorkspace={getOwnWorkspace}
            />
            <FormBoard
                visible={visibleBoardModal}
                currentBoard={currentBoard}
                setVisibleBoardModal={setVisibleBoardModal}
                getWorkspaceDetail={getWorkspaceDetail}
                parentId={query.get("id")}
            />
            <Modal
                visible={visibleModalInvite}
                title="M???i th??m th??nh vi??n"
                onCancel={() => setVisibleModalInvite(false)}
                footer={null}
            >
                <Tabs defaultActiveKey="1" onChange={callbackTab}>
                    <TabPane key={"1"} tab="M???i ng?????i d??ng">
                        <Row>
                            <Col span={24}>
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="Ch???n th??nh vi??n"
                                    style={{
                                        width: '100%'
                                    }}
                                    allowClear
                                    onChange={(e) => { setUserNameInvite(e) }}
                                >
                                    {listUser.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.username}>{item.username}</Option>
                                        );
                                    })}
                                </Select>
                            </Col>
                            <Col span={24} style={{ marginTop: 10, display: 'flex', justifyContent: 'end' }}>
                                <Button type='primary' onClick={inviteMember}>Invite</Button>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane key={"2"} tab={"M???i theo nh??m"}>
                        <Row>
                            <Col span={24}>
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="Ch???n nh??m"
                                    style={{
                                        width: '100%'
                                    }}
                                    allowClear
                                    onChange={(e) => { setListInviteTeam(e) }}
                                >
                                    {listTeam.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.id}>{item.name}</Option>
                                        );
                                    })}
                                </Select>
                            </Col>
                            <Col span={24} style={{ marginTop: 10, display: 'flex', justifyContent: 'end' }}>
                                <Button
                                    type='primary'
                                    onClick={inviteTeam}
                                >Invite</Button>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </Modal>
        </div>
    );
}

export default Home;
