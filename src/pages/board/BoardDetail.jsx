import {
    Card,
    Row,
    Col,
    Button,
    Modal,
    Form,
    DatePicker,
    Input,
    notification,
    Tooltip,
    Spin,
    Tabs,
    Dropdown,
    Menu,
    Select
} from 'antd';
import React, { useState, useMemo, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import {
    ROOT_API,
    API_CARD,
    API_TASK,
    API_CARD_SEARCH,
    API_TASK_SEARCH,
    API_WORKSPACE,
    API_CARD_UPDATE_VIEW,
    API_TEMPLATE,
    API_TEMPLATE_SEARCH,
    API_TEMPLATE_CLONE
} from '../../components/constant/api';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import FormBoard from './FormBoard';
import moment from 'moment';
import { FormItemStatusContext } from 'antd/lib/form/context';

const { TabPane } = Tabs;

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const BoardDetail = () => {
    let query = useQuery();
    const [formTask] = Form.useForm();
    const [formCard] = Form.useForm();
    const [formTemplate] = Form.useForm();
    const [formCloneTemplate] = Form.useForm();

    const [listCard, setListCard] = useState([
        {
            id: "1",
            name: 'Todo',
            idDrag: 'a'
        },
        {
            id: "2",
            name: 'Doing',
            idDrag: 'b'
        },
        {
            id: "3",
            name: 'Done',
            idDrag: 'c'
        },
    ]);
    const [listTask, setListTask] = useState([
        {
            id: "4",
            cardId: "1",
            name: 'test 1'
        },
        {
            id: "5",
            cardId: "2",
            name: 'test 2'
        },
        {
            id: "6",
            cardId: "1",
            name: 'test 3'
        },
        {
            id: "7",
            cardId: "3",
            name: 'test 4'
        },
        {
            id: "8",
            cardId: "2",
            name: 'test 5'
        },
        {
            id: "9",
            cardId: "1",
            name: 'test 5'
        },
        {
            id: "10",
            cardId: "1",
            name: 'test 5'
        },
        {
            id: "11",
            cardId: "1",
            name: 'test 5'
        },
        {
            id: "12",
            cardId: "1",
            name: 'test 5'
        },
    ]);
    const history = useHistory();
    const location = useLocation();

    const [visibleAddTask, setVisibleTask] = useState(false);
    const [insertToCardId, setInsertToCardId] = useState('');
    const [visibleAddCard, setVisibleCard] = useState('');
    const [boardDetail, setBoardDetail] = useState({});
    const [visibleFormBoard, setVisibleFormBoard] = useState(false);
    const [boardParentId, setBoardParentId] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEditCard, setIsEditCard] = useState(false);
    const [cardItemEdit, setCardItemEdit] = useState({});
    const [isEditTask, setIsEditTask] = useState(false);
    const [taskItemEdit, setTaskItemEdit] = useState({});
    const [visibleAddTemplate, setVisibleTemplate] = useState(false);
    const [listTemplate, setListTemplate] = useState([]);
    const [visibleCloneTemplate, setVisibleCloneTemplate] = useState(false);
    const [listUserWorkspace, setListUserWorkspace] = useState([]);

    const getBoardDetail = () => {
        axios.get(ROOT_API + API_WORKSPACE + '/' + query.get("id")).then(res => {
            axios.get(ROOT_API + API_WORKSPACE + '/' + res?.data.parent?.id).then(resp => {
                setListUserWorkspace(resp.data.workSpaceUsers);
            })
            setBoardDetail(res.data);
            setBoardParentId(res.data.parent.id);
        })
    }

    useEffect(() => {
        getCard();
        getTask();
        getBoardDetail();
    }, [query.get("id")])

    const onCloseCloneTemplate = () => {
        setVisibleCloneTemplate(false);
    }

    const getListTemplate = () => {
        axios.post(ROOT_API + API_TEMPLATE_SEARCH, {
            pageSize: 100,
            pageIndex: 0
        }).then(res => {
            console.log(res);
            setListTemplate(res.data.content);
        })
    }

    const onCloseTemplate = () => {
        setVisibleTemplate(false);
    }

    const getCard = () => {
        setLoading(true);
        axios.post(ROOT_API + API_CARD_SEARCH, {
            pageIndex: 0,
            pageSize: 1000,
            workSpaceId: query.get("id")
        }).then(res => {
            res.data.content.sort(function (a, b) {
                return a.viewIndex - b.viewIndex
            });
            for (let i = 0; i < res.data.content.length; i++) {
                res.data.content[i].numberTask = res.data.content[i].tasks?.length;
            }
            setListCard(res.data.content);
            console.log(res.data.content);
            // setTimeout(() => {
            //     setLoading(false);
            // }, 1000);
            setLoading(false);
        })
    }

    const getCardDrag = () => {
        axios.post(ROOT_API + API_CARD_SEARCH, {
            pageIndex: 0,
            pageSize: 1000,
            workSpaceId: query.get("id")
        }).then(res => {
            console.log(res);
            res.data.content.sort(function (a, b) {
                return a.viewIndex - b.viewIndex
            })
        })
    }

    const getTask = () => {
        axios.post(ROOT_API + API_TASK_SEARCH, {
            pageIndex: 0,
            pageSize: 1000,
            workSpaceId: query.get("id")
        }).then(res => {
            console.log(res);
            setListTask(res.data.content);
        })
    }

    useEffect(() => {
        getCard();
        getTask();
        getBoardDetail();
        getListTemplate();
    }, [])

    const onDragEnd = (result, columns, setColumns) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId != 'board') {
            var taskDrag = listTask.find(o => o.id == result.draggableId);
            var cardChange = {
                id: destination.droppableId
            }
            taskDrag.card = cardChange;
            axios.put(ROOT_API + API_TASK + '/' + result.draggableId, taskDrag).then(res => {
                console.log(res);
                getCard();
            })
        } else {
            var cardDrag = listCard.find(o => o.id == result.draggableId);
            var indexChange = destination.index + 1;

            listCard.splice(source.index, 1);
            listCard.splice(destination.index, 0, cardDrag);

            axios.post(ROOT_API + API_CARD_UPDATE_VIEW + '?id=' + cardDrag.id + '&&viewIndex=' + destination.index);

            for (let i = 0; i < listCard.length; i++) {
                if (destination.index < source.index) {
                    if (listCard[i].viewIndex >= destination.index && listCard[i].viewIndex <= source.index && listCard[i].id != cardDrag.id) {
                        var indexChange2 = listCard[i].viewIndex + 1;
                        axios.post(ROOT_API + API_CARD_UPDATE_VIEW + '?id=' + listCard[i].id + '&&viewIndex=' + indexChange2).then(res => {
                            //getCard();
                            getCardDrag();
                        })
                    }
                } else {
                    if (listCard[i].viewIndex <= destination.index && listCard[i].viewIndex >= source.index && listCard[i].id != cardDrag.id) {
                        var indexChange2 = listCard[i].viewIndex - 1;
                        axios.post(ROOT_API + API_CARD_UPDATE_VIEW + '?id=' + listCard[i].id + '&&viewIndex=' + indexChange2).then(res => {
                            //getCard();
                            getCardDrag();
                        })
                    }
                }

            }
            // getCard();
        }

        console.log(result);
    };

    const insertTask = (cardId) => {
        setInsertToCardId(cardId);
        setVisibleTask(true);
    }

    const onCloseTask = () => {
        setVisibleTask(false);
        formTask.resetFields();
    }

    const onCloseCard = () => {
        setVisibleCard(false);
        formCard.resetFields();
    }

    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    const onAddTask = (value) => {
        let card = {
            id: insertToCardId
        }
        value.card = card;
        if (!isEditTask) {
            value.user = {
                id: value.user
            }
            axios.post(ROOT_API + API_TASK, value).then(res => {
                getTask();
                getCard();
                openNotificationWithIcon('success', 'Insert task success');
                onCloseTask();
                formTask.resetFields();
            }).catch(err => {
                openNotificationWithIcon('error', 'Insert task fail');
            })
        }
        else {
            value.id = taskItemEdit.id;
            value.user = {
                id: value.user
            }
            axios.put(ROOT_API + API_TASK + '/' + taskItemEdit.id, value).then(res => {
                getTask();
                openNotificationWithIcon('success', 'Update task success');
                onCloseTask();
                formTask.resetFields();
            }).catch(err => {
                openNotificationWithIcon('error', 'Update task fail');
            })
        }

    }

    const onAddCard = (value) => {
        let workspace = {
            id: query.get("id")
        }
        value.workSpace = workspace;
        if (!isEditCard) {
            value.viewIndex = listCard.length;
            axios.post(ROOT_API + API_CARD, value).then(res => {
                getCard();
                openNotificationWithIcon('success', 'Insert card success');
                onCloseCard();
                formCard.resetFields();
                formTask.resetFields();
            }).catch(err => {
                openNotificationWithIcon('error', 'Insert card fail');
            })
        }
        else {
            value.id = cardItemEdit.id;
            value.viewIndex = cardItemEdit.viewIndex;
            axios.put(ROOT_API + API_CARD + '/' + cardItemEdit.id, value).then(res => {
                getCard();
                openNotificationWithIcon('success', 'Update card success');
                onCloseCard();
                formCard.resetFields();
                formTask.resetFields();
            }).catch(err => {
                openNotificationWithIcon('error', 'Update card fail');
            })
        }
    }

    const editCard = (item) => {
        formCard.setFieldsValue({
            name: item.name
        });
        setIsEditCard(true);
        setCardItemEdit(item);
        setVisibleCard(true);
    }

    const deleteTask = (id) => {
        Modal.confirm({
            title: "Do you want remove this task?",
            okText: "Yes",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                axios.delete(ROOT_API + API_TASK + '/' + id).then(res => {
                    console.log(res);
                    getTask();
                    openNotificationWithIcon('success', 'Delete task success');
                }).catch(err => {
                    openNotificationWithIcon('error', 'Delete task fail');
                })
            },
            onCancel() { },
        });
    }

    const deleteBoard = () => {
        Modal.confirm({
            title: "Do you want remove this board?",
            okText: "Yes",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                axios.delete(ROOT_API + API_WORKSPACE + '/' + query.get("id")).then(res => {
                    openNotificationWithIcon('success', 'Delete board success');
                    history.push('/');
                }).catch(err => {
                    openNotificationWithIcon('error', 'Delete board fail');
                })
            },
            onCancel() { },
        });
    }

    const callback = (key) => {
        console.log(key);
    }

    const deleteCard = (id) => {
        Modal.confirm({
            title: "Do you want remove this card?",
            okText: "Yes",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                axios.delete(ROOT_API + API_CARD + '/' + id).then(res => {
                    openNotificationWithIcon('success', 'Delete card success');
                    getCard();
                }).catch(err => {
                    openNotificationWithIcon('error', 'Delete card fail');
                })
            },
            onCancel() { },
        });
    }

    const editTask = (item) => {
        formTask.setFieldsValue({
            name: item.name,
            startDate: item.startDate ? moment(item.startDate) : null,
            endDate: item.endDate ? moment(item.endDate) : null,
            user: item.user.id
        });
        setInsertToCardId(item.card.id);
        setIsEditTask(true);
        setTaskItemEdit(item);
        setVisibleTask(true);
    }

    const onAddTemplate = (value) => {
        var cardClone = listCard;
        var boardClone = boardDetail;
        for (let i = 0; i < cardClone.length; i++) {
            delete cardClone[i].id;
            if (cardClone[i].tasks) {
                for (let j = 0; j < cardClone[i].tasks.length; j++) {
                    delete cardClone[i].tasks[j].id;
                }
            }
        }

        boardClone.cards = cardClone;
        boardClone.name = value.name;
        boardClone.user_id = JSON.parse(window.localStorage.getItem('auth_user')).id;
        console.log(boardClone);
        axios.post(ROOT_API + API_TEMPLATE, boardClone).then(res => {
            openNotificationWithIcon('success', 'Create template success');
            onCloseTemplate();
            getCard();
            getTask();
            formTemplate.resetFields();
        }).catch(err => {
            openNotificationWithIcon('error', 'Create template fail');
        })
    }

    const createTemplate = () => {
        setVisibleTemplate(true);
    }

    const cloneTemplate = (item) => {
        let cloneObj = {};
        cloneObj.userIdHost = JSON.parse(window.localStorage.getItem('auth_user')).id;
        cloneObj.idTemplateWorkSpace = item;
        cloneObj.parent = {
            id: boardDetail.parent.id
        }
        console.log(cloneObj);
        axios.post(ROOT_API + API_TEMPLATE_CLONE, cloneObj).then(res => {
            openNotificationWithIcon('success', 'Create board from template success');
            history.push('/board?id=' + res.data.id);
            getBoardDetail();
            getCard();
            getTask();
        }).catch(err => {
            openNotificationWithIcon('success', 'Create board from template fail');
        })
    }

    const onCloneTemplate = (value) => {

    }

    return (
        <React.Fragment>
            <div style={{ height: 'calc(100vh - 46px)' }}>

                <Spin spinning={loading}>
                    <Card
                        style={{
                            height: 'calc(100vh - 46px)',
                        }}
                        bordered
                        title={
                            <Row>
                                <Col span={6}>{boardDetail.name}</Col>

                                <Col span={6}></Col>
                                <Col span={12} style={{ textAlign: 'right' }}>
                                    <Button onClick={() => history.push('/workspace?id=' + boardParentId)} style={{ marginRight: 10 }}>Back</Button>
                                    {/* <Button>Invite</Button> */}
                                    <Button type='primary' style={{ marginLeft: 10 }} onClick={() => setVisibleFormBoard(true)}>Edit</Button>
                                    <Button type='primary' style={{ marginLeft: 10 }} onClick={deleteBoard}>Delete</Button>
                                    <Button type='primary' style={{ marginLeft: 10 }} onClick={createTemplate}>Create Template</Button>
                                    <Select
                                        showSearch
                                        filterOption="children"
                                        style={{ marginLeft: 10, width: '25%' }}
                                        placeholder="Choose template"
                                        onChange={(e) => cloneTemplate(e)}
                                    >
                                        {listTemplate.map((item, index) => {
                                            return (
                                                <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                                            );
                                        })}
                                    </Select>
                                </Col>
                            </Row>
                        }
                    >
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Board" key="1">
                                <div
                                    style={{ display: 'flex' }}
                                >
                                    <DragDropContext
                                        onDragEnd={result => onDragEnd(result)}
                                    >
                                        <Droppable droppableId='board' type='list' direction='horizontal'>
                                            {(provided) => (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                    }}
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                >
                                                    {listCard.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                draggableId={item.id}
                                                                index={index}
                                                                key={item.id}
                                                            >
                                                                {(provided) => (
                                                                    <div
                                                                        style={{
                                                                            marginRight: 10,
                                                                            backgroundColor: '#000'
                                                                        }}
                                                                        key={index}
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                    >
                                                                        <div style={{ display: 'flex', width: '90%', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                            <h5 {...provided.dragHandleProps}>{item.name} <span style={{ fontWeight: '400!important', fontSize: 14 }}>({item.numberTask ? item.numberTask : 0})</span></h5>

                                                                            <Dropdown
                                                                                trigger={['click']}
                                                                                overlay={
                                                                                    <Menu>
                                                                                        <Menu.Item key="1" onClick={() => editCard(item)}>Edit</Menu.Item>
                                                                                        <Menu.Item key="2" onClick={() => deleteCard(item.id)}>Delete</Menu.Item>
                                                                                    </Menu>
                                                                                }
                                                                            >
                                                                                <EllipsisOutlined />
                                                                            </Dropdown>
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                marginRight: 10,
                                                                            }}
                                                                        >
                                                                            <Droppable droppableId={item.id}>
                                                                                {(provided1, snapshot) => {
                                                                                    return (
                                                                                        <div
                                                                                            {...provided1.droppableProps}
                                                                                            ref={provided1.innerRef}
                                                                                            style={{
                                                                                                background: snapshot.isDraggingOver
                                                                                                    ? "lightblue"
                                                                                                    : "lightgrey",
                                                                                                padding: 4,
                                                                                                width: 250,
                                                                                                minHeight: 300,
                                                                                                position: 'relative',
                                                                                                paddingBottom: 40
                                                                                            }}
                                                                                        >
                                                                                            {listTask.map((item2, index) => {
                                                                                                return (
                                                                                                    <span>
                                                                                                        {item2?.card?.id == item?.id &&
                                                                                                            <Draggable
                                                                                                                key={item2.id}
                                                                                                                draggableId={item2.id}
                                                                                                                index={index}
                                                                                                            >
                                                                                                                {(provided2, snapshot) => {
                                                                                                                    return (
                                                                                                                        <div
                                                                                                                            ref={provided2.innerRef}
                                                                                                                            {...provided2.draggableProps}
                                                                                                                            style={{
                                                                                                                                userSelect: "none",
                                                                                                                                padding: 10,
                                                                                                                                margin: "0 0 8px 0",
                                                                                                                                backgroundColor: snapshot.isDragging
                                                                                                                                    ? "#0b806c"
                                                                                                                                    : "#17A589",
                                                                                                                                color: "white",
                                                                                                                                ...provided2.draggableProps.style
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            <div
                                                                                                                                style={{
                                                                                                                                    display: 'flex',
                                                                                                                                    alignItems: 'center',
                                                                                                                                    justifyContent: 'space-between'
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <div
                                                                                                                                    style={{
                                                                                                                                        display: 'flex',
                                                                                                                                        flexDirection: 'column'
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    <span
                                                                                                                                        {...provided2.dragHandleProps}
                                                                                                                                        style={{
                                                                                                                                            width: '100%'
                                                                                                                                        }}
                                                                                                                                    >{item2.name}</span>
                                                                                                                                    <span>
                                                                                                                                        Assign: {item2.user?.username}
                                                                                                                                    </span>
                                                                                                                                </div>
                                                                                                                                <div>
                                                                                                                                    <Tooltip title="Edit">
                                                                                                                                        <EditOutlined
                                                                                                                                            style={{
                                                                                                                                                cursor: 'pointer'
                                                                                                                                            }}
                                                                                                                                            onClick={() => editTask(item2)}
                                                                                                                                        />
                                                                                                                                    </Tooltip>
                                                                                                                                    <Tooltip title="Delete">
                                                                                                                                        <DeleteOutlined
                                                                                                                                            style={{
                                                                                                                                                cursor: 'pointer',
                                                                                                                                                marginLeft: 10
                                                                                                                                            }}
                                                                                                                                            onClick={() => deleteTask(item2.id)}
                                                                                                                                        />
                                                                                                                                    </Tooltip>
                                                                                                                                </div>

                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    );
                                                                                                                }}
                                                                                                            </Draggable>
                                                                                                        }

                                                                                                    </span>

                                                                                                );
                                                                                            })}
                                                                                            {provided1.placeholder}
                                                                                            <Button
                                                                                                style={{
                                                                                                    width: '96.5%',
                                                                                                    position: 'absolute',
                                                                                                    bottom: 5
                                                                                                }}
                                                                                                className='button-icon'
                                                                                                icon={<PlusOutlined></PlusOutlined>}
                                                                                                onClick={() => { insertTask(item.id); setIsEditTask(false); }}
                                                                                            >Add a card</Button>
                                                                                        </div>
                                                                                    );
                                                                                }}
                                                                            </Droppable>

                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                    <Button className='button-icon' icon={<PlusOutlined></PlusOutlined>} type="primary" onClick={() => { setVisibleCard(true); setIsEditCard(false); }}>Add another list</Button>
                                </div>
                            </TabPane>
                            <TabPane tab="Statistical" key="2"></TabPane>
                        </Tabs>
                    </Card>
                </Spin>

            </div>
            <Modal
                title="Add Task"
                visible={visibleAddTask}
                onCancel={onCloseTask}
                footer={null}
            >
                <Form
                    layout="vertical"
                    form={formTask}
                    onFinish={onAddTask}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter task name'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="startDate"
                                label="Start Date"
                            >
                                <DatePicker
                                    style={{ width: '98%' }}
                                    disabledDate={(current) => {
                                        let customDate = moment().format("YYYY-MM-DD");
                                        return current && current < moment(customDate, "YYYY-MM-DD");
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="endDate"
                                label="End Date"
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    disabledDate={(current) => {
                                        let customDate = moment().format("YYYY-MM-DD");
                                        return current && current < moment(customDate, "YYYY-MM-DD");
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="user"
                                label="Assign"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter task name'
                                    }
                                ]}
                            >
                                <Select>
                                    {listUserWorkspace.map((item, index) => {
                                        return (
                                            <Select.Option key={index} value={item.user.id}>{item.user.username}</Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button type='primary' htmlType='submit' style={{ width: '100%' }}>Submit</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Modal
                title="Add Card"
                visible={visibleAddCard}
                onCancel={onCloseCard}
                footer={null}
            >
                <Form
                    layout="vertical"
                    form={formCard}
                    onFinish={onAddCard}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter task name'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button type='primary' htmlType='submit' style={{ width: '100%' }}>Submit</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Modal
                title="Create Template"
                visible={visibleAddTemplate}
                onCancel={onCloseTemplate}
                footer={null}
            >
                <Form
                    layout="vertical"
                    form={formTemplate}
                    onFinish={onAddTemplate}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter task name'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button type='primary' htmlType='submit' style={{ width: '100%' }}>Submit</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Modal
                title="Create Board"
                visible={visibleCloneTemplate}
                onCancel={onCloseCloneTemplate}
                footer={null}
            >
                <Form
                    layout="vertical"
                    form={formCloneTemplate}
                    onFinish={onCloneTemplate}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="id"
                                label="id"
                                style={{
                                    display: 'none'
                                }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter task name'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button type='primary' htmlType='submit' style={{ width: '100%' }}>Submit</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <FormBoard
                visible={visibleFormBoard}
                currentBoard={boardDetail}
                setVisibleBoardModal={setVisibleFormBoard}
                getWorkspaceDetail={getBoardDetail}
                parentId={boardParentId}
            />
        </React.Fragment>
    );
}

export default BoardDetail;