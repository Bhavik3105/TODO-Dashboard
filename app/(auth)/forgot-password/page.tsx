"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsSent(true);
        toast.success("Reset link generated!");
        
        // DEMO ONLY: We show the link in the UI for the assessment
        if (data.demoLink) {
          toast((t) => (
            <div className="flex flex-col gap-2">
              <span className="font-bold text-sm text-gray-900">MOCK EMAIL SENT!</span>
              <span className="text-xs text-gray-600">Since this is a demo, click here to reset:</span>
              <a href={data.demoLink} className="text-xs text-blue-500 break-all underline bg-blue-50 p-2 rounded">
                {data.demoLink}
              </a>
            </div>
          ), { duration: 15000 }); // Show for 15 seconds
        }

      } else {
        toast.error("Something went wrong");
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
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full glass-panel rounded-[2rem] shadow-2xl p-10 relative z-10 animate-fade-in-up">
        
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-6">
          <FaArrowLeft /> Back to login
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Forgot Password?
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        {!isSent ? (
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? "Sending..." : "Reset Password"}
            </button>
          </form>
        ) : (
          <div className="text-center p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl">
            <svg className="w-16 h-16 text-cyan-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              We've sent a password reset link to <span className="font-semibold">{email}</span>.
            </p>
            <p className="text-xs text-cyan-500 mt-4">(For this demo, check the toast notification or your terminal!)</p>
          </div>
        )}
      </div>
    </div>
  );
}
