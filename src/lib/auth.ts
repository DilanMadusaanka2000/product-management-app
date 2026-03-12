import Cookies from 'js-cookie';
import type { User } from '@/types';

export const authHelpers = {
  setToken: (token: string) =>
    Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' }),
  getToken: () => Cookies.get('token'),
  removeToken: () => Cookies.remove('token'),
  setUser: (user: User) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  },
  removeUser: () => localStorage.removeItem('user'),
  isAuthenticated: () => !!Cookies.get('token'),
  clearAll: () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
  },
};
