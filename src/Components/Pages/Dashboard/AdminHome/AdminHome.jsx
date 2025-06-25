import React from "react";
import useAuthContext from "../../../../hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecur from "../../../../hooks/useAxiosSecur";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Color arrays for charts
const barColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c'];
const pieColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
  const { user } = useAuthContext();
  const axiosSecur = useAxiosSecur();

  // Admin stats
  const { data = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecur.get("/admin-stats");
      return res.data;
    },
  });

  // Order stats (chart)
  const { data: chartData = [] } = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const res = await axiosSecur.get('/order-stats');
      return res.data;
    }
  });

  // Stat Cards
  const stats = [
    { title: "Users", value: data.users || 0, icon: "👤" },
    { title: "Products", value: data.products || 0, icon: "📦" },
    { title: "Reviews", value: data.reviews || 0, icon: "⭐" },
    { title: "Orders", value: data.orders || 0, icon: "🛒" },
    { title: "Revenue", value: `$${data.revenue || 0}`, icon: "💰" },
  ];

  // Triangle Bar Custom Shape
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
      C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2},${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width},${y + height}
      Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // Pie Chart Label
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Pie chart data
  const piechartData = chartData?.map(data => ({
    name: data.category || data._id || 'Unknown',
    value: data.revenue || 0
  })) || [];

  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-3xl font-bold  mb-6">🛠 Admin Dashboard</h1>

      {user?.displayName && (
        <p className="text-lg  mb-6">Welcome, {user.displayName}</p>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className=" p-5 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className=" text-sm">{stat.title}</p>
                <p className="text-xl font-bold ">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <section className="grid md:grid-cols-2 gap-10">
        {/* Bar Chart */}
        <div className=" p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Product Orders by Category</h2>
          <BarChart
            width={400}
            height={300}
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className=" p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Revenue Distribution</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={piechartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {piechartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
