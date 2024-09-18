// app/layout.tsx
"use client";

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import { ReactNode } from 'react';




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <SessionProvider>
          <Sidebar />
          <main className="flex-1">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
