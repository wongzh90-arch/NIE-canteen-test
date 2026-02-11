import React from 'react';
import { MENU_ITEMS } from '../constants';
import { MenuItem, TimeSlot } from '../types';
import { Plus, Clock } from 'lucide-react';

interface MenuGridProps {
  selectedSlot: TimeSlot;
  onAddToCart: (item: MenuItem) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({ selectedSlot, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pb-32">
      {MENU_ITEMS.map((item) => {
        const dynamicPrice = (item.basePrice * selectedSlot.multiplier).toFixed(2);
        const isPeak = selectedSlot.multiplier > 1.1;

        return (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 transition-all hover:shadow-md hover:border-gray-200 group">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover bg-gray-200 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-semibold text-gray-800 leading-tight">{item.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium ${isPeak ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                    ${dynamicPrice}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 font-medium">{item.stall}</p>
                <div className="flex gap-2 mt-2">
                   <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{item.category}</span>
                   <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{item.calories} kcal</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mt-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                  <Clock size={14} />
                  <span>{item.prepTime} min</span>
                </div>
                <button 
                  onClick={() => onAddToCart(item)}
                  className="bg-gray-900 text-white p-2.5 rounded-lg hover:bg-gray-700 active:bg-black transition-colors shadow-sm group-hover:shadow-md"
                  aria-label={`Add ${item.name} to cart`}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuGrid;