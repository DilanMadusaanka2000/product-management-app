import type { Product } from '@/types';

const FAKESTORE = 'https://fakestoreapi.com';

export const publicApi = {
  getProducts: async (): Promise<Product[]> => {
    const res = await fetch(`${FAKESTORE}/products`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  getProductById: async (id: number): Promise<Product> => {
    const res = await fetch(`${FAKESTORE}/products/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },

  getCategories: async (): Promise<string[]> => {
    const res = await fetch(`${FAKESTORE}/products/categories`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },
};