import {
    Modal,
    Form,
    Input,
    Select
} from 'antd';

const { Option } = Select;

const FormBoard = ({ visible, setVisibleBoardModal }) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    return (
        <Modal
            visible={visible}
            onCancel={() => setVisibleBoardModal(false)}
            title="Create Board"
        >
            <Form
                form={form}
                {...layout}
                labelAlign="left"
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
            </Form>
        </Modal>
    );
}

export default FormBoard;