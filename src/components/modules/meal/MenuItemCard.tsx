'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChefHat, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import EditMealDialog from './EditMealDialog';
import ConfirmDeleteModal from '@/components/ui/core/ConfirmDeleteModal';
import { deleteMenu } from '@/services/Menus';
import { toast } from 'sonner';

export interface IMeal {
  _id: string;
  provider: string;
  name: string;
  description: string;
  cuisineSpecialties: string[];
  price: string;
  experience: string;
  imageUrl: string;
  category: string;
  mealTypes: string[];
  dietaryTags: string[];
}

interface MenuItemCardProps {
  item: IMeal;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const handleDeleteConfirm = async () => {
    try {
      const res = await deleteMenu(item._id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  return (
    <Card key={item._id} className="overflow-hidden mb-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 h-48 md:h-auto bg-gray-100">
          <Image
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            width={500}
            height={500}
          />
        </div>
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{item.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="capitalize">{item.category}</span>
                {+item.experience > 0 && (
                  <div className="flex items-center gap-1">
                    <ChefHat className="h-3 w-3" />
                    <span>{item.experience} years experience</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-lg mr-4">${parseFloat(item.price).toFixed(2)}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <EditMealDialog item={item} />
                  <DropdownMenuSeparator />
                  <ConfirmDeleteModal name={item.name} onConfirm={handleDeleteConfirm} />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="my-4">{item.description}</p>

          <div className="mt-4 space-y-2">
            {item?.cuisineSpecialties?.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Cuisine:</span>
                <div className="flex flex-wrap gap-1">
                  {item.cuisineSpecialties.map(cuisine => (
                    <Badge
                      key={cuisine}
                      variant="secondary"
                      className="bg-amber-100 text-amber-800"
                    >
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {item?.mealTypes?.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Available for:</span>
                <div className="flex flex-wrap gap-1">
                  {item.mealTypes.map(meal => (
                    <Badge key={meal} variant="secondary" className="bg-blue-100 text-blue-800">
                      {meal}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {item?.dietaryTags?.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {item.dietaryTags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard;
