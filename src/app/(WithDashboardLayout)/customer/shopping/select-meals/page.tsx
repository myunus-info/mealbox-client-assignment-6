import SelectMeals from '@/components/modules/shopping/SelectMeals';
import { getMenus } from '@/services/Menus';

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SelectMeal({ searchParams }: { searchParams: TSearchParams }) {
  const query = await searchParams;
  const menuItems = await getMenus(query);

  return (
    <div>
      <SelectMeals menuItems={menuItems?.data} />
    </div>
  );
}
