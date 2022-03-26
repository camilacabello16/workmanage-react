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
    Select
} from 'antd';
import LeftMenuLayout from 'components/layout/LeftMenuLayout';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    UserAddOutlined
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import 'antd/dist/antd.less';
import FormWorkspace from '../../pages/workspace/FormWorkspace';
import FormBoard from 'pages/board/FormBoard';

const { SubMenu } = Menu;
const { TabPane } = Tabs;
const { Option } = Select;

function Home() {
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

    const openFormWorkspace = () => {
        setIsVisible(true);
    }

    const openBoardModal = () => {
        setVisibleBoardModal(true);
    }

    const openModalInvite = () => {
        setVisibleModalInvite(true);
    }

    const columnBoard = [
        {
            title: '#',
            key: 'STT',
            dataIndex: 'id',
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
            render: () => {
                return (
                    <span>
                        <Tooltip title="Detail">
                            <EyeOutlined
                                className="icon_action"
                                style={{ color: "#28a745", fontSize: 18 }}
                                onClick={() => history.push('/board')}
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
                            />
                        </Tooltip>
                        <Tooltip
                            title={'Delete'}
                        >
                            <DeleteOutlined
                                className="icon_action"
                                style={{ color: "#E74C3C", fontSize: 18 }}
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
                title="Workspace 1"
                extra={[
                    <Button
                        type="primary"
                        onClick={openFormWorkspace}
                    >Create</Button>,
                    <Button type="primary">Edit</Button>,
                    <Button type="primary">Delete</Button>
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
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </Card>
            <FormWorkspace
                visible={isVisible}
                setIsVisible={setIsVisible}
            />
            <FormBoard
                visible={visibleBoardModal}
                setVisibleBoardModal={setVisibleBoardModal}
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
                    <Option>Hiếu</Option>
                    <Option>Hiếu</Option>
                </Select>
            </Modal>
        </div>
    );
}

export default Home;
