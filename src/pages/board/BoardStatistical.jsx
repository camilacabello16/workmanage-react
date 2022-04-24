import {
    Modal,
    Form,
    Input,
    Select,
    Space,
    Button,
    notification,
    Row,
    ConfigProvider
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

const BoardStatistical = ({ currentBoardID }) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const [dataTask, setDataTask] = useState([]);
    const [dataMember, setDataMember] = useState([]);
    let data01 = [];
    let url01 = ROOT_API + API_STATISTICAL_MEMBER + currentBoardID;
    let url02 = ROOT_API + API_STATISTICAL_TASK + currentBoardID;
    let data02 = [];
    useEffect(() => {
        axios.get(url01).then(res01 => {
            for (const [name, value] of Object.entries(res01.data)) {
                data01.push({ name: name, value: value });
            }
            console.log(data01);
            setDataMember(data01);
        })
        axios.get(url02).then(res02 => {
            for (const [name, value] of Object.entries(res02.data)) {
                data02.push({ name: name, value: value });
            }
            console.log(data02);
            setDataTask(data02);
        })
    }, [])
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };
    var rgb = ["maroon", "red", "purple", "fuchsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua", "black", "silver", "gray", "white"];
    return (
        <PieChart width={1000} height={400}>
            <Pie
                dataKey="value"
                isAnimationActive={false}
                data={dataTask}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label
            >
                {dataTask.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={rgb[index % rgb.length]} />
                ))}
            </Pie>
            <Pie
                dataKey="value"
                data={dataMember}
                cx={500}
                cy={200}
                innerRadius={40}
                outerRadius={80}
                fill="#82ca9d"
            >
                {dataMember.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={rgb[index % rgb.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
}

export default BoardStatistical;