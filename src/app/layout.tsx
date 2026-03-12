import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ui/ThemeRegistry';
import Navbar from '@/components/layout/Navbar';
import AuthInitializer from '@/components/auth/AuthInitializer';

export const metadata: Metadata = {
  title: 'ProductHub – Product Dashboard',
  description: 'Browse, search, and manage products',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AuthInitializer />
          <Navbar />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
