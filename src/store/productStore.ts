import { create } from 'zustand';
import { publicApi, productsApi } from '@/lib/api';
import { applyFilters, paginate, getTotalPages } from '@/lib/utils';
import type { Product, ProductFilters } from '@/types';

const PER_PAGE = 8;

const DEFAULT_FILTERS: ProductFilters = {
  search: '', category: 'all', minPrice: 0, maxPrice: 1000,
  sortField: 'title', sortDirection: 'asc', page: 1,
};

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  paginatedProducts: Product[];
  categories: string[];
  selectedProduct: Product | null;
  filters: ProductFilters;
  totalPages: number;
  totalCount: number;
  isLoading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setSort: (field: ProductFilters['sortField'], direction: ProductFilters['sortDirection']) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

const recompute = (products: Product[], filters: ProductFilters) => {
  const filtered = applyFilters(products, filters);
  return {
    filteredProducts: filtered,
    paginatedProducts: paginate(filtered, filters.page, PER_PAGE),
    totalPages: getTotalPages(filtered.length, PER_PAGE),
    totalCount: filtered.length,
  };
};

//store fake daata
export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  paginatedProducts: [],
  categories: [], 
  selectedProduct: null, 
  filters: DEFAULT_FILTERS,
  totalPages: 0, 
  totalCount: 0, 
  isLoading: false, 
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await publicApi.getProducts();
      set({ products, ...recompute(products, get().filters) });
    } catch { set({ error: 'Failed to fetch products.' }); }
    finally { set({ isLoading: false }); }
  },

  fetchProductById: async (id) => {
    set({ isLoading: true, error: null, selectedProduct: null });
    try {
      const product = await publicApi.getProductById(id);
      set({ selectedProduct: product });
    } catch { set({ error: 'Failed to fetch product.' }); }
    finally { set({ isLoading: false }); }
  },

  //fetch all categorie
  fetchCategories: async () => {
    try {
      const cats = await publicApi.getCategories();
      set({ categories: ['all', ...cats] });
    } catch {'error'}
  },

  //use zustand
  setSearch: (search) => {
    const filters = { ...get().filters, search, page: 1 };
    set({ filters, ...recompute(get().products, filters) });
  },

  setCategory: (category) => {
    const filters = { ...get().filters, category, page: 1 };
    set({ filters, ...recompute(get().products, filters) });
  },

  setPriceRange: (minPrice, maxPrice) => {
    const filters = { ...get().filters, minPrice, maxPrice, page: 1 };
    set({ filters, ...recompute(get().products, filters) });
  },
  
  setSort: (sortField, sortDirection) => {
    const filters = { ...get().filters, sortField, sortDirection, page: 1 };
    set({ filters, ...recompute(get().products, filters) });
  },
  setPage: (page) => {
    const filters = { ...get().filters, page };
    set({ filters, ...recompute(get().products, filters) });
  },
  
  resetFilters: () => {
    set({ filters: DEFAULT_FILTERS, ...recompute(get().products, DEFAULT_FILTERS) });
  },


}));
