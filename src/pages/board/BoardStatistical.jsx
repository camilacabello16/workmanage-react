import {
    Modal,
    Form,
    Input,
    Select,
    Space,
    Button,
    notification,
    Row,
    ConfigProvider,
    Col,
} from 'antd';
import {
    ROOT_API,
    API_STATISTICAL,
    API_STATISTICAL_MEMBER,
    API_STATISTICAL_TASK
} from '../../components/constant/api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
const { Option } = Select;

const BoardStatistical = ({ currentBoardID, activeKey }) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const [dataTask, setDataTask] = useState([]);
    const [dataMember, setDataMember] = useState([]);

    let url01 = ROOT_API + API_STATISTICAL_MEMBER + currentBoardID;
    let url02 = ROOT_API + API_STATISTICAL_TASK + currentBoardID;

    const getStatisticCard = () => {
        axios.get(url01).then(res01 => {
            let data01 = [];
            for (const [name, value] of Object.entries(res01.data)) {
                data01.push({ name: name, value: value });
            }
            console.log(data01);
            setDataMember(data01);
        });
    };

    const getStatisticMember = () => {
        axios.get(url02).then(res02 => {
            let data02 = [];
            for (const [name, value] of Object.entries(res02.data)) {
                data02.push({ name: name, value: value });
            }
            console.log(data02);
            setDataTask(data02);
        });
    };

    useEffect(() => {
        getStatisticCard();
        getStatisticMember();
    }, [activeKey]);

    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    var rgb = ["maroon", "red", "purple", "fuchsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua", "black", "silver", "gray", "white"];
    return (
        <div
            style={{
                display: 'flex'
            }}
        >
            <div>
                <p style={{ fontSize: 20 }}>Thống kê số công việc của từng danh sách</p>
                <PieChart width={500} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={dataTask}
                        cx={200}
                        cy={200}
                        label={renderCustomizedLabel}
                        // outerRadius={120}
                        labelLine={false}
                    >
                        {dataTask.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getRandomColor()} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
            <div>
                <p style={{ fontSize: 20 }}>Thống kê số công việc theo người làm</p>
                <PieChart width={500} height={400}>
                    <Pie
                        dataKey="value"
                        data={dataMember}
                        cx={200}
                        cy={200}
                        // outerRadius={120}
                        fill="#82ca9d"
                        label={renderCustomizedLabel}
                        labelLine={false}
                        isAnimationActive={false}
                    >
                        {dataMember.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getRandomColor()} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
        </div>
        // {/* <Pie
        //     dataKey="value"
        //     isAnimationActive={false}
        //     data={dataTask}
        //     cx={200}
        //     cy={200}
        //     label={renderCustomizedLabel}
        //     outerRadius={120}
        //     labelLine={false}
        // >
        //     {dataTask.map((entry, index) => (
        //         <Cell key={`cell-${index}`} fill={getRandomColor()} />
        //     ))}
        // </Pie> */}
        // <Pie
        //     dataKey="value"
        //     data={dataMember}
        //     cx={500}
        //     cy={200}
        //     outerRadius={120}
        //     fill="#82ca9d"
        //     label={renderCustomizedLabel}
        //     labelLine={false}
        // >
        //     {dataMember.map((entry, index) => (
        //         <Cell key={`cell-${index}`} fill={getRandomColor()} />
        //     ))}
        // </Pie>
        // <Tooltip />
    );
}

export default BoardStatistical;