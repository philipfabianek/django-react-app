import { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  LogOut,
} from 'lucide-react';

import { useLoggedIn, useLogout, useUser } from '@hooks';

const DashboardPage = () => {
  const loggedIn = useLoggedIn();
  const user = useUser();
  const logout = useLogout();

  const data = useMemo(() => {
    return [
      { name: 'Jan', sales: 4000, users: 2400, amt: 2400 },
      { name: 'Feb', sales: 3000, users: 1398, amt: 2210 },
      { name: 'Mar', sales: 2000, users: 9800, amt: 2290 },
      { name: 'Apr', sales: 2780, users: 3908, amt: 2000 },
      { name: 'May', sales: 1890, users: 4800, amt: 2181 },
      { name: 'Jun', sales: 2390, users: 3800, amt: 2500 },
    ];
  }, []);

  const stats = useMemo(() => {
    return [
      {
        title: 'Total Users',
        value: '10,893',
        icon: Users,
        color: 'bg-blue-500',
      },
      {
        title: 'Revenue',
        value: '$54,320',
        icon: DollarSign,
        color: 'bg-green-500',
      },
      {
        title: 'Orders',
        value: '1,230',
        icon: ShoppingCart,
        color: 'bg-yellow-500',
      },
      {
        title: 'Growth',
        value: '+12.5%',
        icon: TrendingUp,
        color: 'bg-pink-500',
      },
    ];
  }, []);

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-20 p-8 rounded-2xl shadow-2xl backdrop-blur-lg relative"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <div className="flex items-center">
            <span className="text-white mr-4">{user?.email}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => logout()}
              className="flex items-center bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition duration-300"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`${stat.color} rounded-lg p-6 text-white`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-75">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon size={24} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white bg-opacity-20 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.2)"
              />
              <XAxis dataKey="name" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  color: '#333',
                }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
              <Bar dataKey="users" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white bg-opacity-20 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-4">
            {[1, 2, 3].map((item) => (
              <li
                key={item}
                className="bg-white bg-opacity-10 rounded p-4 text-white"
              >
                <p className="font-semibold">User {item} made a purchase</p>
                <p className="text-sm opacity-75">2 hours ago</p>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
