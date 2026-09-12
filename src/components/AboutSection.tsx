/**
 * About the Clinic Section
 * Editorial architectural layout highlighting clinical philosophy,
 * patient-centered ethos, and genuine practice legacy in Panvel.
 */

import React from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { ShieldCheck, Heart, Sparkles, MapPin, CheckCircle } from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-24 bg-[#0B0D11] relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Architectural Grid */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#121620] p-8 shadow-2xl">
              <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-widest font-mono text-[#C5A059]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>Clinical Philosophy</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-white font-light leading-snug">
                  "We preserve natural teeth first. We treat people, not just teeth."
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Founded with a dedication to ethical, conservative dental care, Tamhankar Dental Clinic has become a trusted oral healthcare sanctuary for generations of families across Panvel, Khandeshwar, Kamothe, and Navi Mumbai.
                </p>

                {/* Checklist */}
                <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-slate-200">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Conservative, minimally invasive dentistry</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Hospital-standard biological sterilization</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Transparent treatment options & clear estimates</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Comfort-focused, anxiety-free patient care</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-card: Location accessibility */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center space-x-3 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>Ground Floor clinic at Sai Arcade, convenient to Panvel Railway Station & Old Panvel market.</span>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-mono text-[#C5A059]">
                About {clinicConfig.name}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                Architectural Accuracy Meets Gentle Compassion.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                Dentistry is an intricate craft where biomedical science, microscopic engineering, and human empathy intersect. Every treatment at Tamhankar Dental Clinic begins with unhurried listening and comprehensive digital diagnostics.
              </p>
            </div>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-[#12151C]/70 border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#C5A059]/15 flex items-center justify-center text-[#E6C875]">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base text-white font-medium">Gentle & Painless</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  We use micro-fine needles, computerized apex locators, and advanced topical anesthetics to make every procedure comfortable.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#12151C]/70 border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#C5A059]/15 flex items-center justify-center text-[#E6C875]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base text-white font-medium">Strict Infection Barrier</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Our autoclave exceeds standard protocols, using multi-stage pre-vacuum steam to eliminate 100% of bacterial and viral pathogens.
                </p>
              </div>
            </div>

            {/* CTA action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs uppercase font-semibold tracking-wider hover:border-[#C5A059] transition-all"
              >
                Experience Our Care • Book a Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
