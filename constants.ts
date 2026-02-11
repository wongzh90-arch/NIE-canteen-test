import { MenuItem, TimeSlot } from './types';

export const TIME_SLOTS: TimeSlot[] = [
  { time: '11:00', label: '11:00 AM', multiplier: 0.9, trafficLevel: 'Low' },
  { time: '11:30', label: '11:30 AM', multiplier: 1.0, trafficLevel: 'Medium' },
  { time: '12:00', label: '12:00 PM', multiplier: 1.3, trafficLevel: 'Peak' },
  { time: '12:30', label: '12:30 PM', multiplier: 1.3, trafficLevel: 'Peak' },
  { time: '13:00', label: '01:00 PM', multiplier: 1.1, trafficLevel: 'High' },
  { time: '13:30', label: '01:30 PM', multiplier: 1.0, trafficLevel: 'Medium' },
  { time: '14:00', label: '02:00 PM', multiplier: 0.8, trafficLevel: 'Low' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Hainanese Chicken Rice',
    stall: 'Nanyang Delights',
    basePrice: 4.50,
    category: 'Local',
    image: 'https://images.unsplash.com/photo-1621355416524-76673891c981?auto=format&fit=crop&w=800&q=80',
    calories: 600,
    prepTime: 5
  },
  {
    id: '2',
    name: 'Vegetarian Bee Hoon',
    stall: 'Green Bites',
    basePrice: 3.80,
    category: 'Vegetarian',
    image: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=800&q=80',
    calories: 450,
    prepTime: 3
  },
  {
    id: '3',
    name: 'Spicy Mala Xiang Guo',
    stall: 'Sichuan Kitchen',
    basePrice: 8.00,
    category: 'Spicy',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=80',
    calories: 800,
    prepTime: 12
  },
  {
    id: '4',
    name: 'Grilled Salmon Bowl',
    stall: 'Healthy Greens',
    basePrice: 9.50,
    category: 'Western',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    calories: 550,
    prepTime: 10
  },
  {
    id: '5',
    name: 'Roti Prata Set',
    stall: 'Indian Cuisine',
    basePrice: 3.50,
    category: 'Local',
    image: 'https://images.unsplash.com/photo-1626509653294-436979645224?auto=format&fit=crop&w=800&q=80',
    calories: 700,
    prepTime: 6
  },
];
