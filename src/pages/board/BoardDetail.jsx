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
    Spin
} from 'antd';
import React, { useState, useMemo, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    ROOT_API,
    API_CARD,
    API_TASK,
    API_CARD_SEARCH,
    API_TASK_SEARCH,
    API_WORKSPACE,
    API_CARD_UPDATE_VIEW
} from '../../components/constant/api';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import FormBoard from './FormBoard';
import moment from 'moment';

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const BoardDetail = () => {
    let query = useQuery();
    const [formTask] = Form.useForm();
    const [formCard] = Form.useForm();

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

    const getBoardDetail = () => {
        axios.get(ROOT_API + API_WORKSPACE + '/' + query.get("id")).then(res => {
            setBoardDetail(res.data);
            setBoardParentId(res.data.parent.id);
        })
    }

    const getCard = () => {
        setLoading(true);
        axios.post(ROOT_API + API_CARD_SEARCH, {
            pageIndex: 0,
            pageSize: 1000,
            workSpaceId: query.get("id")
        }).then(res => {
            console.log(res);
            res.data.content.sort(function (a, b) {
                return a.viewIndex - b.viewIndex
            })
            setListCard(res.data.content);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
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
            })
        } else {
            var cardDrag = listCard.find(o => o.id == result.draggableId);
            var indexChange = destination.index + 1;

            listCard.splice(source.index, 1);
            listCard.splice(destination.index, 0, cardDrag);

            axios.put(ROOT_API + API_CARD_UPDATE_VIEW + '?id=' + cardDrag.id + '&&viewIndex=' + destination.index);

            for (let i = 0; i < listCard.length; i++) {
                if (destination.index < source.index) {
                    if (listCard[i].viewIndex >= destination.index && listCard[i].viewIndex <= source.index && listCard[i].id != cardDrag.id) {
                        var indexChange2 = listCard[i].viewIndex + 1;
                        axios.put(ROOT_API + API_CARD_UPDATE_VIEW + '?id=' + listCard[i].id + '&&viewIndex=' + indexChange2).then(res => {
                            //getCard();
                            getCardDrag();
                        })
                    }
                } else {
                    if (listCard[i].viewIndex <= destination.index && listCard[i].viewIndex >= source.index && listCard[i].id != cardDrag.id) {
                        var indexChange2 = listCard[i].viewIndex - 1;
                        axios.put(ROOT_API + API_CARD_UPDATE_VIEW + '?id=' + listCard[i].id + '&&viewIndex=' + indexChange2).then(res => {
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
    }

    const onCloseCard = () => {
        setVisibleCard(false);
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
        axios.post(ROOT_API + API_TASK, value).then(res => {
            getTask();
            openNotificationWithIcon('success', 'Insert task success');
            onCloseTask();
            formTask.resetFields();
        }).catch(err => {
            openNotificationWithIcon('error', 'Insert task fail');
        })
    }

    const onAddCard = (value) => {
        let workspace = {
            id: query.get("id")
        }
        value.workSpace = workspace;
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

                                <Col span={12}></Col>
                                <Col span={6} style={{ textAlign: 'right' }}>
                                    <Button onClick={() => history.push('/workspace?id=' + boardParentId)} style={{ marginRight: 10 }}>Back</Button>
                                    <Button>Invite</Button>
                                    <Button type='primary' style={{ marginLeft: 10 }} onClick={() => setVisibleFormBoard(true)}>Edit</Button>
                                    <Button type='primary' style={{ marginLeft: 10 }} onClick={deleteBoard}>Delete</Button>
                                </Col>
                            </Row>
                        }
                    >
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
                                                                <h5 {...provided.dragHandleProps}>{item.name}</h5>
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
                                                                                                                        <span
                                                                                                                            {...provided2.dragHandleProps}
                                                                                                                            style={{
                                                                                                                                width: '100%'
                                                                                                                            }}
                                                                                                                        >{item2.name}</span>
                                                                                                                        <Tooltip title="Edit">
                                                                                                                            <EditOutlined
                                                                                                                                style={{
                                                                                                                                    cursor: 'pointer'
                                                                                                                                }}
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
                                                                                        onClick={() => insertTask(item.id)}
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
                            <Button className='button-icon' icon={<PlusOutlined></PlusOutlined>} type="primary" onClick={() => setVisibleCard(true)}>Add another list</Button>
                        </div>
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