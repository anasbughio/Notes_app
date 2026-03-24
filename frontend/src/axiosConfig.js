import axios from 'axios';

// Automatically target the /api endpoint in Vercel production
// Fallback to exactly localhost or the provided env variable in development
const isProduction = process.env.NODE_ENV === 'production';
const apiBaseURL = isProduction ? '/api/' : (process.env.REACT_APP_API_URL || 'http://localhost:5000/api/');

const instance = axios.create({
    baseURL: apiBaseURL,
});

export default instance;