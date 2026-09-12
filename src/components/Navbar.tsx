/**
 * Premium Sticky Navigation
 * Architectural aesthetics, subtle backdrop blur, accessible mobile drawer,
 * direct appointment action, and doctor portal entrance.
 */

import React, { useState, useEffect } from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { Menu, X, Calendar, Phone, Lock, ChevronRight, MapPin } from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentRoute !== '/') {
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0D11]/90 backdrop-blur-md border-b border-white/8 py-3.5 shadow-2xl'
            : 'bg-transparent py-5 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Location */}
          <button
            id="nav-logo-btn"
            type="button"
            onClick={() => onNavigate('/')}
            className="flex items-center space-x-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E242F] to-[#12151B] border border-[#C5A059]/40 flex items-center justify-center shadow-lg group-hover:border-[#C5A059] transition-colors">
              <span className="font-serif text-lg font-bold text-[#E6C875]">T</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-base sm:text-lg font-semibold tracking-wide text-white group-hover:text-[#E6C875] transition-colors">
                  {clinicConfig.name}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-[11px] text-slate-400 font-medium">
                <MapPin className="w-3 h-3 text-[#C5A059]" />
                <span>Panvel, Navi Mumbai</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs tracking-wider uppercase font-medium text-slate-300">
            <button
              id="nav-link-about"
              type="button"
              onClick={() => handleNavClick('about')}
              className="hover:text-[#E6C875] transition-colors"
            >
              About
            </button>
            <button
              id="nav-link-treatments"
              type="button"
              onClick={() => handleNavClick('treatments')}
              className="hover:text-[#E6C875] transition-colors"
            >
              Treatments
            </button>
            <button
              id="nav-link-technology"
              type="button"
              onClick={() => handleNavClick('technology')}
              className="hover:text-[#E6C875] transition-colors"
            >
              Technology
            </button>
            <button
              id="nav-link-doctors"
              type="button"
              onClick={() => handleNavClick('doctors')}
              className="hover:text-[#E6C875] transition-colors"
            >
              Doctors
            </button>
            <button
              id="nav-link-journey"
              type="button"
              onClick={() => handleNavClick('journey')}
              className="hover:text-[#E6C875] transition-colors"
            >
              Patient Journey
            </button>
            <button
              id="nav-link-contact"
              type="button"
              onClick={() => handleNavClick('contact')}
              className="hover:text-[#E6C875] transition-colors"
            >
              Location
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Doctor Portal Link */}
            <button
              id="nav-doctor-portal-btn"
              type="button"
              onClick={() => onNavigate('/admin')}
              className="p-2 text-slate-400 hover:text-[#C5A059] transition-colors rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
              title="Doctor & Clinical Staff Portal"
              aria-label="Doctor Portal"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Quick Call */}
            <a
              id="nav-quick-call"
              href={`tel:${clinicConfig.phoneRaw}`}
              className="hidden lg:flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
              title="Direct Phone Consultation"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-mono text-[11px]">{clinicConfig.phone}</span>
            </a>

            {/* Primary Appointment CTA */}
            <button
              id="nav-book-consultation-btn"
              type="button"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#C5A059] to-[#A88438] text-[#0B0D11] text-xs font-semibold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#C5A059]/10"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="mobile-book-btn"
              type="button"
              onClick={() => onOpenBooking()}
              className="p-2 rounded-full bg-[#C5A059] text-[#0B0D11] text-xs font-medium"
              aria-label="Book Consultation"
            >
              <Calendar className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-300 hover:text-white bg-white/5 rounded-xl border border-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#0B0D11]/95 backdrop-blur-xl pt-24 px-6 pb-10 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <p className="text-xs uppercase tracking-widest text-[#C5A059] font-mono mb-1">
                Tamhankar Dental Clinic
              </p>
              <p className="text-sm text-slate-300 font-serif">Precision Dentistry in Panvel, Navi Mumbai</p>
            </div>

            <nav className="flex flex-col space-y-4 text-base font-serif">
              <button
                type="button"
                onClick={() => handleNavClick('about')}
                className="flex items-center justify-between text-left py-2 text-slate-200 hover:text-[#C5A059] border-b border-white/5"
              >
                <span>About Clinic</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('treatments')}
                className="flex items-center justify-between text-left py-2 text-slate-200 hover:text-[#C5A059] border-b border-white/5"
              >
                <span>Treatments & Services</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('technology')}
                className="flex items-center justify-between text-left py-2 text-slate-200 hover:text-[#C5A059] border-b border-white/5"
              >
                <span>Digital Technology</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('doctors')}
                className="flex items-center justify-between text-left py-2 text-slate-200 hover:text-[#C5A059] border-b border-white/5"
              >
                <span>Clinical Team</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('journey')}
                className="flex items-center justify-between text-left py-2 text-slate-200 hover:text-[#C5A059] border-b border-white/5"
              >
                <span>Patient Journey</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className="flex items-center justify-between text-left py-2 text-slate-200 hover:text-[#C5A059] border-b border-white/5"
              >
                <span>Location & Hours</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </nav>
          </div>

          <div className="pt-8 space-y-4">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-[#C5A059] text-[#0B0D11] text-sm font-semibold uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`tel:${clinicConfig.phoneRaw}`}
                className="flex items-center space-x-2 text-xs text-slate-300 hover:text-white"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Call Clinic</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/admin');
                }}
                className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-[#C5A059]"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Doctor Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
