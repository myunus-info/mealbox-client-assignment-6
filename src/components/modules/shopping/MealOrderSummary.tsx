/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MinusCircle, PlusCircle, ShoppingCart, Trash2 } from 'lucide-react';
import { IMeal } from '@/components/modules/meal/MenuItemCard';
import { toast } from 'sonner';
import { makeOrder } from '@/services/Orders';

interface OrderItem {
  meal: IMeal;
  quantity: number;
}

interface MealOrderSummaryProps {
  orderItems: OrderItem[];
  onUpdateQuantity: (mealId: string, newQuantity: number) => void;
  onRemoveItem: (mealId: string) => void;
  onClearItems: () => void;
}

const MealOrderSummary: React.FC<MealOrderSummaryProps> = ({
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearItems,
}) => {
  const calculateSubtotal = () => {
    return orderItems.reduce((total, item) => total + +item.meal.price * item.quantity, 0);
  };

  const orderData = {
    provider: '',
    meals: [{ meal: '', quantity: 0, price: '' }],
    dietaryPreferences: '',
  };
  orderItems.forEach(order => {
    orderData.provider = order.meal.provider;
    orderData.meals = [{ meal: order.meal._id, quantity: order.quantity, price: order.meal.price }];
    orderData.dietaryPreferences = order.meal.dietaryTags.at(0) || '';
  });

  const handleCheckout = async () => {
    try {
      const res = await makeOrder(orderData);
      if (res.success) {
        toast.success(res.message);
        onClearItems();
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  if (orderItems.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Order</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShoppingCart className="mb-2 h-12 w-12 text-gray-300" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add items from the menu to get started
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Order</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {orderItems.map(item => (
            <div
              key={item.meal._id}
              className="flex items-start justify-between py-2 border-b last:border-0"
            >
              <div className="flex-1">
                <h4 className="font-medium">{item.meal.name}</h4>
                <p className="text-sm text-muted-foreground">
                  ${Number(item.meal.price).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onUpdateQuantity(item.meal._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onUpdateQuantity(item.meal._id, item.quantity + 1)}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-red-500"
                  onClick={() => onRemoveItem(item.meal._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-4 border-t">
        <div className="w-full flex justify-between">
          <span className="font-medium">Subtotal</span>
          <span className="font-bold">${calculateSubtotal().toFixed(2)}</span>
        </div>
        <Button className="w-full cursor-pointer" onClick={handleCheckout}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealOrderSummary;
