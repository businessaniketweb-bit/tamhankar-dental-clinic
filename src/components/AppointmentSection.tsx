/**
 * Appointment Booking System
 * High-end luxury form with rigorous validation, accessible inputs,
 * loading state, Supabase integration, and error fallback.
 */

import React, { useState, useEffect } from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { submitAppointment } from '../lib/supabaseClient';
import { Appointment, AppointmentInsert } from '../types/database';
import { Calendar, Clock, User, Phone, Mail, Stethoscope, MessageSquare, AlertCircle, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface AppointmentSectionProps {
  preselectedService?: string;
  preselectedDoctor?: string;
  onSuccess: (appointment: Appointment) => void;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  preselectedService,
  preselectedDoctor,
  onSuccess,
}) => {
  // Tomorrow's date formatted YYYY-MM-DD
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState<AppointmentInsert>({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    service: preselectedService || clinicConfig.services[0].title,
    doctor: preselectedDoctor || clinicConfig.doctors[0].name,
    appointment_date: tomorrow,
    appointment_time: '11:00 AM',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Update when preselected changes
  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedDoctor) {
      setFormData(prev => ({ ...prev, doctor: preselectedDoctor }));
    }
  }, [preselectedDoctor]);

  const timeSlots = [
    '10:30 AM',
    '11:15 AM',
    '12:00 PM',
    '12:45 PM',
    '05:45 PM',
    '06:30 PM',
    '07:15 PM',
    '08:00 PM',
    '08:30 PM',
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim() || formData.first_name.trim().length < 2) {
      newErrors.first_name = 'Please provide your first name (min 2 characters).';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Please provide your last name.';
    }

    const phoneClean = formData.phone.replace(/\D/g, '');
    if (!phoneClean || phoneClean.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit mobile number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.appointment_date) {
      newErrors.appointment_date = 'Please select a preferred date.';
    } else {
      const selected = new Date(formData.appointment_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.appointment_date = 'Appointment date cannot be in the past.';
      }
    }

    if (!formData.appointment_time) {
      newErrors.appointment_time = 'Please pick a preferred consultation time.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitAppointment(formData);
      if (res.success && res.data) {
        onSuccess(res.data);
      } else {
        setSubmitError(res.error || 'Unable to schedule appointment. Please try again or reach our Panvel desk.');
      }
    } catch (err: any) {
      setSubmitError(err?.message || 'A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointment-booking" className="py-24 bg-[#0B0D11] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-mono text-[#C5A059]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Direct Clinic Reservation</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
              Request Your Consultation.{' '}
              <span className="block font-medium luxury-gradient-text mt-1">
                Precision Care Awaits.
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Book your comprehensive diagnostic visit with <strong className="font-normal text-white">{clinicConfig.name}</strong>. Our front-desk coordinators in Panvel will review your preferred time and confirm your reservation via WhatsApp and phone call.
            </p>

            {/* Three Patient Assurances */}
            <div className="p-6 rounded-3xl bg-[#121620] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#C5A059]/15 flex items-center justify-center text-[#E6C875] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white uppercase tracking-wider">
                    Zero-Wait Scheduling
                  </p>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    We stagger appointments carefully to ensure ample chair time and zero crowded waiting rooms.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 border-t border-white/5 pt-4">
                <div className="w-8 h-8 rounded-lg bg-[#C5A059]/15 flex items-center justify-center text-[#E6C875] shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white uppercase tracking-wider">
                    Senior Clinical Attention
                  </p>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Your preliminary consultation includes intraoral assessment and digital diagnosis directly with experienced doctors.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 border-t border-white/5 pt-4">
                <div className="w-8 h-8 rounded-lg bg-[#C5A059]/15 flex items-center justify-center text-[#E6C875] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white uppercase tracking-wider">
                    Immediate Phone Support
                  </p>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Need urgent emergency assistance today? Call <a href={`tel:${clinicConfig.phoneRaw}`} className="text-[#C5A059] underline">{clinicConfig.phone}</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-gradient-to-b from-[#141824] to-[#0E1118] border border-[#C5A059]/30 p-8 sm:p-10 shadow-2xl relative">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Form Header */}
                <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                    Patient Consultation Form
                  </h3>
                  <span className="text-[11px] font-mono text-[#C5A059]">
                    Panvel Clinic
                  </span>
                </div>

                {submitError && (
                  <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 flex items-start space-x-3 text-red-200 text-xs">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Submission Notice</p>
                      <p className="font-light mt-0.5">{submitError}</p>
                    </div>
                  </div>
                )}

                {/* First & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="first_name" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        required
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        placeholder="e.g. Aniket"
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                          errors.first_name ? 'border-red-500' : 'border-white/10'
                        } text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-colors`}
                      />
                    </div>
                    {errors.first_name && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.first_name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="last_name" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      placeholder="e.g. Shinde"
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.last_name ? 'border-red-500' : 'border-white/10'
                      } text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-colors`}
                    />
                    {errors.last_name && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.last_name}</p>
                    )}
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
                      Phone Number (WhatsApp) *
                    </label>
                    <div className="relative">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98200 00000"
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                          errors.phone ? 'border-red-500' : 'border-white/10'
                        } text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-colors`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="patient@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.email ? 'border-red-500' : 'border-white/10'
                      } text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-colors`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Service & Preferred Doctor */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="service" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
                      Desired Treatment *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#121620] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                    >
                      {clinicConfig.services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="General Consultation & Checkup">
                        General Dental Checkup & Diagnostics
                      </option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="doctor" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
                      Attending Clinician
                    </label>
                    <select
                      id="doctor"
                      name="doctor"
                      value={formData.doctor}
                      onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#121620] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                    >
                      {clinicConfig.doctors.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name} ({d.specialty.split('&')[0].trim()})
                        </option>
                      ))}
                      <option value="First Available Senior Clinician">
                        First Available Specialist
                      </option>
                    </select>
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="appointment_date" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      id="appointment_date"
                      name="appointment_date"
                      type="date"
                      min={tomorrow}
                      value={formData.appointment_date}
                      onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-[#121620] border ${
                        errors.appointment_date ? 'border-red-500' : 'border-white/10'
                      } text-white text-sm focus:outline-none focus:border-[#C5A059] transition-colors`}
                    />
                    {errors.appointment_date && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.appointment_date}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="appointment_time" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
                      Preferred Time Slot *
                    </label>
                    <select
                      id="appointment_time"
                      name="appointment_time"
                      value={formData.appointment_time}
                      onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#121620] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Clinical Notes */}
                <div>
                  <label htmlFor="message" className="block text-xs uppercase font-mono tracking-wider text-slate-300 mb-2">
                    Symptoms or Dental History (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe any toothache, prior treatments, or specific concerns..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#C5A059] transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    id="submit-appointment-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#A88438] text-[#0B0D11] text-xs font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all shadow-xl shadow-[#C5A059]/15 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-[#0B0D11] border-t-transparent rounded-full animate-spin" />
                        <span>Reserving Slot in Supabase...</span>
                      </div>
                    ) : (
                      <>
                        <span>Confirm Consultation Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-3 font-light">
                    🔒 Strictly confidential medical data. Stored securely with Row Level Security.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
