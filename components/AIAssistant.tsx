import React, { useState } from 'react';
import { Sparkles, Send, X, Loader2 } from 'lucide-react';
import { getSmartRecommendation } from '../services/geminiService';

interface AIAssistantProps {
  onClose: () => void;
  onSelectRecommendation: (dishName: string, time: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose, onSelectRecommendation }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<any>(null);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    
    // Simulate current time for context
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    try {
      const resultJson = await getSmartRecommendation(input, now);
      // Clean up markdown if present
      const cleanJson = resultJson.replace(/```json/g, '').replace(/```/g, '').trim();
      const result = JSON.parse(cleanJson);
      setSuggestion(result);
    } catch (e) {
      console.error(e);
      setSuggestion({
        recommendation: "Daily Special Set",
        reason: "Could not analyze request perfectly, but this is popular!",
        suggestedTime: "11:30",
        estimatedSavings: "N/A"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles size={20} />
            <h3 className="font-bold">NIE Food Genius</h3>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {!suggestion ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                "I have a class at 2pm and want something spicy."
              </p>
              <p className="text-sm text-gray-400">
                Tell me your schedule or cravings, and I'll find the most efficient slot.
              </p>
            </div>
          ) : (
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4">
              <h4 className="font-bold text-teal-900 text-lg mb-1">{suggestion.recommendation}</h4>
              <p className="text-teal-700 text-sm mb-4">{suggestion.reason}</p>
              
              <div className="flex gap-3 text-xs">
                <div className="bg-white px-3 py-1.5 rounded-lg border border-teal-200 shadow-sm">
                  <span className="block text-gray-400 uppercase text-[10px]">Best Time</span>
                  <span className="font-semibold text-gray-800">{suggestion.suggestedTime}</span>
                </div>
                 <div className="bg-white px-3 py-1.5 rounded-lg border border-teal-200 shadow-sm">
                  <span className="block text-gray-400 uppercase text-[10px]">Est. Savings</span>
                  <span className="font-semibold text-green-600">{suggestion.estimatedSavings}</span>
                </div>
              </div>

              <button 
                onClick={() => onSelectRecommendation(suggestion.recommendation, suggestion.suggestedTime)}
                className="w-full mt-4 bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
              >
                Accept Suggestion
              </button>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="E.g., cheap healthy lunch..."
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button 
              onClick={handleAsk}
              disabled={loading}
              className="absolute right-2 top-2 p-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
