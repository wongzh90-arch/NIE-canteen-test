import React, { useState } from 'react';
import { ShoppingBag, ChevronDown, Clock, AlertCircle, Trash2 } from 'lucide-react';
import WeeklyPass from './components/WeeklyPass';
import TrafficWidget from './components/TrafficWidget';
import MenuGrid from './components/MenuGrid';
import { TIME_SLOTS } from './constants';
import { MenuItem, CartItem, TimeSlot } from './types';

function App() {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>(TIME_SLOTS[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hasPass, setHasPass] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    // In a real app, this would handle duplicates, etc.
    const newItem: CartItem = {
      ...item,
      quantity: 1,
      selectedTimeSlot: selectedSlot.time,
      finalPrice: item.basePrice * selectedSlot.multiplier
    };
    setCart([...cart, newItem]);
  };

  const removeFromCart = (indexToRemove: number) => {
    const newCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(newCart);
    if (newCart.length === 0) {
      setIsCartOpen(false);
    }
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (hasPass) {
      setHasPass(false); // Use the pass
    }
    alert("Order confirmed! Your smart queue number is A" + Math.floor(Math.random() * 100));
    setCart([]);
    setIsCartOpen(false);
  };

  const total = cart.reduce((acc, item) => acc + item.finalPrice, 0);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-6xl mx-auto bg-white min-h-screen shadow-2xl relative">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 md:px-8">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold shadow-red-200 shadow-lg">N</div>
              <h1 className="font-bold text-xl text-gray-900 tracking-tight">NIE Eats</h1>
            </div>
            <div className="flex gap-3">
              {/* AI Button removed */}
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
            
            {/* Left Sidebar: Controls (Pass, Time, Traffic) */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* Weekly Pass Status */}
              <WeeklyPass hasPass={hasPass} />

              {/* Time Slot Selector */}
              <div className="bg-white rounded-xl border border-gray-100 p-1">
                <div className="mb-2 px-3 pt-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Clock size={16} className="text-gray-400"/>
                    Pick Up Time
                  </label>
                </div>
                <div className="relative px-3 pb-2">
                  <select 
                    value={selectedSlot.time}
                    onChange={(e) => {
                      const slot = TIME_SLOTS.find(s => s.time === e.target.value);
                      if (slot) setSelectedSlot(slot);
                    }}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all font-medium"
                  >
                    {TIME_SLOTS.map(slot => (
                      <option key={slot.time} value={slot.time}>
                        {slot.label} - {slot.trafficLevel} ({slot.multiplier}x)
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-gray-500 pb-2">
                    <ChevronDown size={18} />
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-xs text-gray-500 flex items-center gap-2">
                    {selectedSlot.multiplier > 1 ? (
                      <span className="text-red-500 font-medium bg-red-50 px-2 py-1 rounded-md flex items-center gap-1">
                         Surge Pricing Active
                      </span>
                    ) : (
                      <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md">
                        Best Price Available
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Traffic Chart */}
              <TrafficWidget />
            </div>

            {/* Right Main Content: Menu */}
            <div className="lg:col-span-7 xl:col-span-8 mt-8 lg:mt-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 gap-2">
                <h3 className="font-bold text-2xl text-gray-900">Available for Pre-order</h3>
                <span className="text-sm text-gray-500">Showing items for {selectedSlot.label}</span>
              </div>
              <MenuGrid selectedSlot={selectedSlot} onAddToCart={addToCart} />
            </div>

          </div>
        </main>

        {/* Floating Action Button / Cart */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-40">
            {isCartOpen ? (
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 p-5 mb-2 animate-in slide-in-from-bottom-10 ring-1 ring-black/5">
                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                  <h3 className="font-bold text-lg">Your Tray</h3>
                  <div className="flex gap-3 items-center">
                    <button onClick={clearCart} className="text-red-500 text-sm hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors">Clear</button>
                    <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600">Close</button>
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-3 mb-5 pr-1">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm group">
                      <div className="flex items-center gap-3">
                         <div className="bg-gray-100 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium text-gray-500">1x</div>
                         <span className="font-medium text-gray-700">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">${item.finalPrice.toFixed(2)}</span>
                        <button 
                          onClick={() => removeFromCart(idx)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl mb-4 border border-gray-100">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  {hasPass && (
                     <div className="flex justify-between items-center text-sm text-indigo-600 font-medium bg-indigo-50 p-2 rounded-lg">
                      <span className="flex items-center gap-1.5"><AlertCircle size={14}/> Weekly Pass Applied</span>
                      <span>Priority Queue</span>
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                >
                  Confirm Pre-order • ${total.toFixed(2)}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsCartOpen(true)}
                className="w-full bg-gray-900 text-white p-4 rounded-2xl shadow-xl flex justify-between items-center hover:bg-black transition-all hover:scale-[1.02] active:scale-[0.98] ring-4 ring-gray-100/50"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 px-3 py-1 rounded-lg font-bold backdrop-blur-sm">{cart.length}</div>
                  <span className="font-semibold">View Order</span>
                </div>
                <span className="font-bold text-lg">${total.toFixed(2)}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;