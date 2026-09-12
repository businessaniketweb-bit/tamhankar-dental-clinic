/**
 * Doctor Admin Dashboard (/admin)
 * Protected clinical management interface.
 * Real-time appointment queries, status updating, patient search,
 * filtering, and secure doctor authorization.
 */

import React, { useState, useEffect } from 'react';
import { clinicConfig } from '../../config/clinicConfig';
import { Appointment, AppointmentStatus } from '../../types/database';
import {
  fetchAppointments,
  updateAppointmentStatus,
  getDoctorSession,
  logoutDoctor,
  DoctorAuthSession,
  isSupabaseConfigured,
  supabase
} from '../../lib/supabaseClient';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Search,
  Filter,
  CheckCircle2,
  Clock4,
  AlertCircle,
  XCircle,
  RotateCcw,
  LogOut,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Home
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateHome: () => void;
  onLoggedOut: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome, onLoggedOut }) => {
  const [session, setSession] = useState<DoctorAuthSession | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check doctor authentication
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      setLoadingSession(true);
      const sess = await getDoctorSession();
      if (!isMounted) return;

      if (!sess) {
        onLoggedOut();
      } else {
        setSession(sess);
      }
      setLoadingSession(false);
    };

    checkAuth();

    // Listen to real Supabase auth state changes (e.g. token expired, signed out from another tab)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        if (isMounted) {
          setSession(null);
          onLoggedOut();
        }
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [onLoggedOut]);

  // Load appointments
  const loadAppointments = async () => {
    setLoadingData(true);
    const { appointments: data, error } = await fetchAppointments();
    if (!error && data) {
      setAppointments(data);
    }
    setLoadingData(false);
  };

  useEffect(() => {
    if (session) {
      loadAppointments();
    }
  }, [session]);

  const handleStatusChange = async (id: string, newStatus: AppointmentStatus) => {
    setUpdatingId(id);
    const res = await updateAppointmentStatus(id, newStatus);
    if (res.success) {
      setAppointments(prev =>
        prev.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt)
      );
      if (selectedAppointment && selectedAppointment.id === id) {
        setSelectedAppointment(prev => prev ? { ...prev, status: newStatus } : null);
      }
      showToast(`Appointment status updated to ${newStatus}`);
    } else {
      showToast(res.error || 'Failed to update status');
    }
    setUpdatingId(null);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogout = async () => {
    await logoutDoctor();
    onLoggedOut();
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch =
      `${apt.first_name} ${apt.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.phone.includes(searchQuery) ||
      apt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalCount = appointments.length;
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayCount = appointments.filter(a => a.appointment_date === todayStr).length;

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-[11px] font-mono uppercase">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Confirmed</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-700/50 text-amber-300 text-[11px] font-mono uppercase">
            <Clock4 className="w-3 h-3 text-amber-400" />
            <span>Pending</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-blue-950/60 border border-blue-700/50 text-blue-300 text-[11px] font-mono uppercase">
            <CheckCircle2 className="w-3 h-3 text-blue-400" />
            <span>Completed</span>
          </span>
        );
      case 'rescheduled':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-700/50 text-purple-300 text-[11px] font-mono uppercase">
            <RotateCcw className="w-3 h-3 text-purple-400" />
            <span>Rescheduled</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-red-950/60 border border-red-700/50 text-red-300 text-[11px] font-mono uppercase">
            <XCircle className="w-3 h-3 text-red-400" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return null;
    }
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-[#0B0D11] flex items-center justify-center">
        <div className="flex items-center space-x-3 text-sm text-[#C5A059] font-mono">
          <div className="w-4 h-4 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
          <span>Verifying Doctor Credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0D11] text-slate-200 antialiased pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#141824] border border-[#C5A059]/40 text-[#E6C875] text-xs font-mono shadow-2xl flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Doctor Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#121620] border border-white/10 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E2532] to-[#12151B] border border-[#C5A059]/40 flex items-center justify-center text-[#E6C875]">
              <ShieldCheck className="w-6 h-6 text-[#C5A059]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-xl sm:text-2xl text-white font-medium">
                  {clinicConfig.name} Portal
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#C5A059]/20 text-[#E6C875] text-[10px] font-mono uppercase tracking-wider">
                  Doctor Authorized
                </span>
              </div>
              <p className="text-xs text-slate-400 font-light mt-1 flex flex-wrap items-center gap-1.5">
                <span>Logged in as:</span>
                <span className="font-mono text-[#E6C875] font-semibold bg-white/5 px-2 py-0.5 rounded border border-white/5">{session?.user.email}</span>
                {session?.user.name && session.user.name !== session.user.email && (
                  <span className="text-slate-300 font-light">({session.user.name})</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="dashboard-refresh-btn"
              type="button"
              onClick={loadAppointments}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
              title="Refresh Appointments"
            >
              <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
            </button>

            <button
              id="dashboard-home-btn"
              type="button"
              onClick={onNavigateHome}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10 text-xs flex items-center space-x-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>

            <button
              id="dashboard-logout-btn"
              type="button"
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-200 transition-colors border border-red-800/40 text-xs flex items-center space-x-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Clinical Overview Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-[#121620] border border-white/5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Total Requests</span>
            <p className="font-serif text-3xl text-white font-normal mt-1">{totalCount}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121620] border border-amber-900/30">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">Pending Review</span>
            <p className="font-serif text-3xl text-amber-300 font-normal mt-1">{pendingCount}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121620] border border-emerald-900/30">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Confirmed Slots</span>
            <p className="font-serif text-3xl text-emerald-300 font-normal mt-1">{confirmedCount}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121620] border border-blue-900/30">
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400">Completed</span>
            <p className="font-serif text-3xl text-blue-300 font-normal mt-1">{completedCount}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121620] border border-[#C5A059]/30 col-span-2 lg:col-span-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#E6C875]">Today&apos;s Schedule</span>
            <p className="font-serif text-3xl text-white font-normal mt-1">{todayCount}</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#121620] border border-white/5">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="admin-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient, phone, service..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider hidden lg:inline">Status:</span>
            {['all', 'pending', 'confirmed', 'completed', 'rescheduled', 'cancelled'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-[#C5A059] text-[#0B0D11] font-bold'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Appointment Records Table */}
        <div className="rounded-3xl bg-[#121620] border border-white/10 overflow-hidden shadow-2xl">
          {loadingData ? (
            <div className="p-12 text-center text-xs text-slate-400 space-y-2">
              <div className="w-6 h-6 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto" />
              <p>Querying Supabase appointments...</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <AlertCircle className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="font-serif text-lg text-white">No Appointment Records Found</p>
              <p className="text-xs">No records matched your search filters or status selection.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0D1016] text-slate-400 font-mono text-[10px] uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4">Patient Name</th>
                    <th className="px-6 py-4">Contact Info</th>
                    <th className="px-6 py-4">Treatment & Doctor</th>
                    <th className="px-6 py-4">Schedule</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredAppointments.map((apt) => (
                    <tr
                      key={apt.id}
                      className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                      onClick={() => setSelectedAppointment(apt)}
                    >
                      <td className="px-6 py-4">
                        <div className="font-serif text-sm text-white font-medium">
                          {apt.first_name} {apt.last_name}
                        </div>
                        <span className="font-mono text-[10px] text-[#C5A059]">
                          #{apt.id}
                        </span>
                      </td>

                      <td className="px-6 py-4 space-y-0.5">
                        <div className="font-mono text-xs text-slate-200 flex items-center space-x-1.5">
                          <Phone className="w-3 h-3 text-[#C5A059]" />
                          <span>{apt.phone}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center space-x-1.5">
                          <Mail className="w-3 h-3 text-slate-500" />
                          <span>{apt.email}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-white font-medium">{apt.service}</div>
                        <div className="text-[11px] text-slate-400">{apt.doctor}</div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-mono text-slate-200 flex items-center space-x-1.5">
                          <Calendar className="w-3 h-3 text-[#C5A059]" />
                          <span>{apt.appointment_date}</span>
                        </div>
                        <div className="font-mono text-[11px] text-slate-400 flex items-center space-x-1.5">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{apt.appointment_time}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {getStatusBadge(apt.status)}
                      </td>

                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end space-x-2">
                          <div className="relative">
  <select
    value={apt.status}
    disabled={updatingId === apt.id}
    onChange={(e) =>
      handleStatusChange(
        apt.id,
        e.target.value as AppointmentStatus
      )
    }
    className="status-select appearance-none px-3 py-1.5 pr-8 rounded-lg bg-[#181C24] border border-white/10 text-xs text-white focus:outline-none focus:border-[#C5A059] cursor-pointer"
  >
    <option value="pending">Pending</option>
    <option value="confirmed">Confirmed</option>
    <option value="completed">Completed</option>
    <option value="cancelled">Cancelled</option>
  </select>

  <ChevronRight
    className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none rotate-90"
  />
</div>

                          <button
                            type="button"
                            onClick={() => setSelectedAppointment(apt)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                            title="View Patient Record"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Patient Record Detail Slide-Over / Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full rounded-3xl bg-[#141824] border border-[#C5A059]/40 p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                  Patient Medical File
                </span>
                <h3 className="font-serif text-2xl text-white font-normal mt-0.5">
                  {selectedAppointment.first_name} {selectedAppointment.last_name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Phone Contact</span>
                <a href={`tel:${selectedAppointment.phone}`} className="text-white hover:text-[#C5A059] font-mono text-sm block">
                  {selectedAppointment.phone}
                </a>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Email Address</span>
                <a href={`mailto:${selectedAppointment.email}`} className="text-white hover:text-[#C5A059] text-xs block truncate">
                  {selectedAppointment.email}
                </a>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Treatment Required</span>
                <span className="text-white font-medium block">{selectedAppointment.service}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Doctor Assigned</span>
                <span className="text-white font-medium block">{selectedAppointment.doctor}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Requested Date</span>
                <span className="text-white font-mono block">{selectedAppointment.appointment_date}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Requested Time</span>
                <span className="text-white font-mono block">{selectedAppointment.appointment_time}</span>
              </div>
            </div>

            {/* Patient Notes */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                Patient Clinical Notes / Symptoms
              </span>
              <p className="text-xs text-slate-200 font-light leading-relaxed">
                {selectedAppointment.message || 'No specific symptoms described by patient.'}
              </p>
            </div>

            {/* Direct Patient Engagement Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`https://wa.me/${selectedAppointment.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                  `Hello ${selectedAppointment.first_name}, this is regarding your appointment request at Tamhankar Dental Clinic for ${selectedAppointment.service} on ${selectedAppointment.appointment_date}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Patient</span>
              </a>

              <a
                href={`tel:${selectedAppointment.phone}`}
                className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>Call Patient</span>
              </a>
            </div>

            {/* Status Selector */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Update Status:</span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedAppointment.id, 'confirmed')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 text-xs"
                >
                  Confirm Slot
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedAppointment.id, 'completed')}
                  className="px-3 py-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 border border-blue-700/50 text-xs"
                >
                  Mark Completed
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedAppointment.id, 'cancelled')}
                  className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-700/50 text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

 
};
