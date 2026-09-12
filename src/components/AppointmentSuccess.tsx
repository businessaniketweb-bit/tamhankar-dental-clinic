/**
 * Appointment Success Page (/appointment-success)
 * Luxury branded confirmation view with procedural next steps,
 * direct WhatsApp clinic notification, calendar action, and return to home.
 */

import React from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { Appointment } from '../types/database';
import { CheckCircle, Calendar, Clock, MapPin, Phone, MessageSquare, ArrowLeft, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

interface AppointmentSuccessProps {
  appointment: Appointment | null;
  onReturnHome: () => void;
}

export const AppointmentSuccess: React.FC<AppointmentSuccessProps> = ({ appointment, onReturnHome }) => {
  // Sample fallback if visited directly without booking state
  const apptData: Appointment = appointment || {
    id: 'apt-7940',
    first_name: 'Valued',
    last_name: 'Patient',
    phone: clinicConfig.phone,
    email: 'patient@example.com',
    service: 'Comprehensive Dental Consultation',
    doctor: 'Dr. Tamhankar',
    appointment_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    appointment_time: '11:00 AM',
    status: 'pending',
  };

  const whatsappText = encodeURIComponent(
    `Hello Tamhankar Dental Clinic, I just submitted an appointment request on your website.\n\n` +
    `• Reference: #${apptData.id.toUpperCase()}\n` +
    `• Patient: ${apptData.first_name} ${apptData.last_name}\n` +
    `• Service: ${apptData.service}\n` +
    `• Date & Time: ${apptData.appointment_date} at ${apptData.appointment_time}\n\n` +
    `Kindly confirm my consultation slot. Thank you!`
  );

  const whatsappUrl = `https://wa.me/${clinicConfig.whatsappNumber}?text=${whatsappText}`;

  // Google Calendar Add Link generator
  const createGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Dental Consultation - ${clinicConfig.name}`);
    const details = encodeURIComponent(`Consultation for ${apptData.service} with ${apptData.doctor} at ${clinicConfig.name}, Panvel.`);
    const location = encodeURIComponent(clinicConfig.fullAddress);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="min-h-screen bg-[#0B0D11] pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10 space-y-8">
        {/* Success Insignia & Badge */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#1E2533] to-[#12151B] border border-[#C5A059]/40 flex items-center justify-center shadow-2xl relative group">
            <div className="absolute inset-0 rounded-3xl bg-[#C5A059]/10 animate-ping opacity-25 pointer-events-none" />
            <CheckCircle className="w-10 h-10 text-[#E6C875]" />
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C5A059]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultation Request Registered</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            Appointment Request Received.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base font-light max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-white font-medium">{apptData.first_name}</strong>. Your consultation reservation has been securely logged into our clinical system.
          </p>
        </div>

        {/* Appointment Summary Card */}
        <div className="rounded-3xl bg-gradient-to-b from-[#141824] to-[#0E1118] border border-[#C5A059]/30 p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                Booking Reference
              </p>
              <p className="font-mono text-base text-[#E6C875] font-semibold mt-0.5">
                #{apptData.id.toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[11px] font-mono text-[#E6C875] uppercase">
                Status: Pending Confirmation
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-slate-400 font-mono text-[10px] uppercase block">Selected Treatment</span>
              <span className="text-white font-medium text-sm block">{apptData.service}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-slate-400 font-mono text-[10px] uppercase block">Assigned Doctor</span>
              <span className="text-white font-medium text-sm block">{apptData.doctor}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-slate-400 font-mono text-[10px] uppercase block">Preferred Date & Time</span>
              <span className="text-white font-medium text-sm block">
                {apptData.appointment_date} • {apptData.appointment_time}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-slate-400 font-mono text-[10px] uppercase block">Clinic Location</span>
              <span className="text-white font-medium text-sm block">Sai Arcade, Panvel</span>
            </div>
          </div>

          {/* Next Steps Checklist */}
          <div className="p-4 rounded-2xl bg-[#0B0D11]/60 border border-white/5 space-y-2">
            <p className="text-[11px] uppercase font-mono tracking-wider text-[#C5A059]">
              What happens next:
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 font-light">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <span>Our Panvel reception coordinator will call or message to confirm your exact slot.</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <span>Please arrive 10 minutes prior for preliminary registration & digital history.</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <span>Bring any previous X-rays or ongoing prescription records if available.</span>
              </li>
            </ul>
          </div>

          {/* Direct Actions: WhatsApp and Calendar */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              id="success-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 px-4 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </a>

            <a
              id="success-calendar-btn"
              href={createGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 px-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#C5A059]" />
              <span>Add to Google Calendar</span>
            </a>
          </div>
        </div>

        {/* Return to Home CTA */}
        <div className="text-center pt-2">
          <button
            id="success-return-home-btn"
            type="button"
            onClick={onReturnHome}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Tamhankar Dental Clinic Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
