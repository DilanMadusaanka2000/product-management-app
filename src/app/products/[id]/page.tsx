import Image from 'next/image';
import Link from 'next/link';
import {
  Box, Container, Typography, Chip, Rating, Button,
  Divider, Paper, Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Inventory2OutlinedIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h5">Product not found</Typography>
        <Button component={Link} href="/" sx={{ mt: 3 }} startIcon={<ArrowBackIcon />}>
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Button
        component={Link}
        href="/"
        startIcon={<ArrowBackIcon />}
        color="inherit"
        sx={{ mb: 4, color: 'text.secondary' }}
      >
        Back to Products
      </Button>

      <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                bgcolor: '#F8FAFC', borderRadius: 3, p: 5,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: 320,
              }}
            >
              <Box sx={{ position: 'relative', width: '100%', height: 280 }}>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Chip
              label={product.category}
              color="primary"
              variant="outlined"
              size="small"
              sx={{ mb: 2, textTransform: 'capitalize' }}
            />

            <Typography variant="h4" fontWeight={700} mb={2} lineHeight={1.3}>
              {product.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Rating value={product.rating.rate} precision={0.1} readOnly />
              <Typography variant="body2" fontWeight={600}>{product.rating.rate.toFixed(1)}</Typography>
              <Typography variant="body2" color="text.secondary">
                ({product.rating.count} reviews)
              </Typography>
            </Box>

            <Typography variant="h3" fontWeight={800} color="primary.main" mb={3}>
              {formatPrice(product.price)}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="body1" color="text.secondary" lineHeight={1.8} mb={4}>
              {product.description}
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              fullWidth
              sx={{ py: 1.8 }}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
