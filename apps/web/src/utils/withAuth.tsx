import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';
import { useAuthStore } from '../providers/auth-provider';

const withAuth = (WrappedComponent: ComponentType) => {
  const WithAuth = (props: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const { resetAuth, setAuth, isAuth } = useAuthStore((state) => state);
    console.log({ isAuth });
    const checkAuthValidate = async () => {
      try {
        await axios.get('/api/validate', {
          withCredentials: true,
        });

        setAuth();
      } catch (error) {
        console.log({ error });
        console.log({ status: error.response.status });
        if (error.response.status === 401) {
          resetAuth();
          router.replace(
            `/login${pathname !== '/' ? '?redirect=' + encodeURIComponent(pathname) : ''}`,
          );
        }
      }
    };
    useEffect(() => {
      checkAuthValidate();
    }, [isAuth]);

    if (isAuth) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
  return WithAuth;
};

export default withAuth;
