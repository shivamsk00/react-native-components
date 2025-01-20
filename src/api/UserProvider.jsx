import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';

// Define the User type
// In JS, we don't need to define types, so this is omitted.

// Axios instance
const api = axios.create({
  baseURL: API_URL, // Replace with your API base URL
  timeout: 10000,
});

// Function to fetch the token (update according to your storage logic)
const getToken = async () => {
  try {
    // Example: Fetch token from AsyncStorage or SecureStorage
    const token = await AsyncStorage.getItem('userToken'); // Replace with SecureStorage if needed
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};

// Axios request interceptor to add Authorization header
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User API Provider
const UserApiProvider = {
  // GET Users
  getUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // POST (Create) User
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // PUT (Update) User
  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // DELETE User
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // POST (Login) User
  loginUser: async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      // Save token to AsyncStorage or another secure storage
      const { token, user } = response.data.data;
      await AsyncStorage.setItem('userToken', token); // Save token securely
      return { token, user };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default UserApiProvider;
