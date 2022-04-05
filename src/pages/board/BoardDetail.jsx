import {
    Card,
    Row,
    Col,
    Button
} from 'antd';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

const BoardDetail = () => {
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

    const onDragEnd = (result, columns, setColumns) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        console.log(result);
    };

    return (
        <div style={{ height: 'calc(100vh - 46px)' }}>
            <Card
                style={{
                    height: 'calc(100vh - 46px)',
                }}
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
                                                        <h3 {...provided.dragHandleProps}>{item.name}</h3>
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
                                                                                                                <EditOutlined
                                                                                                                    style={{
                                                                                                                        cursor: 'pointer'
                                                                                                                    }}
                                                                                                                />
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
                    <Button className='button-icon' icon={<PlusOutlined></PlusOutlined>} type="primary">Add another list</Button>
                </div>
            </Card>
        </div>
    );
}

export default BoardDetail;