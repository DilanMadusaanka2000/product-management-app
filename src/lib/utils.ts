import type { Product, ProductFilters } from '@/types';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  let result = [...products];

  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter((p) => p.title.toLowerCase().includes(q));
  }

  if (filters.category && filters.category !== 'all') {
    result = result.filter((p) => p.category === filters.category);
  }

  result = result.filter(
    (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
  );

  result.sort((a, b) => {
    let aVal: number | string;
    let bVal: number | string;
    if (filters.sortField === 'price') { aVal = a.price; bVal = b.price; }
    else if (filters.sortField === 'rating') { aVal = a.rating.rate; bVal = b.rating.rate; }
    else { aVal = a.title.toLowerCase(); bVal = b.title.toLowerCase(); }
    if (aVal < bVal) return filters.sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return filters.sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return result;
}

export function paginate<T>(items: T[], page: number, perPage: number): T[] {
  return items.slice((page - 1) * perPage, page * perPage);
}

export function getTotalPages(total: number, perPage: number): number {
  return Math.ceil(total / perPage);
}
