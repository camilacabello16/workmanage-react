import {
    Modal,
    Drawer,
    Form,
    Space,
    Button,
    Input,
    Select,
    notification
} from 'antd';
import {
    ROOT_API,
    API_WORKSPACE
} from '../../components/constant/api';
import axios from 'axios';
import { useEffect } from 'react';

const { Option } = Select;

const FormWorkspace = ({ visible, setIsVisible, workspaceEdit, getWorkspaceDetail, getOwnWorkspace, isInsert }) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 },
        align: 'left'
    };

    useEffect(() => {
        if (!workspaceEdit) {
            return;
        }
        form.setFieldsValue({
            name: workspaceEdit.name,
            description: workspaceEdit.description,
            type: workspaceEdit.type,
            visibility: workspaceEdit.visibility
        })
    }, [workspaceEdit])

    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    const onClose = () => {
        setIsVisible(false);
    }

    const onSubmit = () => {
        form.validateFields().then((values) => {
            console.log(values);
            values.userIdHost = JSON.parse(window.localStorage.getItem('auth_user')).id;
            if (isInsert) {
                axios.post(ROOT_API + API_WORKSPACE, values).then(res => {
                    openNotificationWithIcon('success', 'Tạo không gian làm việc thành công');
                    // onClose();
                    getOwnWorkspace();
                    setIsVisible(false);
                })
            } else {
                values.id = workspaceEdit.id;
                axios.put(ROOT_API + API_WORKSPACE + '/' + workspaceEdit.id, values).then(res => {
                    openNotificationWithIcon('success', 'Cập nhật không gian làm việc thành công');
                    getWorkspaceDetail();
                    getOwnWorkspace();
                    setIsVisible(false);
                })
            }

        })
    }

    return (
        <Drawer
            visible={visible}
            title="Tạo không gian làm việc"
            onClose={onClose}
            width={'35%'}
            extra={
                <Space>
                    <Button onClick={onClose} style={{ marginBottom: 0 }}>
                        Huỷ
                    </Button>
                    <Button onClick={onSubmit} type="primary" style={{ marginBottom: 0 }}>
                        Lưu
                    </Button>
                </Space>
            }
        >
            <Form
                form={form}
                {...layout}
                labelAlign="left"
            >
                <Form.Item
                    name="name"
                    label="Tên"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên của không gian' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="type"
                    label="Phân loại"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống' }
                    ]}
                >
                    <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder=""
                    >
                        <Option key={1} value={1}>Small Business</Option>
                        <Option key={2} value={2}>Marketing</Option>
                        <Option key={3} value={3}>Sales</Option>
                        <Option key={4} value={4}>Human resources</Option>
                        <Option key={5} value={5}>Engineering-IT</Option>
                        <Option key={6} value={6}>Operations</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="visibility"
                    label="Hiển thị"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống' }
                    ]}
                >
                    <Select
                        placeholder=""
                    >
                        <Option key={1} value={1}>Riêng tư</Option>
                        <Option key={2} value={2}>Công khai</Option>
                    </Select>
                </Form.Item>
                {/* <Form.Item
                    name="type"
                    label="Type"
                    rules={[
                        { required: true, message: 'Please choose type of workspace' }
                    ]}
                >
                    <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder=""
                    >
                        <Option key={1} value={1}>Hiếu</Option>
                        <Option key={2} value={2}>Hải</Option>
                    </Select>
                </Form.Item> */}
            </Form>
        </Drawer>
    );
}

export default FormWorkspace;