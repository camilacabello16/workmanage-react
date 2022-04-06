import {
    Modal,
    Form,
    Input,
    Select,
    Space,
    Button,
    notification,
    Row
} from 'antd';
import {
    ROOT_API,
    API_WORKSPACE
} from '../../components/constant/api';
import axios from 'axios';
import { useEffect } from 'react';

const { Option } = Select;

const FormBoard = ({ visible, setVisibleBoardModal, getWorkspaceDetail, parentId, currentBoard }) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    useEffect(() => {
        if (currentBoard.id) {
            form.setFieldsValue({
                name: currentBoard.name,
                description: currentBoard.description,
                visibility: currentBoard.visibility
            })
        }
    }, [currentBoard])

    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };


    const onSubmit = (values) => {
        console.log(values);
        values.userIdHost = JSON.parse(window.localStorage.getItem('auth_user')).id;
        values.parent = {
            id: parentId
        }
        if (currentBoard.id) {
            values.id = currentBoard.id;
            axios.put(ROOT_API + API_WORKSPACE + '/' + currentBoard.id, values).then(res => {
                openNotificationWithIcon('success', 'Create success');
                setVisibleBoardModal(false);
                getWorkspaceDetail();
            })
        } else {
            axios.post(ROOT_API + API_WORKSPACE, values).then(res => {
                openNotificationWithIcon('success', 'Create success');
                setVisibleBoardModal(false);
                getWorkspaceDetail();
            })
        }
    }

    return (
        <Modal
            visible={visible}
            onCancel={() => setVisibleBoardModal(false)}
            title="Create Board"
            footer={null}
        >
            <Form
                form={form}
                {...layout}
                labelAlign="left"
                onFinish={onSubmit}
            >
                <Form.Item
                    name="name"
                    label="Board name"
                    rules={[
                        { required: true, message: 'Please enter board name' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="visibility"
                    label="Visibility"
                    rules={[
                        { required: true, message: 'Please choose visibility' }
                    ]}
                >
                    <Select
                        placeholder=""
                    >
                        <Option key={1} value={1}>Private</Option>
                        <Option key={2} value={2}>Public</Option>
                    </Select>
                </Form.Item>
                <Row
                    style={{
                        display: "flex",
                        justifyContent: "end"
                    }}
                >
                    <Button onClick={() => setVisibleBoardModal(false)}>Cancel</Button>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>Submit</Button>
                </Row>

            </Form>
        </Modal>
    );
}

export default FormBoard;