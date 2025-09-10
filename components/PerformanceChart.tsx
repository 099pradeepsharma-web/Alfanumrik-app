
import React from 'react';
import type { StudentPerformance } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  data: StudentPerformance[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  // Aggregate data by subject
  const subjectData = data.reduce((acc, student) => {
    if (!acc[student.subject]) {
      acc[student.subject] = {
        subject: student.subject,
        totalScore: 0,
        count: 0,
      };
    }
    acc[student.subject].totalScore += student.score;
    acc[student.subject].count += 1;
    return acc;
  }, {} as Record<string, { subject: string; totalScore: number; count: number }>);

  const chartData = Object.values(subjectData).map(item => ({
    name: item.subject,
    "Average Score": Math.round(item.totalScore / item.count),
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem'
            }}
          />
          <Legend />
          <Bar dataKey="Average Score" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
