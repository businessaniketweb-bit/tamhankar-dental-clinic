/**
 * Tamhankar Dental Clinic - Main Application Root
 * Preserves Supabase architecture, authentication, and appointment system.
 * Delivers a premium, modern, luxury 3D animated dental experience.
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { AboutSection } from './components/AboutSection';
import { TreatmentsSection } from './components/TreatmentsSection';
import { TechnologySection } from './components/TechnologySection';
import { DoctorsSection } from './components/DoctorsSection';
import { PatientJourney } from './components/PatientJourney';
import { ReputationSection } from './components/ReputationSection';
import { AppointmentSection } from './components/AppointmentSection';
import { AppointmentSuccess } from './components/AppointmentSuccess';
import { ContactLocationSection } from './components/ContactLocationSection';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Appointment } from './types/database';

export default function App() {
  // Parse initial route from pathname or hash
  const getInitialRoute = (): string => {
    const path = window.location.pathname;
    const hash = window.location.hash.replace('#', '');
    if (path.includes('/admin/login') || hash === '/admin/login') return '/admin/login';
    if (path.includes('/admin') || hash === '/admin') return '/admin';
    if (path.includes('/appointment-success') || hash === '/appointment-success') return '/appointment-success';
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>();
  const [latestAppointment, setLatestAppointment] = useState<Appointment | null>(null);

  // Sync route with browser history
  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Action handlers
  const handleOpenBooking = (serviceTitle?: string, doctorName?: string) => {
    if (serviceTitle) setSelectedService(serviceTitle);
    if (doctorName) setSelectedDoctor(doctorName);

    if (currentRoute !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('appointment-booking');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('appointment-booking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAppointmentSuccess = (appointment: Appointment) => {
    setLatestAppointment(appointment);
    navigate('/appointment-success');
  };

  // Route: /admin/login
  if (currentRoute === '/admin/login') {
    return (
      <AdminLogin
        onLoginSuccess={() => navigate('/admin')}
        onReturnHome={() => navigate('/')}
      />
    );
  }

  // Route: /admin
  if (currentRoute === '/admin') {
    return (
      <AdminDashboard
        onNavigateHome={() => navigate('/')}
        onLoggedOut={() => navigate('/admin/login')}
      />
    );
  }

  // Route: /appointment-success
  if (currentRoute === '/appointment-success') {
    return (
      <AppointmentSuccess
        appointment={latestAppointment}
        onReturnHome={() => navigate('/')}
      />
    );
  }

  // Primary Route: / (Homepage)
  return (
    <div className="min-h-screen bg-[#0B0D11] text-[#E8ECF2] flex flex-col font-sans selection:bg-[#C5A059] selection:text-[#0B0D11]">
      {/* Sticky Architectural Navigation */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigate}
        onOpenBooking={(service) => handleOpenBooking(service)}
      />

      {/* Hero Section with Interactive 3D Dental Experience */}
      <main className="flex-grow">
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreTreatments={() => {
            const el = document.getElementById('treatments');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Clinical Statistics & Sterilization Trust Pillars */}
        <TrustStats />

        {/* About Clinic & Architectural Philosophy */}
        <AboutSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Comprehensive Treatments Grid */}
        <TreatmentsSection
          onSelectTreatment={(title) => handleOpenBooking(title)}
        />

        {/* Verified Digital Technology & Diagnostics */}
        <TechnologySection />

        {/* Clinical Team & Doctors */}
        <DoctorsSection
          onSelectDoctor={(name) => handleOpenBooking(undefined, name)}
        />

        {/* 5-Step Patient Journey */}
        <PatientJourney />

        {/* Reputation & Google Maps Panvel Reference */}
        <ReputationSection />

        {/* Core Appointment Booking Engine (Saves into Supabase) */}
        <AppointmentSection
          preselectedService={selectedService}
          preselectedDoctor={selectedDoctor}
          onSuccess={handleAppointmentSuccess}
        />

        {/* Location, Operating Hours & Patient FAQs */}
        <ContactLocationSection />
      </main>

      {/* Luxury Dark Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
