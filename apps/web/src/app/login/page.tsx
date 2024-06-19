'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import LoginForm from '../../components/LoginForm';
import { Suspense, useEffect } from 'react';
import { useAuthStore } from '../../providers/auth-provider';
import Nav from '../../components/Nav';

export type FormProps = { login: string; password: string };

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore((state) => state);

  const checkAuthValidate = async () => {
    try {
      const response = await axios.get('/api/validate', {
        withCredentials: true,
      });
      if (response.data.valid) {
        router.replace(searchParams.get('search') || '/');
      }
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    checkAuthValidate();
  }, []);

  const handleSubmit = async ({ login, password }: FormProps) => {
    try {
      const response = await axios.post(
        '/api/login',
        { login, password },
        { withCredentials: true },
      );
      if (response.data.success) {
        setAuth();
        router.replace(searchParams.get('search') || '/');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center h-screen">
        <LoginForm handleSubmit={handleSubmit} />
      </div>
    </>
  );
};

const LoginPageSuspense = () => {
  return <Suspense>
    <LoginPage />
  </Suspense>
}

export default LoginPageSuspense;
