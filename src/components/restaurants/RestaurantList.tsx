import React from 'react';
import { format } from 'date-fns';
import { Building2, Phone, Calendar } from 'lucide-react';

interface Restaurant {
  _id: string;
  name: string;
  status: string;
  lastCallDate?: Date;
  nextCallDate?: Date;
  performanceScore: number;
}

interface Props {
  restaurants: Restaurant[];
}

const RestaurantList: React.FC<Props> = ({ restaurants }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {restaurants.map((restaurant) => (
        <div key={restaurant._id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <Building2 className="w-5 h-5 text-gray-400 mr-2" />
              <h3 className="font-medium text-gray-900">{restaurant.name}</h3>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              restaurant.status === 'customer' ? 'bg-green-100 text-green-800' :
              restaurant.status === 'prospect' ? 'bg-blue-100 text-blue-800' :
              restaurant.status === 'lead' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {restaurant.status}
            </span>
          </div>

          <div className="mt-4 space-y-2">
            {restaurant.lastCallDate && (
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>Last Call: {format(new Date(restaurant.lastCallDate), 'MMM d, yyyy')}</span>
              </div>
            )}
            {restaurant.nextCallDate && (
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Next Call: {format(new Date(restaurant.nextCallDate), 'MMM d, yyyy')}</span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Performance Score</span>
              <span className="font-medium">{restaurant.performanceScore}%</span>
            </div>
            <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${restaurant.performanceScore}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;