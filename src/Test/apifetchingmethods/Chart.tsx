import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 300, pv: 2200, amt: 2200 },
  { name: "Page C", uv: 200, pv: 2000, amt: 2000 },
  { name: "Page D", uv: 278, pv: 1980, amt: 1980 },
  { name: "Page E", uv: 189, pv: 1800, amt: 1800 },
];

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
