import api from "./axiosInstance";

export interface SupportRequest {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const sendSupportRequest = async (data: SupportRequest) => {
    const response = await api.post("/support", data);
    return response.data;
};
