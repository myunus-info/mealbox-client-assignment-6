'use client';

import { useState } from 'react';
import MealSelectionCard from './MealSelectionCard';
import MealFilters from './MealFilters';
import MealOrderSummary from './MealOrderSummary';
import { IMeal } from '@/components/modules/meal/MenuItemCard';
import { toast } from 'sonner';

interface OrderItem {
  meal: IMeal;
  quantity: number;
}

const SelectMeals = ({ menuItems }: { menuItems: IMeal[] }) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const handleAddToOrder = (meal: IMeal, quantity: number) => {
    setOrderItems(prevItems => {
      // Check if the meal is already in the order
      const existingItemIndex = prevItems.findIndex(item => item.meal._id === meal._id);

      if (existingItemIndex >= 0) {
        // Update the quantity if the meal is already in the order
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        // Add the new meal to the order
        return [...prevItems, { meal, quantity }];
      }
    });

    toast.success('Added to order');
  };

  const handleUpdateQuantity = (mealId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(mealId);
      return;
    }

    setOrderItems(prevItems =>
      prevItems.map(item => (item.meal._id === mealId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (mealId: string) => {
    setOrderItems(prevItems => prevItems.filter(item => item.meal._id !== mealId));
  };
  const handleClearItems = () => {
    setOrderItems([]);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Select Meals</h1>
        <p className="text-muted-foreground">
          Browse available meal options and customize your order
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MealFilters />

          {menuItems?.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-lg font-medium">No meals found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems?.map(meal => (
                <MealSelectionCard key={meal._id} meal={meal} onAddToOrder={handleAddToOrder} />
              ))}
            </div>
          )}
        </div>

        <div>
          <MealOrderSummary
            orderItems={orderItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearItems={handleClearItems}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectMeals;
