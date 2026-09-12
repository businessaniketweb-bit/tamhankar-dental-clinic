/**
 * Treatments & Clinical Services Section
 * Interactive luxury cards with category filters, procedural duration,
 * clinical indications, and direct pre-fill booking actions.
 */

import React, { useState } from 'react';
import { clinicConfig, TreatmentItem } from '../config/clinicConfig';
import { Clock, ArrowUpRight, Sparkles, Check, ChevronRight } from 'lucide-react';

interface TreatmentsSectionProps {
  onSelectTreatment: (serviceTitle: string) => void;
}

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({ onSelectTreatment }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Surgical & Restorative', 'Endodontics', 'Orthodontics', 'Aesthetics', 'Preventive', 'Periodontics', 'Surgical'];
  const categoryLabels: Record<string, string> = {
    all: 'All Treatments',
    'Surgical & Restorative': 'Implants',
    Endodontics: 'Root Canal',
    Orthodontics: 'Aligners & Braces',
    Aesthetics: 'Cosmetics',
    Preventive: 'Pediatric Care',
    Periodontics: 'Gum Health',
    Surgical: 'Oral Surgery',
  };

  const filteredServices = activeCategory === 'all'
    ? clinicConfig.services
    : clinicConfig.services.filter(s => s.category === activeCategory);

  return (
    <section id="treatments" className="py-24 bg-[#0E1117] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-mono text-[#C5A059] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span>Comprehensive Clinical Care</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            Specialized Dentistry.{' '}
            <span className="block font-medium luxury-gradient-text mt-1">
              Executed with Microscopic Precision.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light mt-4 leading-relaxed">
            From single-sitting painless endodontics and computerized dental implantology to clear aligner orthodontics, our clinical protocols prioritize biological preservation and lasting aesthetic harmony.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#C5A059] text-[#0B0D11] shadow-lg shadow-[#C5A059]/15'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service: TreatmentItem) => (
            <div
              key={service.id}
              className="rounded-3xl bg-[#121620]/90 border border-white/5 hover:border-[#C5A059]/40 p-7 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden hover:shadow-2xl hover:shadow-[#C5A059]/5 hover:-translate-y-1"
            >
              {/* Subtle metallic top accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059]/0 to-transparent group-hover:via-[#C5A059] transition-all duration-500" />

              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-mono uppercase tracking-wider text-[#E6C875] border border-white/5">
                    {service.category}
                  </span>
                  <div className="flex items-center space-x-1 text-[11px] text-slate-400 font-mono">
                    <Clock className="w-3 h-3 text-[#C5A059]" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Title and Tagline */}
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-[#E6C875] transition-colors mb-1.5">
                  {service.title}
                </h3>
                <p className="text-xs text-[#C5A059] font-light mb-4">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    Clinical Highlights:
                  </p>
                  <div className="space-y-1.5">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                        <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectTreatment(service.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#C5A059] hover:text-[#0B0D11] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 group-hover:bg-[#C5A059]/10 group-hover:text-[#E6C875]"
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
