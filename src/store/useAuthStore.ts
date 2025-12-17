import { create } from 'zustand';
import { AuthUser } from '@/api/auth';

interface AuthState {
    user: AuthUser | null;
    token: string | null;
    remember: boolean;
    setAuth: (payload: { user: AuthUser; token?: string; remember?: boolean }) => void;
    clearAuth: () => void;
    hydrateFromStorage: () => void;
}

const storageKeys = {
    token: 'auth_token',
    user: 'auth_user',
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    remember: false,

    setAuth: ({ user, token, remember = false }) => {
        set({ user, token: token || null, remember });
        if (typeof window !== 'undefined' && token) {
            if (remember) {
                localStorage.setItem(storageKeys.token, token);
                localStorage.setItem(storageKeys.user, JSON.stringify(user));
            } else {
                localStorage.removeItem(storageKeys.token);
                localStorage.removeItem(storageKeys.user);
            }
        }
    },

    clearAuth: () => {
        set({ user: null, token: null, remember: false });
        if (typeof window !== 'undefined') {
            localStorage.removeItem(storageKeys.token);
            localStorage.removeItem(storageKeys.user);
        }
    },

    hydrateFromStorage: () => {
        if (typeof window === 'undefined') return;
        const storedToken = localStorage.getItem(storageKeys.token);
        const storedUser = localStorage.getItem(storageKeys.user);
        if (storedToken && storedUser) {
            try {
                const parsedUser: AuthUser = JSON.parse(storedUser);
                set({ user: parsedUser, token: storedToken, remember: true });
            } catch (err) {
                console.error('Failed to parse stored user', err);
                localStorage.removeItem(storageKeys.user);
                localStorage.removeItem(storageKeys.token);
            }
        }
    },
}));
