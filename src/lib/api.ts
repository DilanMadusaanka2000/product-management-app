import axios from 'axios';
import Cookies from 'js-cookie';
import type { Product, AuthResponse, LoginCredentials, RegisterCredentials } from '@/types';

// Laravel Backend

export const apiClient = axios.create({
  baseURL: process.env.ADMIN_API_URL || 'http://44.220.146.133:8000/api',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Public Fake Store API

const FAKESTORE = 'https://fakestoreapi.com';

export const publicApi = {
  getProducts: async (): Promise<Product[]> => {
    const res = await axios.get<Product[]>(`${FAKESTORE}/products`);
    return res.data;
  },
  getProductById: async (id: number): Promise<Product> => {
    const res = await axios.get<Product>(`${FAKESTORE}/products/${id}`);
    return res.data;
  },
  getCategories: async (): Promise<string[]> => {
    const res = await axios.get<string[]>(`${FAKESTORE}/products/categories`);
    return res.data;
  },
};

//Auth API 

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/login', credentials);
    return res.data;
  },
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/register', credentials);
    return res.data;
  },

};

//Products CRUD API

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const res = await apiClient.get<Product[]>('/products');
    return res.data;
  },
  create: async (data: Omit<Product, 'id'>): Promise<Product> => {
    const res = await apiClient.post<Product>('/products', data);
    return res.data;
  },
  update: async (id: number, data: Partial<Product>): Promise<Product> => {
    const res = await apiClient.put<Product>(`/products/${id}`, data);
    return res.data;
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};
