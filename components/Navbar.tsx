"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="glass-panel sticky top-0 z-50 border-b border-border/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center transition-transform hover:scale-105 duration-300">
            <Link href="/dashboard" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-tight">
              Dashboard
            </Link>
          </div>
          
          {session?.user && (
            <div className="flex items-center gap-5">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 bg-white/10 dark:bg-black/20 px-4 py-2 rounded-full border border-border/50 shadow-inner">
                <FaUserCircle className="text-cyan-500 text-lg" />
                <span className="font-medium tracking-wide">{session.user.name}</span>
              </div>
              
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="group flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-white transition-all px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 hover:shadow-lg hover:shadow-red-500/25 active:scale-95 duration-200"
              >
                <FaSignOutAlt className="group-hover:translate-x-0.5 transition-transform" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
