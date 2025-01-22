"use client"

import Link from "next/link";
import { User } from 'lucide-react'; // Assuming you're using lucide-react for icons

export default function Header() {
  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-10 px-6 py-4 flex items-center">
      <Link href="#" className="text-gray-800 hover:text-[#C1A2E2] transition-colors flex items-center">
        <User className="h-8 w-8" />
      </Link>
      <div className="flex-grow flex justify-center">
        <Link href="#" className="flex items-center text-2xl font-bold">
          <span className="text-primary">rare</span>
          <span className="text-secondary">ly</span>
        </Link>
      </div>
      <div className="w-8"></div> {/* Placeholder for balance */}
    </header>
  );
} 