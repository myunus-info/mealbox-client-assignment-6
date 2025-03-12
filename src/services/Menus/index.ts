/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';

type TQuery = {
  [key: string]: string | string[] | undefined;
};

export async function getMenus(query?: TQuery) {
  const params = new URLSearchParams();

  if (query?.searchTerm) {
    params.append('searchTerm', query?.searchTerm.toString().toLowerCase());
  }
  if (query?.cuisineSpecialties) {
    params.append('cuisineSpecialties', query?.cuisineSpecialties.toString());
  }
  if (query?.mealTypes) {
    params.append('mealTypes', query?.mealTypes.toString());
  }
  if (query?.dietaryTags) {
    params.append('dietaryTags', query?.dietaryTags.toString());
  }

  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu?${params}`, {
      next: {
        tags: ['Menus'],
      },
      headers: {
        Authorization: `Bearer ${(await cookies()).get('accessToken')!.value}`,
      },
    });
    const result = await data.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
}

export async function addMenu(menuData: FieldValues) {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${(await cookies()).get('accessToken')!.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(menuData),
    });
    const result = await data.json();

    revalidateTag('Menus');
    return result;
  } catch (error: any) {
    return Error(error);
  }
}

export async function updateMenu(menuId: string, menuData: FieldValues) {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu/${menuId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${(await cookies()).get('accessToken')!.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(menuData),
    });
    const result = await data.json();

    revalidateTag('Menus');
    return result;
  } catch (error: any) {
    return Error(error);
  }
}

export async function deleteMenu(menuId: string) {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu/${menuId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${(await cookies()).get('accessToken')!.value}`,
      },
    });
    const result = await data.json();

    revalidateTag('Menus');
    return result;
  } catch (error: any) {
    return Error(error);
  }
}

export async function getSingleMenu(mealId: string) {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu/${mealId}`, {
      headers: {
        Authorization: `Bearer ${(await cookies()).get('accessToken')!.value}`,
      },
    });
    const result = await data.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
}
