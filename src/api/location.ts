import axios from 'axios';

export interface UserLocation {
    city: string;
    region: string; // state
    country_name: string;
    country_code: string;
}

export const getUserLocation = async (): Promise<UserLocation> => {
    try {
        const response = await axios.get('https://ipapi.co/json/');
        return {
            city: response.data.city,
            region: response.data.region,
            country_name: response.data.country_name,
            country_code: response.data.country_code,
        };
    } catch (error) {
        console.error('Failed to fetch user location:', error);
        throw error;
    }
};
