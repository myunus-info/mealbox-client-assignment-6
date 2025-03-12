import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuItemCard from './MenuItemCard';

interface IMeal {
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

interface MenuTabsProps {
  menuItems: IMeal[];
}

const MenuTabs: React.FC<MenuTabsProps> = ({ menuItems }) => {
  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All Items</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        {menuItems?.map(item => (
          <MenuItemCard key={item._id} item={item} />
        ))}
        {menuItems?.length === 0 && (
          <p className="text-center py-8 text-muted-foreground">No menu items available</p>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default MenuTabs;
