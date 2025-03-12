// 'use client';

// import React, { useEffect, useState } from 'react';
import AddMealDialog from './AddMealDialog';
import MenuTabs from './MenuTabs';
import { getMenus } from '@/services/Menus';

// interface IMeal {
//   _id: string;
//   name: string;
//   description: string;
//   cuisineSpecialties: string[];
//   price: string;
//   experience: string;
//   imageUrl: string;
//   category: string;
//   mealTypes: string[];
//   dietaryTags: string[];
// }

const PostMealMenu = async () => {
  // const [menuItems, setMenuItems] = useState<IMeal[] | []>([]);

  // useEffect(() => {
  //   const getAllMenus = async () => {
  const menus = await getMenus();
  //     setMenuItems(menus?.data);
  //   };

  //   getAllMenus();
  // }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meal Menu</h1>
          <p className="text-muted-foreground">Create and manage your meal offerings</p>
        </div>
        <div>
          <AddMealDialog />
        </div>
      </div>

      <MenuTabs menuItems={menus?.data} />
    </div>
  );
};

export default PostMealMenu;
