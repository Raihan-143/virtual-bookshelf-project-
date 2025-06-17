import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    fetch(`https://your-server-api.com/books?email=${user?.email}`)
      .then(res => res.json())
      .then(data => setBookData(data));
  }, [user]);

  // ✅ এখানে reduce সঠিকভাবে বাইরেই ব্যবহার করতে হবে
  const categoryCount = bookData.reduce((acc, book) => {
    acc[book.book_category] = (acc[book.book_category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(categoryCount).map(([category, count]) => ({
    name: category,
    value: count,
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>👤 প্রোফাইল তথ্য</h2>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img src={user?.photoURL} alt="profile" className='w-24 h-24 rounded-full border-2 border-indigo-500' />
        <div>
          <h3 className='text-lg font-semibold'>👨‍🎓 নাম: {user?.displayName}</h3>
          <p className='text-gray-600'>📧 ইমেইল: {user?.email}</p>
          <p className='text-gray-600'>📚 মোট বই: {bookData.length}</p>
        </div>
      </div>

      <div className='mt-10'>
        <h3 className='text-xl font-semibold mb-4'>📊 বইয়ের ক্যাটাগরি অনুযায়ী চার্ট</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Profile;
