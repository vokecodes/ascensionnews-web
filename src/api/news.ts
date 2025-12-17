import api from './axiosInstance';
import { NewsArticle } from '@/data/newsData'; // Reusing interface for now

export const getHotNews = async (page: number = 1, limit: number = 10): Promise<NewsArticle[]> => {
    const response = await api.get('/news/hot', { params: { page, limit } });
    return response.data.items;
};

export const getTrendingNews = async (page: number = 1, limit: number = 10): Promise<NewsArticle[]> => {
    const response = await api.get('/news/trending', { params: { page, limit } });
    return response.data.items;
};

export const getNewsByTopic = async (topicKey: string, page: number = 1, limit: number = 10): Promise<NewsArticle[]> => {
    const response = await api.get(`/news/by-topics`, { params: { topics: topicKey, page, limit } });
    return response.data.items;
};

export const getNewsByLocation = async (country: string, region: string, city: string, page: number = 1, limit: number = 10): Promise<NewsArticle[]> => {
    const response = await api.get(`/news/by-location`, {
        params: { country, region, city, page, limit }
    });
    return response.data.items;
};

export const searchNews = async (query: string, page: number = 1, limit: number = 10): Promise<NewsArticle[]> => {
    const response = await api.get('/news/search', { params: { query, page, limit } });
    return response.data.items;
};
