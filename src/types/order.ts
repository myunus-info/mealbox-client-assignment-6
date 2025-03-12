interface Customer {
  name: string;
}

interface Meal {
  name: string;
}

interface MealItem {
  meal: Meal;
  quantity: number;
  price: number;
  _id: string;
}

export interface TOrder {
  _id: string;
  customer: Customer;
  provider: string;
  meals: MealItem[];
  dietaryPreferences: string;
  status: 'pending' | 'in_progress' | 'delivered';
  createdAt: string;
  updatedAt: string;
  __v: number;
}
