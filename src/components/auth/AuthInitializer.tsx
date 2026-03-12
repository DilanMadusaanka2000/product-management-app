'use client';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function AuthInitializer() {
  const { initAuth } = useAuth();
  useEffect(() => { initAuth(); }, []);
  return null;
}
