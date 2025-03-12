import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChefHat, PlusCircle, MinusCircle, Utensils, Heart } from 'lucide-react';
import { IMeal } from '../meal/MenuItemCard';
import Image from 'next/image';

interface MealSelectionCardProps {
  meal: IMeal;
  onAddToOrder: (meal: IMeal, quantity: number) => void;
}

const MealSelectionCard: React.FC<MealSelectionCardProps> = ({ meal, onAddToOrder }) => {
  const [quantity, setQuantity] = React.useState(1);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToOrder = () => {
    onAddToOrder(meal, quantity);
    setQuantity(1); // Reset quantity after adding to order
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48">
        <Image
          width={500}
          height={500}
          src={meal.imageUrl}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white rounded-full"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
          />
        </Button>
      </div>
      <CardContent className="pt-4 flex-grow">
        <div className="mb-2">
          <h3 className="font-bold text-lg">{meal.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span className="capitalize">{meal.category}</span>
            {+meal.experience > 0 && (
              <div className="flex items-center gap-1">
                <ChefHat className="h-3 w-3" />
                <span>{meal.experience} yrs</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{meal.description}</p>

        <div className="space-y-2">
          {meal.cuisineSpecialties.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {meal.cuisineSpecialties.map(cuisine => (
                <Badge
                  key={cuisine}
                  variant="secondary"
                  className="bg-amber-100 text-amber-800 text-xs"
                >
                  {cuisine}
                </Badge>
              ))}
            </div>
          )}

          {meal.mealTypes.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {meal.mealTypes.map(meal => (
                <Badge key={meal} variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                  {meal}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-3 flex flex-col gap-2">
        <div className="flex justify-between items-center w-full">
          <span className="font-bold text-lg">${Number(meal.price).toFixed(2)}</span>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleDecrement}>
              <MinusCircle className="h-5 w-5 text-gray-600" />
            </Button>
            <span className="mx-2 font-medium">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={handleIncrement}>
              <PlusCircle className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
        <Button className="w-full" onClick={handleAddToOrder}>
          <Utensils className="mr-2 h-4 w-4" />
          Add to Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealSelectionCard;
