/**
 * Doctor & Staff Login (/admin/login)
 * Preserves Supabase Authentication and security.
 * Doctor-only access with clear error reporting and luxury visual identity.
 */

import React, { useState } from 'react';
import { clinicConfig } from '../../config/clinicConfig';
import { loginDoctor, isSupabaseConfigured } from '../../lib/supabaseClient';
import { Lock, Mail, Key, ShieldCheck, ArrowRight, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onReturnHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onReturnHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password.trim()) {
      setError('Please provide both email address and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginDoctor(cleanEmail, password);
      if (res.success) {
        onLoginSuccess();
      } else {
        setError(res.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err: any) {
      setError(err?.message || 'Login error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D11] pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#1B212D] to-[#11141B] border border-[#C5A059]/40 flex items-center justify-center shadow-xl">
            <Lock className="w-6 h-6 text-[#E6C875]" />
          </div>

          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">
            <span>Clinical Staff Portal</span>
          </span>

          <h1 className="font-serif text-3xl text-white font-light tracking-tight">
            Doctor Authentication
          </h1>

          <p className="text-xs text-slate-400 font-light">
            Authorized dental surgeons and clinical directors of {clinicConfig.name}.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-gradient-to-b from-[#141824] to-[#0E1118] border border-white/10 p-8 shadow-2xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 flex items-start space-x-2.5 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {!isSupabaseConfigured() && (
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 space-y-1">
              <div className="flex items-center space-x-1.5 font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Supabase Configuration Required</span>
              </div>
              <p className="text-[11px] text-amber-200/80 font-light">
                Supabase URL or Anon Key is missing. Please configure credentials in environment settings to authenticate.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
                Doctor Email Address
              </label>
              <div className="relative">
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
                Secure Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                id="admin-login-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-[#C5A059] text-[#0B0D11] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Authenticating with Supabase...</span>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Row Level Security Guarded</span>
            </span>
            <span>Panvel Clinical Network</span>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <button
            type="button"
            onClick={onReturnHome}
            className="inline-flex items-center space-x-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </button>
        </div>
      </div>
    </div>
  );
};
