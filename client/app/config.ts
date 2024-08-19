import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getData = async(url: string, customHeader:any) => {
    try {
        const response = await axios.get(`${API_URL}/${url}`, {
            headers: customHeader,
            withCredentials: true
        });
        return response.data;
    } catch (error: any) {
        return error.response?.status;
    }
};

const postData = async(url: string, data: any, customHeader:any) => {
    try {
        const response = await axios.post(`${API_URL}/${url}`, data, {
            headers: customHeader,
            withCredentials: true
        });
        return response.data;
    } catch (error: any) {
        return error.response?.data;
    }
};

export { getData, postData };