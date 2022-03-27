import {
    Card,
    Row,
    Col,
    Button
} from 'antd';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';

const BoardDetail = () => {
    const [listCard, setListCard] = useState([
        {
            id: "1",
            name: 'Todo'
        },
        {
            id: "2",
            name: 'Doing'
        },
        {
            id: "3",
            name: 'Done'
        },
    ]);
    const [listTask, setListTask] = useState([
        {
            id: "1",
            cardId: "1",
            name: 'test 1'
        },
        {
            id: "2",
            cardId: "2",
            name: 'test 2'
        },
        {
            id: "3",
            cardId: "1",
            name: 'test 3'
        },
        {
            id: "4",
            cardId: "3",
            name: 'test 4'
        },
        {
            id: "5",
            cardId: "2",
            name: 'test 5'
        },
    ]);
    const history = useHistory();

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;

        console.log(result);
    };

    return (
        <div style={{ height: 'calc(100vh - 46px)' }}>
            <Card
                style={{ height: 'calc(100vh - 46px)' }}
                bordered
                title={
                    <Row>
                        <Col span={6}>Board 1</Col>

                        <Col span={12}></Col>
                        <Col span={6} style={{ textAlign: 'right' }}>
                            <Button onClick={() => history.push('/')} style={{ marginRight: 10 }}>Back</Button>
                            <Button>Invite</Button>
                            <Button type='primary' style={{ marginLeft: 10 }}>Edit</Button>
                            <Button type='primary' style={{ marginLeft: 10 }}>Delete</Button>
                        </Col>
                    </Row>
                }
            >
                <DragDropContext
                    onDragEnd={result => onDragEnd(result)}
                >
                    <div
                        style={{
                            display: 'flex'
                        }}
                    >
                        {listCard.map((item, index) => {
                            return (
                                <div style={{ marginRight: 10 }} key={index}>
                                    <h3>{item.name}</h3>
                                    <div>
                                        <Droppable droppableId={item.id} key={item.id}>
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
                                                            minHeight: 300
                                                        }}
                                                    >
                                                        {listTask.map((item2, index) => {
                                                            return (
                                                                <span>
                                                                    {item2.cardId == item.id &&
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
                                                                                        {...provided2.dragHandleProps}
                                                                                        style={{
                                                                                            userSelect: "none",
                                                                                            padding: 16,
                                                                                            margin: "0 0 8px 0",
                                                                                            minHeight: "50px",
                                                                                            backgroundColor: snapshot.isDragging
                                                                                                ? "#263B4A"
                                                                                                : "#456C86",
                                                                                            color: "white",
                                                                                            ...provided2.draggableProps.style
                                                                                        }}
                                                                                    >
                                                                                        {item2.name}
                                                                                    </div>
                                                                                );
                                                                            }}
                                                                        </Draggable>
                                                                    }

                                                                </span>

                                                            );
                                                        })}
                                                        {provided1.placeholder}
                                                    </div>
                                                );
                                            }}
                                        </Droppable>
                                    </div>
                                </div>

                            );
                        })}
                    </div>
                </DragDropContext>
            </Card>
        </div>
    );
}

export default BoardDetail;