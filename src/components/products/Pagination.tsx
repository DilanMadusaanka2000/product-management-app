'use client';

import { Box, Pagination as MuiPagination } from '@mui/material';
import { useProducts } from '@/hooks/useProducts';

export default function Pagination() {
  const { filters, totalPages, setPage } = useProducts();
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <MuiPagination
        count={totalPages}
        page={filters.page}
        onChange={(_, page) => setPage(page)}
        color="primary"
        shape="rounded"
        size="large"
      />
    </Box>
  );
}
