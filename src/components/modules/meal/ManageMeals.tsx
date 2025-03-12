// 'use client';

import AddMealDialog from './AddMealDialog';
import MenuTabs from './MenuTabs';
import { getMenus } from '@/services/Menus';


const PostMealMenu = async () => {

  const menus = await getMenus();


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
