/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';

export async function getOrders() {
  try {
    const data = await fetch(`https://mealbox-server.vercel.app/api/customers/orders`, {
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

export async function makeOrder(orderData: FieldValues) {
  try {
    const data = await fetch(`https://mealbox-server.vercel.app/api/customers/order`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${(await cookies()).get('accessToken')!.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    const result = await data.json();

    revalidateTag('Orders');
    return result;
  } catch (error: any) {
    return Error(error);
  }
}
