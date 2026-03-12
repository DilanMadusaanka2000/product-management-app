'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Box, Card, CardContent, TextField, Button, Typography,
  Alert, InputAdornment, IconButton, CircularProgress, Divider,
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  const { register, isLoading, error, clearError } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try 
    { 
      await register(form); router.push('/dashboard');
   } 
    catch { 

     }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        px: 2,
        background: 'linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 50%, #F5F3FF 100%)',
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 420, p: 1 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 56, height: 56, borderRadius: 3,
                bgcolor: 'primary.main', display: 'flex',
                alignItems: 'center', justifyContent: 'center', mb: 2,
                boxShadow: '0 8px 24px rgba(79,70,229,0.3)',
              }}
            >
              <ShoppingBagIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Typography variant="h5" fontWeight={700}>Create account</Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Join ProductHub today
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField label="Full Name" name="name" required fullWidth value={form.name} onChange={handleChange} placeholder="John Doe" />

            <TextField label="Email" name="email" type="email" required fullWidth value={form.email} onChange={handleChange} placeholder="you@example.com" />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              fullWidth
              inputProps={{ minLength: 8 }}
              value={form.password}
              onChange={handleChange}
              placeholder="Min 8 characters"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              name="password_confirmation"
              type="password"
              required
              fullWidth
              value={form.password_confirmation}
              onChange={handleChange}
              placeholder="Re-enter password"
            />

            <Button type="submit" variant="contained" fullWidth size="large" disabled={isLoading} sx={{ mt: 1, py: 1.5 }}>
              {isLoading ? <CircularProgress size={22} color="inherit" /> : 'Create Account'}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Already have an account?{' '}
            <Typography
              component={Link}
              href="/auth/login"
              variant="body2"
              color="primary"
              fontWeight={600}
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Sign In
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
