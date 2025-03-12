import LoginForm from '@/components/modules/auth/login/LoginForm';
import { Suspense } from 'react';

export default function Login() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
