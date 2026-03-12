'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Card, CardActionArea, CardContent, CardMedia,
  Typography, Box, Chip, Rating, IconButton, Stack, Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (product: Product) => void;
}

export default function ProductCard({ product, isAdmin, onDelete, onEdit }: ProductCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Clickable image + title area */}
      <CardActionArea component={Link} href={`/products/${product.id}`} sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            height: 200, bgcolor: '#F8FAFC',
            display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3,
          }}
        >
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src={product.image}
              alt={product.title}
              fill
              style={{ objectFit: 'contain', padding: '8px' }}
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </Box>
        </Box>

        <CardContent sx={{ pb: 1 }}>
          <Chip
            label={product.category}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ mb: 1, textTransform: 'capitalize', fontSize: 11 }}
          />

          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.4,
              mb: 1.5,
            }}
          >
            {product.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight={700} color="primary.main">
              {formatPrice(product.price)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Rating value={product.rating.rate} precision={0.1} size="small" readOnly />
              <Typography variant="caption" color="text.secondary">
                ({product.rating.count})
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>

      {/* Admin Actions */}
      {isAdmin && (
        <Box
          sx={{
            display: 'flex', gap: 1, px: 2, pb: 2,
            borderTop: '1px solid', borderColor: 'divider', pt: 1.5,
          }}
        >
          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="primary"
              onClick={() => onEdit?.(product)}
              sx={{ bgcolor: 'primary.lighter', '&:hover': { bgcolor: 'primary.light' } }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete?.(product.id)}
              sx={{ bgcolor: 'error.lighter', '&:hover': { bgcolor: 'error.light' } }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Card>
  );
}
