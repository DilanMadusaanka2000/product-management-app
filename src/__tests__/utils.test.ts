import { formatPrice, formatRating, applyFilters, paginate, getTotalPages } from '@/lib/utils';
import type { Product, ProductFilters } from '@/types';

const mockProducts: Product[] = [
  { id: 1, title: 'Alpha Shirt', price: 20, description: '', category: 'clothing', image: '', rating: { rate: 4.5, count: 100 } },
  { id: 2, title: 'Beta Watch', price: 150, description: '', category: 'electronics', image: '', rating: { rate: 3.2, count: 50 } },
  { id: 3, title: 'Gamma Bag', price: 75, description: '', category: 'clothing', image: '', rating: { rate: 4.8, count: 200 } },
];

const baseFilters: ProductFilters = {
  search: '', category: 'all', minPrice: 0, maxPrice: 1000,
  sortField: 'title', sortDirection: 'asc', page: 1,
};

describe('formatPrice', () => {
  it('formats as USD', () => {
    expect(formatPrice(20)).toBe('$20.00');
    expect(formatPrice(150.5)).toBe('$150.50');
  });
});

describe('formatRating', () => {
  it('formats to 1 decimal', () => {
    expect(formatRating(4.5)).toBe('4.5');
    expect(formatRating(3)).toBe('3.0');
  });
});

describe('applyFilters', () => {
  it('returns all with no active filters', () => {
    expect(applyFilters(mockProducts, baseFilters)).toHaveLength(3);
  });
  it('filters by search', () => {
    const r = applyFilters(mockProducts, { ...baseFilters, search: 'watch' });
    expect(r).toHaveLength(1);
    expect(r[0].id).toBe(2);
  });
  it('filters by category', () => {
    expect(applyFilters(mockProducts, { ...baseFilters, category: 'clothing' })).toHaveLength(2);
  });
  it('filters by price range', () => {
    const r = applyFilters(mockProducts, { ...baseFilters, minPrice: 50, maxPrice: 100 });
    expect(r).toHaveLength(1);
    expect(r[0].id).toBe(3);
  });
  it('sorts by price asc', () => {
    const r = applyFilters(mockProducts, { ...baseFilters, sortField: 'price', sortDirection: 'asc' });
    expect(r[0].price).toBe(20);
    expect(r[2].price).toBe(150);
  });
  it('sorts by rating desc', () => {
    const r = applyFilters(mockProducts, { ...baseFilters, sortField: 'rating', sortDirection: 'desc' });
    expect(r[0].rating.rate).toBe(4.8);
  });
});

describe('paginate', () => {
  it('returns page 1 slice', () => expect(paginate([1,2,3,4,5], 1, 2)).toEqual([1,2]));
  it('returns page 2 slice', () => expect(paginate([1,2,3,4,5], 2, 2)).toEqual([3,4]));
});

describe('getTotalPages', () => {
  it('calculates pages correctly', () => {
    expect(getTotalPages(10, 3)).toBe(4);
    expect(getTotalPages(9, 3)).toBe(3);
  });
});
