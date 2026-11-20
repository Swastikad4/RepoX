'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RepoXLogo } from '@/components/RepoXLogo';
import { Github, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#F8F8FA] overflow-hidden">
      {/* Huge Transparent GitHub Logo Watermark */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center opacity-[0.035]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-[600px] h-[600px] text-gray-950 fill-current"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M50 0C22.386 0 0 22.386 0 50s22.386 50 50 50 50-22.386 50-50S77.614 0 50 0zm0 18c-17.673 0-32 14.327-32 32 0 14.138 9.167 26.134 21.884 30.366 1.6.295 2.184-.695 2.184-1.542 0-.76-.028-3.277-.043-5.945-8.902 1.935-10.78-3.791-10.78-3.791-1.455-3.696-3.555-4.68-3.555-4.68-2.906-1.986.22-1.946.22-1.946 3.212.226 4.903 3.298 4.903 3.298 2.855 4.892 7.49 3.479 9.315 2.661.29-2.068 1.118-3.48 2.034-4.28-7.106-.808-14.577-3.553-14.577-15.811 0-3.492 1.247-6.347 3.293-8.583-.33-.809-1.427-4.062.313-8.463 0 0 2.686-.86 8.8 3.28 2.552-.71 5.289-1.065 8.009-1.078 2.719.013 5.457.368 8.012 1.078 6.109-4.14 8.79-3.28 8.79-3.28 1.744 4.401.647 7.654.318 8.463 2.05 2.236 3.29 5.091 3.29 8.583 0 12.29-7.483 14.993-14.61 15.785 1.149.99 2.173 2.94 2.173 5.925 0 4.278-.039 7.731-.039 8.781 0 .855.577 1.854 2.197 1.539C72.844 76.128 82 64.134 82 50c0-17.673-14.327-32-32-32z"
          />
        </svg>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex justify-center mb-4 transition-transform hover:scale-105">
          <RepoXLogo size="lg" />
        </Link>
        <h2 className="text-2xl font-black tracking-tight text-gray-950">
          Welcome to RepoX
        </h2>
        <p className="mt-1.5 text-sm font-semibold text-[#E11D74]">
          Understand Your Codebase. Visualize Its Architecture.
        </p>
      </div>

      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xs border border-gray-200/80 sm:rounded-2xl sm:px-10">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-pink-50 text-[#E11D74] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-950">Check your email</h3>
              <p className="text-sm text-gray-600 mt-2">
                We sent a magic sign-in link to <span className="font-semibold text-gray-900">{email}</span>.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center text-sm font-semibold text-[#E11D74] hover:underline"
              >
                Return to Dashboard <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* GitHub OAuth Button */}
              <button
                type="button"
                onClick={() => window.location.href = '/'}
                className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 border border-gray-200 rounded-xl shadow-xs bg-white text-sm font-semibold text-gray-800 hover:bg-pink-50/30 hover:border-pink-300 hover:text-[#E11D74] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E11D74] transition-all"
              >
                <Github className="w-5 h-5 text-gray-900" />
                Continue with GitHub
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-gray-400 font-semibold tracking-wider">Or continue with email</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-[#E11D74] tracking-widest uppercase">
                    Work Email
                  </label>
                  <div className="mt-1.5">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="developer@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3.5 py-2.5 border border-gray-300 rounded-xl shadow-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E11D74] focus:border-[#E11D74] text-sm text-gray-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-xs text-sm font-semibold text-white bg-[#E11D74] hover:bg-[#BE185D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E11D74] transition-all"
                >
                  Sign in to RepoX
                </button>
              </form>

              <div className="pt-2">
                <div className="flex items-center gap-2 p-3 bg-pink-50/70 rounded-xl border border-pink-100 text-xs text-[#BE185D]">
                  <Sparkles className="w-4 h-4 text-[#E11D74] flex-shrink-0" />
                  <span>RepoX is currently in public demo mode with no credit card required.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          By signing in, you agree to RepoX terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
}
