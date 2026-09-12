/**
 * Hero Section
 * Large cinematic typography, subtle motion, real 3D interactive dental crown,
 * primary booking action, and verified Panvel location badge.
 */

import React from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { ThreeToothHero } from './ThreeToothHero';
import { Calendar, ArrowRight, ShieldCheck, Sparkles, ChevronDown, Clock, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreTreatments: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreTreatments }) => {
  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden border-b border-white/5">
      {/* Background Ambient Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#1A2536]/30 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Location & Practice Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6C875]">
                Old Panvel • Navi Mumbai
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-300">Hospital-Grade Sterilization</span>
            </div>

            {/* Cinematic Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight leading-[1.1]">
              Precision Dentistry.{' '}
              <span className="block font-medium luxury-gradient-text mt-1">
                Designed Around You.
              </span>
            </h1>

            {/* Editorial Supporting Description */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              At <strong className="font-normal text-white">{clinicConfig.name}</strong>, we blend advanced digital diagnostics, microscopic endodontics, and conservative surgical care with uncompromising sterilization protocols in a calm, welcoming environment.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="hero-book-btn"
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#A88438] text-[#0B0D11] text-xs uppercase font-bold tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#C5A059]/20 flex items-center justify-center space-x-2.5 group"
              >
                <Calendar className="w-4 h-4 text-[#0B0D11]" />
                <span>Schedule Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-btn"
                type="button"
                onClick={onExploreTreatments}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs uppercase font-semibold tracking-wider transition-all flex items-center justify-center space-x-2"
              >
                <span>View Treatments</span>
              </button>
            </div>

            {/* Quick Practice Pillars */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-left">
                <p className="font-serif text-lg sm:text-xl text-white font-medium">Class-B</p>
                <p className="text-[11px] text-slate-400">Vacuum Autoclave</p>
              </div>
              <div className="text-left border-l border-white/10 pl-4">
                <p className="font-serif text-lg sm:text-xl text-white font-medium">&lt;80%</p>
                <p className="text-[11px] text-slate-400">Digital RVG Dose</p>
              </div>
              <div className="text-left border-l border-white/10 pl-4">
                <p className="font-serif text-lg sm:text-xl text-[#E6C875] font-medium">4.9 ★</p>
                <p className="text-[11px] text-slate-400">Google Panvel</p>
              </div>
            </div>
          </div>

          {/* Right 3D Interactive Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-[520px] rounded-3xl bg-gradient-to-b from-[#131720]/70 to-[#0B0D11]/90 border border-white/10 backdrop-blur-md p-2 shadow-2xl relative">
              {/* Studio Frame Decoration */}
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[#C5A059]/40 rounded-tr-3xl pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-[#C5A059]/40 rounded-bl-3xl pointer-events-none" />

              {/* 3D Scene */}
              <ThreeToothHero />

              {/* Bottom Card Caption */}
              <div className="px-4 py-3 bg-[#0B0D11]/70 rounded-2xl border border-white/5 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-slate-300">Biocompatible Ceramics & Titanium</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">Drag to Rotate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-8 sm:mt-12 flex justify-center">
        <button
          type="button"
          onClick={onExploreTreatments}
          className="flex flex-col items-center space-y-1 text-slate-400 hover:text-[#E6C875] transition-colors group"
          aria-label="Scroll down to treatments"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono">Explore</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
