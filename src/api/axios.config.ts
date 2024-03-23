import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: 'http://192.168.0.38:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://192.168.0.38:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
});

api.interceptors.response.use((response) => response, (error) => {
  if(error.response) {
    if(error.response.status === 401) {
      AsyncStorage.removeItem('token');
      return Promise.reject(error);
    }
  }
});