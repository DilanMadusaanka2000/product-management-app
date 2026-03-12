'use client';

import { InputAdornment, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useProducts } from '@/hooks/useProducts';

export default function SearchBar() {
  const { filters, setSearch } = useProducts();

  return (
    <TextField
      fullWidth
      placeholder="Search products..."
      value={filters.search}
      onChange={(e) => setSearch(e.target.value)}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" fontSize="small" />
          </InputAdornment>
        ),
        endAdornment: filters.search ? (
          <InputAdornment position="end">
            <IconButton size="small" onClick={() => setSearch('')}>
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      sx={{ maxWidth: 480, bgcolor: 'white' }}
    />
  );
}
