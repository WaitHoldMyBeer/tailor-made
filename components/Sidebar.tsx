// app/components/Sidebar.js
'use client';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Tailor Made</h1>
      <nav>
        <ul>
          <li className="mb-4">
            <Link href="/">Home</Link>
          </li>
          {/* Add more navigation items here */}
        </ul>
      </nav>
    </div>
  );
}
