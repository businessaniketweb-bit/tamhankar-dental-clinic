/**
 * Contact & Location Section
 * Grounded in the authentic Google Maps listing for Tamhankar Dental Clinic in Panvel.
 * Features verified timings, direct calling, WhatsApp action, and patient FAQs.
 */

import React, { useState } from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink, ChevronDown, ChevronUp, Navigation } from 'lucide-react';

export const ContactLocationSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="contact" className="py-24 bg-[#0B0D11] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-mono text-[#C5A059] mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Panvel Clinic Practice</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            Visit Tamhankar Dental Clinic.{' '}
            <span className="block font-medium luxury-gradient-text mt-1">
              Conveniently Located in Old Panvel.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light mt-4 leading-relaxed">
            Situated at Sai Arcade near Panvel Railway Station road, our clinic is easily reachable with dedicated parking and ground-floor accessibility for elderly patients.
          </p>
        </div>

        {/* Location & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: Address & Direct Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl bg-[#121620] border border-white/10 p-8 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block mb-2">
                  Physical Address
                </span>
                <p className="font-serif text-xl text-white font-normal mb-2">
                  Sai Arcade, Old Panvel
                </p>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {clinicConfig.fullAddress}
                </p>
              </div>

              {/* Verified Working Timings */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center space-x-2 text-xs uppercase font-mono tracking-wider text-slate-400 mb-3">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Clinical Consultation Hours</span>
                </div>
                <div className="space-y-3 text-xs">
                  {clinicConfig.timings.map((t, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-white font-medium">{t.days}</span>
                      <div className="text-slate-400 font-mono text-[11px]">
                        <span>{t.morning}</span>
                        {t.evening !== 'Closed' && <span className="mx-1.5">•</span>}
                        {t.evening !== 'Closed' && <span>{t.evening}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap gap-3">
                <a
                  id="contact-call-btn"
                  href={`tel:${clinicConfig.phoneRaw}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Call {clinicConfig.phone}</span>
                </a>

                <a
                  id="contact-whatsapp-btn"
                  href={`https://wa.me/${clinicConfig.whatsappNumber}?text=${encodeURIComponent(clinicConfig.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Clinic</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Interactive Maps & Directions Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#121620] border border-white/10 p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block mb-1">
                    Google Maps Integration
                  </span>
                  <p className="font-serif text-xl text-white font-normal">
                    Find Us on Google Maps
                  </p>
                </div>

                <a
                  id="contact-google-maps-link"
                  href={clinicConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-[#C5A059] hover:text-[#0B0D11] text-white transition-colors"
                  title="Open in Google Maps"
                >
                  <Navigation className="w-5 h-5" />
                </a>
              </div>

              {/* Stylized Maps Visual Card */}
              <div className="h-56 w-full rounded-2xl bg-[#171C26] border border-white/10 relative overflow-hidden flex flex-col justify-between p-6">
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B0D11]/80 backdrop-blur-sm border border-white/10 text-xs font-mono text-[#E6C875]">
                    <MapPin className="w-3 h-3 text-[#C5A059]" />
                    <span>Panvel Station Area • Sai Arcade</span>
                  </div>
                </div>

                <div className="relative z-10 flex items-end justify-between">
                  <div>
                    <p className="text-white font-serif text-base font-medium">
                      Tamhankar Dental Clinic
                    </p>
                    <p className="text-xs text-slate-400 font-mono">
                      18.9922° N, 73.1114° E
                    </p>
                  </div>

                  <a
                    href={clinicConfig.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-[#C5A059] text-[#0B0D11] text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition-all flex items-center space-x-1.5 shadow-md"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Tip for patients: If taking the train, alight at Panvel Railway Station (West) and take a quick 3-minute auto-rickshaw or walk towards Sai Arcade on Station Road.
              </p>
            </div>
          </div>
        </div>

        {/* Patient Frequently Asked Questions (FAQ) */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-mono tracking-widest text-[#C5A059]">
              Patient Guidance
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {clinicConfig.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#121620]/70 border border-white/5 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between space-x-4 focus:outline-none"
                  >
                    <span className="font-serif text-base text-slate-200 font-normal">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#C5A059] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
