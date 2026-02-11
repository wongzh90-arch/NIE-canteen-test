import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TIME_SLOTS } from '../constants';

const data = TIME_SLOTS.map(slot => ({
  name: slot.time,
  traffic: slot.multiplier * 100 - 80, // rough simulation derived from multiplier
  price: slot.multiplier,
}));

const TrafficWidget: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Live Traffic & Surge Pricing</h3>
        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full animate-pulse">
          Peak Hour: 12:00 - 13:00
        </span>
      </div>
      
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              labelStyle={{ color: '#666' }}
            />
            <Area 
              type="monotone" 
              dataKey="traffic" 
              stroke="#ef4444" 
              fillOpacity={1} 
              fill="url(#colorTraffic)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>Off-Peak (0.8x)</span>
        </div>
         <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span>Peak (1.3x)</span>
        </div>
      </div>
    </div>
  );
};

export default TrafficWidget;
