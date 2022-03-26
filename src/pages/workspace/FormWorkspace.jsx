import {
    Modal,
    Drawer,
    Form,
    Space,
    Button,
    Input,
    Select
} from 'antd';

const { Option } = Select;

const FormWorkspace = ({ visible, setIsVisible }) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 },
        align: 'left'
    };

    const onClose = () => {
        setIsVisible(false);
    }

    const onSubmit = () => {
        form.validateFields().then((values) => {

        })
    }

    return (
        <Drawer
            visible={visible}
            title="Create Workspace"
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
                    label="Workspace name"
                    rules={[
                        { required: true, message: 'Please enter workspace name' }
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
                        <Option key={1} value={1}>Small Business</Option>
                        <Option key={2} value={2}>Marketing</Option>
                    </Select>
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