/**
 * Doctors & Clinical Team Section
 * Meticulous clinical profiles respecting authentic credentials,
 * verified specialties, and patient-first approach.
 */

import React from 'react';
import { clinicConfig, DoctorItem } from '../config/clinicConfig';
import { UserCheck, Award, Stethoscope, CheckCircle2 } from 'lucide-react';

interface DoctorsSectionProps {
  onSelectDoctor: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onSelectDoctor }) => {
  return (
    <section id="doctors" className="py-24 bg-[#0E1117] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-mono text-[#C5A059] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span>Clinical Leadership</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            Meet Our Clinical Team.{' '}
            <span className="block font-medium luxury-gradient-text mt-1">
              Decades of Patient Dedication in Panvel.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light mt-4 leading-relaxed">
            Our multi-disciplinary clinical team brings together senior surgical experience, microscopic endodontic precision, and certified orthodontic planning under one roof.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clinicConfig.doctors.map((doctor: DoctorItem) => (
            <div
              key={doctor.id}
              className="rounded-3xl bg-[#121620]/90 border border-white/5 hover:border-[#C5A059]/40 p-8 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-6">
                {/* Doctor Avatar / Insignia */}
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1E2532] to-[#11141B] border border-[#C5A059]/30 flex items-center justify-center text-[#E6C875] group-hover:scale-105 transition-transform">
                    <Stethoscope className="w-8 h-8 text-[#C5A059]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[11px] font-mono text-slate-300 border border-white/5">
                    {doctor.specialty.split('&')[0]}
                  </span>
                </div>

                {/* Name & Title */}
                <div>
                  <h3 className="font-serif text-2xl text-white font-normal group-hover:text-[#E6C875] transition-colors mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-xs font-mono text-[#C5A059] mb-1">
                    {doctor.title}
                  </p>
                  <p className="text-[11px] text-slate-400 font-sans">
                    {doctor.qualifications}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {doctor.bio}
                </p>

                {/* Focus Areas */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                    Clinical Focus:
                  </p>
                  <div className="space-y-1.5">
                    {doctor.focusAreas.map((area, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="pt-6 mt-6 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => onSelectDoctor(doctor.name)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#C5A059] hover:text-[#0B0D11] text-white text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Consult with {doctor.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
