'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AppBar, Toolbar, Typography, Button, IconButton,
  Box, Avatar, Tooltip, Chip,
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ maxWidth: 1280, width: '100%', mx: 'auto', px: { xs: 2, sm: 4 } }}>
        {/* Logo */}
        <Box
          component={Link}
          href="/"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', flexGrow: 1 }}
        >
          <Box
            sx={{
              width: 36, height: 36, borderRadius: 2,
              bgcolor: 'primary.main', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ShoppingBagIcon sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Typography variant="h6" fontWeight={700} color="text.primary">
            ProductHub
          </Typography>
        </Box>

        {/* Nav Links */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button component={Link} href="/" color="inherit" sx={{ color: 'text.secondary' }}>
            Products
          </Button>

          {isAuthenticated ? (
            <>
              <Button
                component={Link}
                href="/dashboard"
                startIcon={<DashboardIcon />}
                color="inherit"
                sx={{ color: 'text.secondary' }}
              >
                Dashboard
              </Button>

              <Chip
                avatar={<Avatar sx={{ bgcolor: 'primary.main', width: 24, height: 24, fontSize: 12 }}>
                  {user?.name?.[0]?.toUpperCase()}
                </Avatar>}
                label={user?.name}
                variant="outlined"
                size="small"
                sx={{ mx: 1 }}
              />

              <Tooltip title="Logout">
                <IconButton
                  onClick={handleLogout}
                  size="small"
                  sx={{ color: 'error.main', bgcolor: 'error.lighter', '&:hover': { bgcolor: 'error.light' } }}
                >
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Button
              component={Link}
              href="/auth/login"
              variant="contained"
              startIcon={<LoginIcon />}
              size="small"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
