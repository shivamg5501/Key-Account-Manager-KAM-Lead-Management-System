import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BarChart3, Phone, Users, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalLeads: number;
  todayCalls: number;
  activeCustomers: number;
  averagePerformance: number;
}

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await axios.get('/api/restaurants/stats');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Leads',
      value: stats?.totalLeads || 0,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: "Today's Calls",
      value: stats?.todayCalls || 0,
      icon: Phone,
      color: 'bg-green-500',
    },
    {
      title: 'Active Customers',
      value: stats?.activeCustomers || 0,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'Avg Performance',
      value: `${stats?.averagePerformance || 0}%`,
      icon: BarChart3,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${card.color}`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">{card.value}</span>
            </div>
            <h3 className="text-gray-600">{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;