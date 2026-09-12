/**
 * Trust & Verified Clinical Metrics Section
 * Grounded in genuine clinic pillars: sterilization, digital low-radiation,
 * long-standing Panvel practice reputation.
 */

import React from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { ShieldCheck, Award, Sparkles, Activity, CheckCircle2 } from 'lucide-react';

export const TrustStats: React.FC = () => {
  return (
    <section className="py-16 bg-[#0E1117] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clinicConfig.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#12151C]/90 border border-white/5 hover:border-[#C5A059]/30 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A059]/5 rounded-full blur-2xl group-hover:bg-[#C5A059]/10 transition-colors pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] uppercase tracking-wider font-mono text-[#C5A059]">
                  {metric.label}
                </span>
                {idx === 0 && <Award className="w-4 h-4 text-[#C5A059]" />}
                {idx === 1 && <ShieldCheck className="w-4 h-4 text-[#C5A059]" />}
                {idx === 2 && <Activity className="w-4 h-4 text-[#C5A059]" />}
                {idx === 3 && <Sparkles className="w-4 h-4 text-[#C5A059]" />}
              </div>

              <p className="font-serif text-3xl sm:text-4xl font-normal text-white mb-2">
                {metric.value}
              </p>
              
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Clinical Quality Assurance Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#141922] via-[#10131A] to-[#141922] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#E6C875]" />
            </div>
            <div>
              <p className="font-serif text-base text-white font-medium">
                Hospital-Grade Infection Control Guarantee
              </p>
              <p className="text-xs text-slate-400 max-w-xl">
                Every instrument is sealed in medical-grade indicator pouches, processed through vacuum Class-B sterilization, and opened exclusively in front of the patient.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium shrink-0">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
              <span>Biological Spore Tested</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
              <span>RO Purified Chair Water</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
