/**
 * Footer Component
 * Architectural dark luxury footer with centralized clinic config,
 * quick navigation, doctor portal link, and ethical medical disclaimer.
 */

import React from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { MapPin, Phone, Mail, Lock, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (id: string) => {
    onNavigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-[#07080A] text-slate-400 text-xs border-t border-white/5 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Clinic Brand & Ethos */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#181C25] border border-[#C5A059]/40 flex items-center justify-center">
                <span className="font-serif text-base font-bold text-[#E6C875]">T</span>
              </div>
              <span className="font-serif text-lg text-white font-medium">
                {clinicConfig.name}
              </span>
            </div>

            <p className="text-slate-400 font-light leading-relaxed max-w-sm">
              {clinicConfig.subTagline}
            </p>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1 font-light">
              <p>Sai Arcade, Near Railway Station Road,</p>
              <p>Old Panvel, Navi Mumbai, Maharashtra 410206</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-white font-serif text-sm font-medium tracking-wide">
              Clinical Navigation
            </p>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-[#E6C875] transition-colors"
                >
                  About the Clinic
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('treatments')}
                  className="hover:text-[#E6C875] transition-colors"
                >
                  Treatments & Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('technology')}
                  className="hover:text-[#E6C875] transition-colors"
                >
                  Digital Technology
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('doctors')}
                  className="hover:text-[#E6C875] transition-colors"
                >
                  Clinical Team
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('appointment-booking')}
                  className="hover:text-[#E6C875] transition-colors"
                >
                  Book Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Consultation Hours */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-white font-serif text-sm font-medium tracking-wide">
              Consultation Hours
            </p>
            <div className="space-y-2 text-[11px]">
              <div>
                <p className="text-slate-300 font-medium">Monday – Saturday</p>
                <p className="text-slate-400 font-mono">10:00 AM – 01:30 PM</p>
                <p className="text-slate-400 font-mono">05:30 PM – 09:00 PM</p>
              </div>
              <div className="pt-1">
                <p className="text-slate-300 font-medium">Sunday</p>
                <p className="text-slate-400 font-mono">10:30 AM – 01:00 PM (Prior Appt)</p>
              </div>
            </div>
          </div>

          {/* Staff & Emergency */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-white font-serif text-sm font-medium tracking-wide">
              Staff Portal
            </p>
            <button
              id="footer-admin-login-btn"
              type="button"
              onClick={() => onNavigate('/admin/login')}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#C5A059] border border-white/10 text-xs transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Doctor Login</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="w-full mt-2 py-2 px-3 rounded-xl bg-white/[0.03] hover:bg-white/5 text-slate-400 hover:text-white flex items-center justify-between text-[11px] transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Ethical Medical Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} {clinicConfig.name}, Panvel, Navi Mumbai. All rights reserved.
          </p>
          <p className="text-center sm:text-right max-w-lg font-light">
            Medical Disclaimer: Content on this site is for educational guidance only. A clinical examination by a qualified dental surgeon is required for diagnostic determination.
          </p>
        </div>
      </div>
    </footer>
  );
};
