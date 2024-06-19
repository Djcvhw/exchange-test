import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import { ComponentType, useEffect } from 'react';
import { useAuthStore } from '../providers/auth-provider';

type ValidationError = {
    message: string;
    errors: Record<string, string[]>
}

const withAuth = (WrappedComponent: ComponentType) => {
    const WithAuth = (props: any) => {
        const router = useRouter();
        const pathname = usePathname();
        const { resetAuth, setAuth, isAuth } = useAuthStore((state) => state);
        const checkAuthValidate = async () => {
            try {
                await axios.get('/api/validate', {
                    withCredentials: true,
                });

                setAuth();
            } catch (error) {
                if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
                    if (error.response?.status === 401) {
                        resetAuth();
                        router.replace(
                            `/login${pathname !== '/' ? '?redirect=' + encodeURIComponent(pathname) : ''}`,
                        );
                    }
                } else {
                    console.log({ error });
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
