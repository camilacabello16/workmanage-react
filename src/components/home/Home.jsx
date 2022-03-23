import MenuLayout from 'components/layout/MenuLayout';
import { useHistory } from 'react-router-dom';
import { Menu, Row, Col } from 'antd';
import LeftMenuLayout from 'components/layout/LeftMenuLayout';

const { SubMenu } = Menu;

function Home() {
    const history = useHistory();
    return (
        <div style={{ height: 'calc(100vh - 46px)' }}>
            <Row>
                <Col span={4}>
                    <LeftMenuLayout />
                </Col>
            </Row>
        </div>
    );
}

export default Home;
