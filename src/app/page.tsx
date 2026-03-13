'use client';

import { useEffect } from 'react';
import {
  Box, Container, Typography, Grid, Skeleton, Alert,
} from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/products/ProductCard';
import SearchBar from '@/components/products/SearchBar';
import FilterPanel from '@/components/products/FilterPanel';
import Pagination from '@/components/products/Pagination';


export default function HomePage() {
  const { paginatedProducts, fetchProducts, fetchCategories, isLoading, error, totalCount } = useProducts();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight={800} color="text.primary">
          Product Catalog
        </Typography>
        {totalCount > 0 && (
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {totalCount} products found
          </Typography>
        )}
      </Box>

      <Box mb={4}>
        <SearchBar />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3} lg={2.5}>
          <FilterPanel />
        </Grid>

        <Grid item xs={12} md={9} lg={9.5}>
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {isLoading && (
            <Grid container spacing={3}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Grid item xs={12} sm={6} lg={4} xl={3} key={i}>
                  <Skeleton variant="rounded" height={320} sx={{ borderRadius: 3 }} />
                </Grid>
              ))}
            </Grid>
          )}

          {!isLoading && !error && paginatedProducts.length === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 15, color: 'text.disabled' }}>
              <Inventory2OutlinedIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
              <Typography variant="h6">No products found</Typography>
              <Typography variant="body2">Try adjusting your search or filters</Typography>
            </Box>
          )}

          {!isLoading && paginatedProducts.length > 0 && (
            <Grid container spacing={3}>
              {paginatedProducts.map((product) => (
                <Grid item xs={12} sm={6} lg={4} xl={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}

          <Pagination />
        </Grid>
      </Grid>
    </Container>
  );
}
