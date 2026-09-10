'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [name, setName] = useState('');
  const [petName, setPetName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Magic link request state
  const [magicEmail, setMagicEmail] = useState('');
  const [magicLoading, setMagicLoading] = useState(false);
  const [magicSuccess, setMagicSuccess] = useState<string | null>(null);
  const [magicError, setMagicError] = useState<string | null>(null);

  // Magic link token verification state
  const [verifyingToken, setVerifyingToken] = useState(false);

  // Handle incoming magic link from email click (?token=...&email=...)
  useEffect(() => {
    const token = searchParams.get('token');
    const paramEmail = searchParams.get('email');

    if (!token) return;

    let isMounted = true;
    setVerifyingToken(true);
    setError(null);

    async function handleMagicAuth() {
      try {
        const res = await fetch('/api/auth/verify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, email: paramEmail || undefined }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Magic link verification failed.');
        }

        if (!isMounted) return;

        localStorage.setItem('pawvalid_user_email', data.userEmail);
        localStorage.setItem('petvia_user_email', data.userEmail);

        const tripIdParam = searchParams.get('tripId');
        const matchedTrip = tripIdParam
          ? (data.trips || []).find((t: any) => t.id === tripIdParam) || data.activeTrip
          : data.activeTrip;

        if (matchedTrip) {
          localStorage.setItem('pawvalid_active_trip', JSON.stringify(matchedTrip));
          localStorage.setItem('petvia_active_trip', JSON.stringify(matchedTrip));
          router.push(`/dashboard?tripId=${matchedTrip.id}`);
        } else if (tripIdParam) {
          router.push(`/dashboard?tripId=${tripIdParam}`);
        } else {
          localStorage.removeItem('pawvalid_active_trip');
          localStorage.removeItem('petvia_active_trip');
          router.push('/dashboard');
        }
      } catch (err: any) {
        if (!isMounted) return;
        console.error('Magic link auth error:', err);
        setError(err.message || 'Invalid or expired magic link. Please sign in or request a new link.');
        setVerifyingToken(false);
      }
    }

    handleMagicAuth();

    return () => {
      isMounted = false;
    };
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      setError(null);

      // Authenticate / Register user
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

      localStorage.setItem('pawvalid_user_email', email.trim().toLowerCase());
      localStorage.setItem('petvia_user_email', email.trim().toLowerCase());

      if (data.activeTrip) {
        localStorage.setItem('pawvalid_active_trip', JSON.stringify(data.activeTrip));
        localStorage.setItem('petvia_active_trip', JSON.stringify(data.activeTrip));
        router.push(`/dashboard?tripId=${data.activeTrip.id}`);
      } else {
        localStorage.removeItem('pawvalid_active_trip');
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

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = magicEmail.trim() || email.trim();
    if (!targetEmail) {
      setMagicError('Please enter your email address.');
      return;
    }

    try {
      setMagicLoading(true);
      setMagicError(null);
      setMagicSuccess(null);

      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch magic access link.');
      }

      setMagicSuccess(`Magic access link sent to ${targetEmail}! Please check your inbox (and spam folder) to sign in.`);
    } catch (err: any) {
      setMagicError(err.message || 'Could not send magic link. Please check your email and try again.');
    } finally {
      setMagicLoading(false);
    }
  };

  if (verifyingToken) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center flex flex-col items-center">
          <div className="mb-4">
            <Logo />
          </div>
          <div className="bg-white py-10 px-8 shadow-xl border border-zinc-200/80 rounded-3xl w-full flex flex-col items-center space-y-4">
            <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <h2 className="text-lg font-bold text-zinc-900">Verifying Magic Link...</h2>
            <p className="text-xs text-zinc-500 text-center">
              Securing your session and loading your travel command center.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center flex flex-col items-center">
        <div className="mb-4">
          <Logo />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
          {showForgot
            ? 'Password Recovery'
            : isSignUp
            ? 'Create your PawValid account'
            : 'Welcome back'}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-zinc-500">
          {showForgot
            ? 'Receive an instant, password-free magic login link via email'
            : isSignUp
            ? 'Start managing your pet’s international travel compliance'
            : 'Sign in to access your pet travel command center'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl border border-zinc-200/80 rounded-3xl space-y-6">
          {!showForgot ? (
            <>
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
                      <button
                        type="button"
                        onClick={() => {
                          setMagicEmail(email);
                          setShowForgot(true);
                          setError(null);
                          setMagicError(null);
                          setMagicSuccess(null);
                        }}
                        className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer"
                      >
                        Forgot password?
                      </button>
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
            </>
          ) : (
            /* Forgot Password / Magic Link Form */
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                Enter your account email and we’ll send you a single-use <strong>Magic Access Link</strong>. No password needed!
              </div>

              <form onSubmit={handleSendMagicLink} className="space-y-4">
                <div>
                  <label htmlFor="magicEmail" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Registered Email Address
                  </label>
                  <input
                    id="magicEmail"
                    type="email"
                    required
                    value={magicEmail}
                    onChange={(e) => setMagicEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>

                {magicSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium leading-relaxed">
                    ✓ {magicSuccess}
                  </div>
                )}

                {magicError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {magicError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={magicLoading}
                  className="w-full py-3 px-4 rounded-xl bg-[#0E1B33] hover:bg-[#16274a] text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {magicLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Magic Link...</span>
                    </>
                  ) : (
                    <span>Send Magic Access Link →</span>
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgot(false);
                      setMagicError(null);
                      setMagicSuccess(null);
                    }}
                    className="text-xs font-bold text-zinc-600 hover:text-zinc-900 cursor-pointer"
                  >
                    ← Back to Standard Sign In
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Social Proof & Security Guarantee */}
          <div className="pt-4 border-t border-zinc-100 flex items-center justify-center gap-4 text-[11px] text-zinc-500 font-medium">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span>256-bit Encrypted</span>
            </span>
            <span className="text-zinc-300">•</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              <span>IATA Compliant</span>
            </span>
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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
