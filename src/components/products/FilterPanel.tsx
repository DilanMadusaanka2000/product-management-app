'use client';

import {
  Paper, Typography, FormControl, InputLabel, Select, MenuItem,
  Box, TextField, Button, Divider, Stack,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useProducts } from '@/hooks/useProducts';

export default function FilterPanel() {
  const { categories, filters, setCategory, setPriceRange, setSort, resetFilters } = useProducts();

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TuneIcon color="primary" fontSize="small" />
          <Typography variant="subtitle1" fontWeight={600}>Filters</Typography>
        </Box>
        <Button
          size="small"
          startIcon={<RestartAltIcon />}
          onClick={resetFilters}
          color="inherit"
          sx={{ color: 'text.secondary', fontSize: 12 }}
        >
          Reset
        </Button>
      </Box>

      <Stack spacing={2.5}>
        {/* Category */}
        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={filters.category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat} sx={{ textTransform: 'capitalize' }}>
                {cat === 'all' ? 'All Categories' : cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider />

        {/* Price Range */}
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 1, display: 'block', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Price Range
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              label="Min"
              type="number"
              value={filters.minPrice || ''}
              onChange={(e) => setPriceRange(Number(e.target.value), filters.maxPrice)}
              inputProps={{ min: 0 }}
            />
            <TextField
              size="small"
              label="Max"
              type="number"
              value={filters.maxPrice || ''}
              onChange={(e) => setPriceRange(filters.minPrice, Number(e.target.value))}
              inputProps={{ min: 0 }}
            />
          </Box>
        </Box>

        <Divider />

        {/* Sort */}
        <FormControl fullWidth size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={`${filters.sortField}-${filters.sortDirection}`}
            label="Sort By"
            onChange={(e) => {
              const [field, dir] = e.target.value.split('-') as ['title' | 'price' | 'rating', 'asc' | 'desc'];
              setSort(field, dir);
            }}
          >
            <MenuItem value="title-asc">Name: A → Z</MenuItem>
            <MenuItem value="title-desc">Name: Z → A</MenuItem>
            <MenuItem value="price-asc">Price: Low → High</MenuItem>
            <MenuItem value="price-desc">Price: High → Low</MenuItem>
            <MenuItem value="rating-desc">Rating: High → Low</MenuItem>
            <MenuItem value="rating-asc">Rating: Low → High</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
}
