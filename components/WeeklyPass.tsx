import React from 'react';
import { Ticket, Star } from 'lucide-react';

interface WeeklyPassProps {
  hasPass: boolean;
}

const WeeklyPass: React.FC<WeeklyPassProps> = ({ hasPass }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 text-white mb-6 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-2 -mr-2 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Ticket size={20} />
              NIE Smart Pass
            </h2>
            <p className="text-indigo-100 text-xs mt-1">
              Guaranteed priority pre-order slot.
            </p>
          </div>
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
             <Star className={hasPass ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} size={20} />
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs font-medium bg-indigo-800/50 px-3 py-1 rounded-full">
            {hasPass ? '1 Credit Available' : '0 Credits Left'}
          </div>
          <div className="text-xs text-indigo-200">
            Resets on Monday
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPass;
