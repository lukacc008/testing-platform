import axios from "axios";

// Get the base URL dynamically based on the environment
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3500';

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});
