import api from './axiosInstance';

export interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    acceptTerms: boolean;
}

export interface LoginPayload {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    email: string;
    code: string;
}

export interface AuthUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    favoriteTopics?: string[];
    location?: {
        country?: string;
        city?: string;
        latitude?: number;
        longitude?: number;
    };
    createdAt?: string;
    updatedAt?: string;
    termsAcceptedAt?: string;
}

export interface AuthResponse<T = unknown> {
    message?: string;
    token?: string;
    data?: T;
}

export interface LoginResponse extends AuthResponse {
    user: AuthUser;
    token: string;
}

export interface RegisterResponse extends AuthResponse {
    user: AuthUser;
    token: string;
}

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const response = await api.post('/auth/register', payload);
    return response.data;
};

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', payload);
    return response.data;
};

export const requestPasswordReset = async (payload: ForgotPasswordPayload): Promise<AuthResponse> => {
    const response = await api.post('/auth/forgot-password', payload);
    return response.data;
};

export const resetPassword = async (payload: ResetPasswordPayload): Promise<AuthResponse> => {
    const response = await api.post('/auth/reset-password', payload);
    return response.data;
};
