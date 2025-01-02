import React from 'react';
import { format } from 'date-fns';
import { Phone, Building2, User, Clock } from 'lucide-react';

interface Call {
  _id: string;
  name: string;
  pointsOfContact: Array<{
    name: string;
    role: string;
    phone?: string;
  }>;
  nextCallDate: Date;
}

interface Props {
  calls: Call[];
}

const CallList: React.FC<Props> = ({ calls }) => {
  return (
    <div className="space-y-4">
      {calls.map((call) => (
        <div key={call._id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Building2 className="w-5 h-5 text-gray-400 mr-2" />
              <h3 className="font-medium text-gray-900">{call.name}</h3>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {format(new Date(call.nextCallDate), 'h:mm a')}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {call.pointsOfContact.map((poc, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <User className="w-4 h-4 mr-2" />
                <span>{poc.name} - {poc.role}</span>
                {poc.phone && (
                  <a
                    href={`tel:${poc.phone}`}
                    className="ml-4 flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    {poc.phone}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <Phone className="w-4 h-4 mr-2" />
              Start Call
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CallList;