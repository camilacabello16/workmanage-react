import MenuLayout from 'components/layout/MenuLayout';
import { useHistory } from 'react-router-dom';
import {
    Menu,
    Row,
    Col,
    PageHeader,
    Button,
    Tab
} from 'antd';
import LeftMenuLayout from 'components/layout/LeftMenuLayout';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

function Home() {
    const history = useHistory();
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
        </div>
    );
}

export default Home;
