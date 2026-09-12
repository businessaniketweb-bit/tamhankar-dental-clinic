/**
 * Technology & Digital Dentistry Section
 * Highlights verified diagnostic and therapeutic clinical technology
 * with architectural precision and clinical benefits.
 */

import React, { useState } from 'react';
import { clinicConfig, TechItem } from '../config/clinicConfig';
import { Cpu, Eye, ShieldCheck, Zap, Radio, CheckCircle2 } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string>(clinicConfig.technologies[0].id);

  const activeTech = clinicConfig.technologies.find(t => t.id === selectedTech) || clinicConfig.technologies[0];

  const getTechIcon = (id: string) => {
    switch (id) {
      case 'rvg': return <Radio className="w-5 h-5 text-[#C5A059]" />;
      case 'rotary-endo': return <Zap className="w-5 h-5 text-[#C5A059]" />;
      case 'autoclave': return <ShieldCheck className="w-5 h-5 text-[#C5A059]" />;
      case 'intraoral-cam': return <Eye className="w-5 h-5 text-[#C5A059]" />;
      case 'piezo-scaler': return <Cpu className="w-5 h-5 text-[#C5A059]" />;
      default: return <Cpu className="w-5 h-5 text-[#C5A059]" />;
    }
  };

  return (
    <section id="technology" className="py-24 bg-[#0B0D11] relative border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-mono text-[#C5A059] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span>Digital Infrastructure</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            Verified Clinical Technology.{' '}
            <span className="block font-medium luxury-gradient-text mt-1">
              Zero Compromise Diagnostics.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light mt-4 leading-relaxed">
            By investing in high-resolution digital imaging, computerized rotary instrumentation, and vacuum sterilization, we minimize radiation, eliminate pain, and maximize treatment longevity.
          </p>
        </div>

        {/* Tech Selector and Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Equipment Menu */}
          <div className="lg:col-span-5 space-y-3">
            {clinicConfig.technologies.map((tech: TechItem) => {
              const isSelected = selectedTech === tech.id;
              return (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => setSelectedTech(tech.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#151922] border-[#C5A059]/60 shadow-xl shadow-[#C5A059]/5'
                      : 'bg-[#0E1117]/80 border-white/5 hover:border-white/15 text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#C5A059]/20 text-[#E6C875]' : 'bg-white/5 text-slate-400 group-hover:text-white'
                    }`}>
                      {getTechIcon(tech.id)}
                    </div>
                    <div>
                      <p className={`font-serif text-base transition-colors ${isSelected ? 'text-white font-medium' : 'text-slate-300'}`}>
                        {tech.title}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {tech.tag}
                      </p>
                    </div>
                  </div>

                  <span className={`w-2 h-2 rounded-full transition-all ${
                    isSelected ? 'bg-[#C5A059] scale-125' : 'bg-white/10'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Deep Dive Display */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-gradient-to-br from-[#131722] via-[#0F121A] to-[#0A0C10] border border-[#C5A059]/30 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-xs font-mono text-[#E6C875]">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Clinical Standard Verified</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
                    {activeTech.title}
                  </h3>
                  <p className="text-sm font-mono text-[#C5A059]">
                    {activeTech.tag}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <p className="text-xs uppercase tracking-widest font-mono text-slate-400 mb-1.5">
                    Direct Patient Advantage:
                  </p>
                  <p className="text-sm text-white font-light flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>{activeTech.benefit}</span>
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                  {activeTech.description}
                </p>

                {/* Additional Clinical Assurance Notes */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs text-slate-400">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-slate-400 block mb-1">Calibration</span>
                    <span className="text-slate-200">ISO/CE Certified Standards</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-slate-400 block mb-1">Safety Index</span>
                    <span className="text-slate-200">Exceeds NABH/AERB Norms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
