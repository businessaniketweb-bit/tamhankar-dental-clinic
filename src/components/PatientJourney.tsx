/**
 * Patient Journey Section
 * Sequential 5-step clinical pathway with elegant editorial layout
 * and clear procedural transparency.
 */

import React from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

export const PatientJourney: React.FC = () => {
  return (
    <section id="journey" className="py-24 bg-[#0B0D11] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-mono text-[#C5A059] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span>The Clinical Pathway</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            The Patient Journey.{' '}
            <span className="block font-medium luxury-gradient-text mt-1">
              Structured for Clarity and Peace of Mind.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light mt-4 leading-relaxed">
            We believe an informed patient is a calm, confident patient. Here is the step-by-step methodology behind every treatment plan at Tamhankar Dental Clinic.
          </p>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {clinicConfig.journey.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#121620]/80 border border-white/5 hover:border-[#C5A059]/40 transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Step indicator */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-3xl font-light text-[#C5A059]/40 group-hover:text-[#E6C875] transition-colors">
                    {item.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-[#C5A059] transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] mb-1">
                  {item.subtitle}
                </p>

                <h3 className="font-serif text-lg text-white font-normal mb-3 group-hover:text-[#E6C875] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom line progress */}
              <div className="pt-6 mt-6 border-t border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Stage {idx + 1} of 5
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
