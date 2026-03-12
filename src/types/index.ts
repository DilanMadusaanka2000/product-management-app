export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export type SortField = 'title' | 'price' | 'rating';
export type SortDirection = 'asc' | 'desc';

export interface ProductFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortField: SortField;
  sortDirection: SortDirection;
  page: number;
}
