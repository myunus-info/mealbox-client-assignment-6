/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function getCustomerOrders() {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/orders`, {
      next: {
        tags: ['CustomerOrders'],
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

export async function respondToCustomerOrder(newStatus: { _id: string; status: string }) {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/respond`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${(await cookies()).get('accessToken')!.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStatus),
    });
    const result = await data.json();

    revalidateTag('CustomerOrders');
    return result;
  } catch (error: any) {
    return Error(error);
  }
}
