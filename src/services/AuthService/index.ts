/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { FieldValues } from 'react-hook-form';

export async function registerUser(userInfo: FieldValues) {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    });
    const result = await data.json();
    (await cookies()).set('accessToken', result?.data?.accessToken);
    (await cookies()).set('refreshToken', result?.data?.refreshToken);
    return result;
  } catch (error: any) {
    return Error(error);
  }
}

export async function loginUser(userInfo: FieldValues) {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    });
    const result = await data.json();
    (await cookies()).set('accessToken', result?.data?.accessToken);
    (await cookies()).set('refreshToken', result?.data?.refreshToken);
    return result;
  } catch (error: any) {
    return Error(error);
  }
}

export async function getCurrentUser() {
  const accessToken = (await cookies()).get('accessToken')?.value;
  let decoded = null;
  if (accessToken) decoded = await jwtDecode(accessToken);

  return decoded;
}

export async function logout() {
  (await cookies()).delete('accessToken');
}

export const getNewToken = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: (await cookies()).get('refreshToken')!.value,
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
