"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Suspense } from "react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (res.ok) {
        toast.success("Password reset successfully!", { style: { background: '#10b981', color: '#fff' } });
        router.push("/login");
      } else {
        const text = await res.text();
        toast.error(text || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center p-8 glass-panel rounded-3xl">
        <h2 className="text-xl font-bold text-red-500 mb-2">Invalid Link</h2>
        <p className="text-gray-400 mb-6">This password reset link is invalid or has expired.</p>
        <Link href="/forgot-password" className="text-cyan-500 hover:underline">
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full glass-panel rounded-[2rem] shadow-2xl p-10 relative z-10 animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
          Set New Password
        </h1>
        <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">
          Please enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">New Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 bg-white/50 dark:bg-black/30 border border-border/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400 backdrop-blur-sm"
            placeholder="••••••••"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Confirm New Password</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-5 py-4 bg-white/50 dark:bg-black/30 border border-border/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400 backdrop-blur-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 mt-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px] pointer-events-none" />
      
      <Suspense fallback={<div className="glass-panel p-8 rounded-2xl animate-pulse">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
