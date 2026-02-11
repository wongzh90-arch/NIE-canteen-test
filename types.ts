export interface MenuItem {
  id: string;
  name: string;
  stall: string;
  basePrice: number;
  category: string;
  image: string;
  calories: number;
  prepTime: number; // minutes
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedTimeSlot: string;
  finalPrice: number;
}

export interface TimeSlot {
  time: string;
  label: string;
  multiplier: number;
  trafficLevel: 'Low' | 'Medium' | 'High' | 'Peak';
}

export enum ViewState {
  HOME = 'HOME',
  ORDER = 'ORDER',
  CHECKOUT = 'CHECKOUT'
}