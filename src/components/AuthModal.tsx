'use client';

'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast, Toaster } from 'sonner';
import {
    registerUser,
    loginUser,
    requestPasswordReset,
    resetPassword,
    RegisterPayload,
    LoginPayload,
    ResetPasswordPayload,
    AuthUser,
    LoginResponse,
    RegisterResponse,
} from '@/api/auth';
import { useAuthStore } from '@/store/useAuthStore';

type AuthMode = 'login' | 'signup' | 'forgot' | 'reset';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: AuthMode;
    onAuthSuccess?: (auth: { user: AuthUser; token?: string }) => void;
}

const loginSchema = z.object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional().default(false),
});

const signupSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    acceptTerms: z.literal(true, { errorMap: () => ({ message: 'Please accept the terms to continue' }) }),
});

const forgotSchema = z.object({
    email: z.string().email('Enter a valid email'),
});

const resetSchema = z.object({
    email: z.string().email('Enter a valid email'),
    code: z.string().min(3, 'Reset code is required'),
});

const defaultValues = {
    login: { email: '', password: '', rememberMe: false },
    signup: { firstName: '', lastName: '', email: '', password: '', acceptTerms: false },
    forgot: { email: '' },
    reset: { email: '', code: '' },
};

const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        return err.response?.data?.message || 'Something went wrong. Please try again.';
    }
    if (error instanceof Error) return error.message;
    return 'Something went wrong. Please try again.';
};

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }: AuthModalProps) {
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const setAuth = useAuthStore((state) => state.setAuth);

    const loginForm = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
        defaultValues: defaultValues.login,
    });

    const signupForm = useForm<RegisterPayload>({
        resolver: zodResolver(signupSchema),
        defaultValues: defaultValues.signup,
    });

    const forgotForm = useForm<{ email: string }>({
        resolver: zodResolver(forgotSchema),
        defaultValues: defaultValues.forgot,
    });

    const resetForm = useForm<ResetPasswordPayload>({
        resolver: zodResolver(resetSchema),
        defaultValues: defaultValues.reset,
    });

    const forms = useMemo(
        () => ({
            login: loginForm,
            signup: signupForm,
            forgot: forgotForm,
            reset: resetForm,
        }),
        [loginForm, signupForm, forgotForm, resetForm]
    );

    if (!isOpen) return null;

    const handleSubmit = async (
        values: LoginPayload | RegisterPayload | { email: string } | ResetPasswordPayload
    ) => {
        try {
            if (mode === 'login') {
                const loginValues = values as LoginPayload;
                const response: LoginResponse = await loginUser(loginValues);
                if (response.token && typeof window !== 'undefined') {
                    if (loginValues.rememberMe) {
                        localStorage.setItem('auth_token', response.token);
                        localStorage.setItem('auth_user', JSON.stringify(response.user));
                    } else {
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('auth_user');
                    }
                }
                setAuth({ user: response.user, token: response.token, remember: loginValues.rememberMe });
                onAuthSuccess?.({ user: response.user, token: response.token });
                toast.success(response.message || 'Logged in successfully.');
                setTimeout(onClose, 500);
                return;
            }

            if (mode === 'signup') {
                const signupValues = values as RegisterPayload;
                const response: RegisterResponse = await registerUser(signupValues);
                setAuth({ user: response.user, token: response.token, remember: true });
                onAuthSuccess?.({ user: response.user, token: response.token });
                toast.success(response.message || 'Account created! You are now logged in.');
                setTimeout(onClose, 500);
                return;
            }

            if (mode === 'forgot') {
                const response = await requestPasswordReset(values as { email: string });
                toast.success(response.message || 'Reset code sent. Check your email.');
                setMode('reset');
                forms.reset.reset({ email: (values as { email: string }).email, code: '' });
                return;
            }

            if (mode === 'reset') {
                const response = await resetPassword(values as ResetPasswordPayload);
                toast.success(response.message || 'Password reset successful. Log in with your new credentials.');
                setMode('login');
                forms.login.reset(defaultValues.login);
            }
        } catch (err) {
            toast.error(getErrorMessage(err));
        }
    };

    const renderFooterToggle = () => {
        if (mode === 'login') {
            return (
                <p className="text-sm text-[#9aa0a6]">
                    No account yet?{' '}
                    <button type="button" onClick={() => setMode('signup')} className="text-[#8ab4f8] hover:underline">
                        Sign up
                    </button>
                </p>
            );
        }

        if (mode === 'signup') {
            return (
                <p className="text-sm text-[#9aa0a6]">
                    Already have an account?{' '}
                    <button type="button" onClick={() => setMode('login')} className="text-[#8ab4f8] hover:underline">
                        Log in
                    </button>
                </p>
            );
        }

        return (
            <p className="text-sm text-[#9aa0a6]">
                Remembered your password?{' '}
                <button type="button" onClick={() => setMode('login')} className="text-[#8ab4f8] hover:underline">
                    Go back to login
                </button>
            </p>
        );
    };

    const titleMap: Record<AuthMode, string> = {
        login: 'Welcome back',
        signup: 'Create your account',
        forgot: 'Forgot password',
        reset: 'Reset password',
    };

    const subtitleMap: Record<AuthMode, string> = {
        login: 'Access your personalised news feed',
        signup: 'Join Ascension News in a few seconds',
        forgot: 'Enter your email to receive a reset code',
        reset: 'Enter the email and code to reset your password',
    };

    const primaryCtaMap: Record<AuthMode, string> = {
        login: 'Log in',
        signup: 'Create account',
        forgot: 'Send reset code',
        reset: 'Reset password',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={onClose}>
            <div
                className="w-full max-w-md rounded-2xl bg-[#1f2023] border border-[#3c4043] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#3c4043]">
                    <div>
                        <h2 className="text-white text-lg font-medium">{titleMap[mode]}</h2>
                        <p className="text-[#9aa0a6] text-sm">{subtitleMap[mode]}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[#9aa0a6] hover:text-white transition-colors"
                        aria-label="Close authentication modal"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={forms[mode].handleSubmit(handleSubmit)} className="px-6 py-5 space-y-4">
                    {mode === 'login' && (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm text-white">Email</label>
                                <input
                                    type="email"
                                    {...loginForm.register('email')}
                                    className="w-full bg-[#2a2b2f] text-white px-4 py-2 rounded-lg border border-transparent focus:border-[#8ab4f8] focus:outline-none"
                                />
                                {loginForm.formState.errors.email && (
                                    <p className="text-xs text-red-300">{loginForm.formState.errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm text-white">Password</label>
                                    <button
                                        type="button"
                                        onClick={() => setMode('forgot')}
                                        className="text-xs text-[#8ab4f8] hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <input
                                    type="password"
                                    {...loginForm.register('password')}
                                    className="w-full bg-[#2a2b2f] text-white px-4 py-2 rounded-lg border border-transparent focus:border-[#8ab4f8] focus:outline-none"
                                />
                                {loginForm.formState.errors.password && (
                                    <p className="text-xs text-red-300">{loginForm.formState.errors.password.message}</p>
                                )}
                            </div>
                            <label className="flex items-center gap-2 text-sm text-[#9aa0a6]">
                                <input
                                    type="checkbox"
                                    {...loginForm.register('rememberMe')}
                                    className="h-4 w-4 rounded border-[#5f6368] bg-[#2a2b2f] text-[#8ab4f8] focus:ring-[#8ab4f8]"
                                />
                                Remember me on this device
                            </label>
                        </>
                    )}

                    {mode === 'signup' && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-white">First name</label>
                                    <input
                                        type="text"
                                        {...signupForm.register('firstName')}
                                        className="w-full bg-[#2a2b2f] text-white px-4 py-2 rounded-lg border border-transparent focus:border-[#8ab4f8] focus:outline-none"
                                    />
                                    {signupForm.formState.errors.firstName && (
                                        <p className="text-xs text-red-300">
                                            {signupForm.formState.errors.firstName.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-white">Last name</label>
                                    <input
                                        type="text"
                                        {...signupForm.register('lastName')}
                                        className="w-full bg-[#2a2b2f] text-white px-4 py-2 rounded-lg border border-transparent focus:border-[#8ab4f8] focus:outline-none"
                                    />
                                    {signupForm.formState.errors.lastName && (
                                        <p className="text-xs text-red-300">
                                            {signupForm.formState.errors.lastName.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-white">Email</label>
                                <input
                                    type="email"
                                    {...signupForm.register('email')}
                                    className="w-full bg-[#2a2b2f] text-white px-4 py-2 rounded-lg border border-transparent focus:border-[#8ab4f8] focus:outline-none"
                                />
                                {signupForm.formState.errors.email && (
                                    <p className="text-xs text-red-300">{signupForm.formState.errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-white">Password</label>
                                <input
                                    type="password"
                                    {...signupForm.register('password')}
                                    className="w-full bg-[#2a2b2f] text-white px-4 py-2 rounded-lg border border-transparent focus:border-[#8ab4f8] focus:outline-none"
                                />
                                {signupForm.formState.errors.password && (
                                    <p className="text-xs text-red-300">
                                        {signupForm.formState.errors.password.message}
                                    </p>
                                )}
                            </div>
                            <label className="flex items-center gap-2 text-sm text-[#9aa0a6]">
                                <input
                                    type="checkbox"
                                    {...signupForm.register('acceptTerms')}
                                    className="h-4 w-4 rounded border-[#5f6368] bg-[#2a2b2f] text-[#8ab4f8] focus:ring-[#8ab4f8]"
                                />
                                I agree to the terms and privacy policy
                            </label>
                            {signupForm.formState.errors.acceptTerms && (
                                <p className="text-xs text-red-300">
                                    {signupForm.formState.errors.acceptTerms.message}
                                </p>
                            )}
                        </>
                    )}

                    {mode === 'forgot' && (
                        <div className="space-y-2">
                            <label className="text-sm text-white">Email</label>
                            <input
                                type="email"
                                {...forgotForm.register('email')}
                                className="w-full bg-[#2a2b2f] text-white px-4 py-2 rounded-lg border border-transparent focus:border-[#8ab4f8] focus:outline-none"
                            />
                            {forgotForm.formState.errors.email && (
                                <p className="text-xs text-red-300">{forgotForm.formState.errors.email.message}</p>
                            )}
                        </div>
                    )}

                    {mode === 'reset' && (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm text-white">Email</label>
                                <input
                                    type="email"
                                    {...resetForm.register('email')}
                                    className="w-full bg-[#2a2b2f] text-white px-4 py-2 rounded-lg border border-transparent focus:border-[#8ab4f8] focus:outline-none"
                                />
                                {resetForm.formState.errors.email && (
                                    <p className="text-xs text-red-300">{resetForm.formState.errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-white">Reset code</label>
                                <input
                                    type="text"
                                    {...resetForm.register('code')}
                                    className="w-full bg-[#2a2b2f] text-white px-4 py-2 rounded-lg border border-transparent focus:border-[#8ab4f8] focus:outline-none"
                                />
                                {resetForm.formState.errors.code && (
                                    <p className="text-xs text-red-300">{resetForm.formState.errors.code.message}</p>
                                )}
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={forms[mode].formState.isSubmitting}
                        className="w-full bg-[#8ab4f8] text-[#202124] font-semibold py-2 rounded-lg hover:bg-[#9cc0ff] transition-colors disabled:opacity-60"
                    >
                        {forms[mode].formState.isSubmitting ? 'Please wait...' : primaryCtaMap[mode]}
                    </button>
                </form>

                <div className="px-6 pb-5">{renderFooterToggle()}</div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
}
