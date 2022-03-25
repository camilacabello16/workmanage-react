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
    Tooltip
} from 'antd';
import LeftMenuLayout from 'components/layout/LeftMenuLayout';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import 'antd/dist/antd.less';

const { SubMenu } = Menu;
const { TabPane } = Tabs;

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
                        <Tooltip title="Chi tiết">
                            <EyeOutlined
                                className="icon_action"
                                style={{ color: "#28a745", fontSize: 18 }}
                                onClick={() => history.push('/board')}
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
                                        <Button type='primary'>Create Board</Button>
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
        </div>
    );
}

export default Home;
