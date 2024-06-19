import { createStore } from 'zustand';

type AuthState = {
  isAuth: boolean;
};

type AuthActions = {
  setAuth: () => void;
  resetAuth: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => {
  return { isAuth: false };
};

export const defaultInitState: AuthState = {
  isAuth: false,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    isAuth: false,
    setAuth: () => set({ isAuth: true }),
    resetAuth: () => set({ isAuth: false }),
  }));
};
