"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Welcome back!", { style: { background: '#06b6d4', color: '#fff' } });
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full glass-panel rounded-[2rem] shadow-2xl p-10 relative z-10 animate-fade-in-up">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-white/50 dark:bg-black/30 border border-border/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400 backdrop-blur-sm"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
              <Link href="/forgot-password" className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 hover:underline transition-colors">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-white/50 dark:bg-black/30 border border-border/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400 backdrop-blur-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? "Authenticating..." : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400 font-medium">
          Don't have an account?{" "}
          <Link href="/signup" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 hover:underline transition-colors">
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
}
