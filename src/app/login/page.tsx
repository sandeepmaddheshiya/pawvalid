'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [petName, setPetName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      setError(null);

      // Authenticate / Register user without dummy data
      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name.trim() || undefined,
          isSignUp,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed. Please try again.');
      }

      localStorage.setItem('petvia_user_email', email.trim().toLowerCase());

      if (data.activeTrip) {
        localStorage.setItem('petvia_active_trip', JSON.stringify(data.activeTrip));
        router.push(`/dashboard?tripId=${data.activeTrip.id}`);
      } else {
        localStorage.removeItem('petvia_active_trip');
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Something went wrong. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <span className="text-3xl">🐾</span>
          <span className="font-display font-black text-2xl tracking-tight text-zinc-900">
            Petvia
          </span>
        </Link>
        <h1 className="font-display text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
          {isSignUp ? 'Create your Petvia account' : 'Welcome back'}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-zinc-500">
          {isSignUp
            ? 'Start managing your pet’s international travel compliance'
            : 'Sign in to access your pet travel command center'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl border border-zinc-200/80 rounded-3xl space-y-6">
          {/* Tab Switcher: Sign In vs Sign Up */}
          <div className="flex p-1 rounded-2xl bg-zinc-100 border border-zinc-200/70">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError(null);
              }}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                !isSignUp
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError(null);
              }}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isSignUp
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="petName" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Pet&apos;s Name
                  </label>
                  <input
                    id="petName"
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="e.g. Milo, Luna, Bella"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="pass" className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Password
                </label>
                {!isSignUp && (
                  <span className="text-[11px] text-zinc-400 hover:text-emerald-600 cursor-pointer">
                    Forgot password?
                  </span>
                )}
              </div>
              <input
                id="pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#0E1B33] hover:bg-[#16274a] text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Loading Command Center...</span>
                </>
              ) : (
                <span>{isSignUp ? 'Create Account & Continue →' : 'Sign In to Dashboard →'}</span>
              )}
            </button>
          </form>

          {/* Social Proof & Security Guarantee */}
          <div className="pt-4 border-t border-zinc-100 flex items-center justify-center gap-4 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1">🔒 256-bit Encrypted</span>
            <span>•</span>
            <span className="flex items-center gap-1">✈️ IATA Compliant</span>
          </div>

          <div className="text-center pt-1">
            <Link
              href="/"
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
