import api from './axiosInstance';

export interface Topic {
    key: string;
    label: string;
    emoji: string;
    id?: string; // keeping optional just in case, but user didn't specify
}

export const getTopics = async (): Promise<Topic[]> => {
    try {
        const response = await api.get('/topics');
        return response.data.topics;
    } catch (error) {
        console.error('Failed to fetch topics:', error);
        throw error;
    }
};
