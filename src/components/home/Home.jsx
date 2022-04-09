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
    API_USER
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

const Home = ({ getOwnWorkspace }) => {
    let query = useQuery();

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

    const editWorkspace = () => {
        setWorkspaceEdit(workspaceDetail);
        setIsInsert(false);
        openFormWorkspace();
    }

    const getWorkspaceDetail = () => {
        axios.get(ROOT_API + API_WORKSPACE + '/' + query.get("id")).then(res => {
            setWorkspaceDetail(res.data);
            setListBoard(res.data.childs);
            setListUser(res.data.workSpaceUsers);
        })
    }

    const getUsers = () => {
        axios.get(ROOT_API + API_USER + '/1/1000', { headers: { "Authorization": `Bearer ${window.localStorage.getItem('jwt_token')}` } }).then(res => {
            setListUser(res.data.content);
        })
    }

    useEffect(() => {
        // let userId = JSON.parse(window.localStorage.getItem('auth_user')).id;
        // axios.get(ROOT_API + API_WORKSPACE_USER_GET_BY_USER + '/' + userId).then(res => {
        //     console.log(res);
        // })
        getWorkspaceDetail();
        getUsers();
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

    const removeUser = () => {
        Modal.confirm({
            title: "Do you want remove this member?",
            okText: "Yes",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                console.log("Ok");
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
            title: "Do you want delete this board?",
            okText: "Yes",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                axios.delete(ROOT_API + API_WORKSPACE + '/' + id).then(res => {
                    openNotificationWithIcon('success', 'Delete success');
                    getWorkspaceDetail();
                })
            },
            onCancel() { },
        });
    }

    const deleteWorkspace = () => {
        Modal.confirm({
            title: "Do you want delete this workspace?",
            okText: "Yes",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                axios.delete(ROOT_API + API_WORKSPACE + '/' + query.get("id")).then(res => {
                    openNotificationWithIcon('success', 'Delete success');
                    getOwnWorkspace();
                    history.push('/');
                }).catch(err => {
                    openNotificationWithIcon('error', 'Delete fail');
                })
            },
            onCancel() { },
        });
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
                        <Tooltip title="Detail">
                            <EyeOutlined
                                className="icon_action"
                                style={{ color: "#28a745", fontSize: 18 }}
                                onClick={() => history.push(
                                    '/board?id=' + record.id,
                                )}
                            />
                        </Tooltip>
                        <Tooltip title="Invite">
                            <UserAddOutlined
                                className="icon_action"
                                style={{ color: "#F1C40F", fontSize: 18 }}
                                onClick={openModalInvite}
                            />
                        </Tooltip>
                        <Tooltip
                            title={'Edit'}
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
                            title={'Delete'}
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
            dataIndex: 'name',
        },
        {
            title: 'Role',
            key: 'role',
            dataIndex: 'role',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => {
                return (
                    <span>
                        <Tooltip
                            title={'Remove'}
                        >
                            <UserDeleteOutlined
                                className="icon_action"
                                style={{ color: "#E74C3C", fontSize: 18 }}
                                onClick={() => removeUser()}
                            />
                        </Tooltip>
                    </span>
                );
            }
        }
    ]

    return (
        <div style={{ height: 'calc(100vh - 46px)' }}>
            <PageHeader
                title={workspaceDetail.name}
                extra={[
                    <Button
                        type="primary"
                        onClick={openFormWorkspace}
                    >Create</Button>,
                    <Button type="primary" onClick={editWorkspace}>Edit</Button>,
                    <Button type="primary" onClick={deleteWorkspace}>Delete</Button>
                ]}
            />
            <Card
                bordered
                style={{
                    height: 'calc(100% - 75px)'
                }}
            >
                <Tabs defaultActiveKey={activeKey} onChange={(e) => setActiveKey(e)}>
                    <TabPane tab="Boards" key="1">
                        <Card
                            title={
                                <Row>
                                    <Col span={20}></Col>
                                    <Col span={4} style={{ textAlign: 'right' }}>
                                        <Button type='primary' onClick={openBoardModal}>Create Board</Button>
                                    </Col>
                                </Row>
                            }
                        >
                            <Table
                                columns={columnBoard}
                                dataSource={listBoard}
                            />
                        </Card>
                    </TabPane>
                    <TabPane tab="Member" key="2">
                        <Card
                            title={
                                <Row>
                                    <Col span={20}></Col>
                                    <Col span={4} style={{ textAlign: 'right' }}>
                                        <Button type='primary' >Invite</Button>
                                    </Col>
                                </Row>
                            }
                        >
                            <Table
                                columns={columnUser}
                                dataSource={listUser}
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
                title="Invite Members"
                onCancel={() => setVisibleModalInvite(false)}
            >
                <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select members"
                    style={{
                        width: '100%'
                    }}
                    mode="multiple"
                    allowClear
                >
                    {/* {listUser.map((item, index) => {
                        return (
                            <Option key={index} value={item.username}>{item.username}</Option>
                        );
                    })} */}
                </Select>
            </Modal>
        </div>
    );
}

export default Home;
