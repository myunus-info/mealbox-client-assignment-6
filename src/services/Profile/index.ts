/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';

export async function getCustomerProfile() {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`, {
      next: {
        tags: ['Profile'],
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

export async function updateCustomerProfile(profileUpdates: FieldValues) {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${(await cookies()).get('accessToken')!.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileUpdates),
    });
    const result = await data.json();

    revalidateTag('Profile');
    return result;
  } catch (error: any) {
    return Error(error);
  }
}

export async function getProviderProfile() {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/me`, {
      next: {
        tags: ['Profile'],
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

export async function updateProviderProfile(profileUpdates: FieldValues) {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/profile`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${(await cookies()).get('accessToken')!.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileUpdates),
    });
    const result = await data.json();

    revalidateTag('Profile');
    return result;
  } catch (error: any) {
    return Error(error);
  }
}
