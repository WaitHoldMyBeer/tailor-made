import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import './globals.css';

export const metadata = {
  title: 'Tailor Made',
  description: 'Create custom clothing using AI',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
