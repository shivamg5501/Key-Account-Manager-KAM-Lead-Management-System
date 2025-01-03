import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { Phone, Clock } from 'lucide-react';
import CallList from '../components/calls/CallList';

const TodayCalls = () => {
  const { data: todayCalls, isLoading } = useQuery({
    queryKey: ['today-calls'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/api/restaurants/today-calls');
      return response.data;
    },
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Today's Calls</h1>
        <p className="text-gray-600 mt-2">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : todayCalls?.length === 0 ? (
        <div className="text-center py-12">
          <Phone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No calls scheduled for you today</h3>
          <p className="mt-2 text-gray-500">Check back tomorrow for new calls.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2" />
            <span>{todayCalls?.length} calls scheduled for today</span>
          </div>
          <CallList calls={todayCalls || []} />
        </div>
      )}
    </div>
  );
};

export default TodayCalls;