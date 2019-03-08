import axios from 'axios';

export const apiAuthenticate = axios.create({
    baseURL: process.env.API,    
});