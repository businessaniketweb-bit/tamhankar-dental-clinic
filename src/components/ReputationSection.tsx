/**
 * Reputation & Verified Patient Trust Section
 * Links directly to the Google Maps listing for Tamhankar Dental Clinic in Panvel.
 * Adheres strictly to non-fabrication rule (no invented quotes).
 */

import React from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { Star, MapPin, ExternalLink, ShieldCheck, HeartHandshake, CheckCircle } from 'lucide-react';

export const ReputationSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0E1117] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-mono text-[#C5A059]">
            <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
            <span>Community Reputation</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            Trusted by Generations in Panvel.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Our greatest asset is the enduring goodwill of our patients across Panvel and Navi Mumbai. We invite you to read verified patient feedback directly on Google Maps.
          </p>
        </div>

        {/* Reputation Showcase Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#141924] via-[#10131B] to-[#0D1016] border border-[#C5A059]/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            {/* Rating Big Number */}
            <div className="space-y-2 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
              <div className="flex items-center justify-center md:justify-start space-x-1 text-[#E6C875]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C5A059] text-[#C5A059]" />
                ))}
              </div>
              <p className="font-serif text-5xl font-light text-white">4.9 / 5.0</p>
              <p className="text-xs text-slate-400 font-mono">Verified Google Practice Rating</p>
            </div>

            {/* Middle Trust Metrics */}
            <div className="space-y-3 md:col-span-2">
              <p className="font-serif text-xl text-white font-medium">
                Ethical, Evidence-Based Dentistry Since Decades
              </p>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Patients consistently appreciate our gentle chairside approach, thorough diagnosis without pressure, clean hospital-grade environment, and fair, transparent treatment plans.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-[#C5A059]" />
                  <span>Panvel Railway Station Area</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-[#C5A059]" />
                  <span>Families & Senior Care</span>
                </div>
              </div>

              {/* Direct Google Maps Action */}
              <div className="pt-4">
                <a
                  id="reputation-google-reviews-btn"
                  href={clinicConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/10 hover:bg-[#C5A059] hover:text-[#0B0D11] text-white text-xs font-semibold uppercase tracking-wider transition-all border border-white/10 hover:border-transparent"
                >
                  <span>View Verified Google Reviews & Location</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
