/**
 * Supabase Client Integration
 *
 * Tamhankar Dental Clinic
 *
 * Important:
 * - Uses public/anon key only in browser
 * - NEVER uses service-role key here
 * - Supports VITE_SUPABASE_* variables
 * - Supports NEXT_PUBLIC_SUPABASE_* as fallback
 * - Uses real Supabase authentication
 * - Doctor access requires profiles.role = 'doctor'
 */

import {
  createClient,
  type SupabaseClient,
} from '@supabase/supabase-js';

import type {
  Appointment,
  AppointmentInsert,
  AppointmentStatus,
} from '../types/database';

const getEnvVar = (key: string): string => {
  try {
    if (
      typeof import.meta !== 'undefined' &&
      import.meta.env &&
      import.meta.env[key]
    ) {
      return String(import.meta.env[key]);
    }
  } catch {
    // Ignore
  }
  return '';
};

const supabaseUrl = (
  getEnvVar('VITE_SUPABASE_URL') ||
  getEnvVar('NEXT_PUBLIC_SUPABASE_URL') ||
  ''
).trim();

const supabaseAnonKey = (
  getEnvVar('VITE_SUPABASE_ANON_KEY') ||
  getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY') ||
  ''
).trim();

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
      supabaseAnonKey &&
      (supabaseUrl.startsWith('http://') || supabaseUrl.startsWith('https://')) &&
      supabaseAnonKey.length > 20 &&
      !supabaseUrl.includes('your-project')
  );
};

export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

const LOCAL_STORAGE_APPOINTMENTS_KEY = 'tamhankar_appointments_demo_store';

const INITIAL_PREVIEW_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-7821',
    first_name: 'Rajesh',
    last_name: 'Patil',
    phone: '+91 98201 45678',
    email: 'rajesh.patil@example.com',
    service: 'Single-Sitting Root Canal',
    doctor: 'Specialist Endodontic Associate',
    appointment_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    appointment_time: '11:00 AM',
    message: 'Persistent lower molar sensitivity to cold water since 3 days.',
    status: 'pending',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'apt-7822',
    first_name: 'Pooja',
    last_name: 'Deshmukh',
    phone: '+91 98192 33445',
    email: 'pooja.deshmukh@example.com',
    service: 'Orthodontics & Clear Aligners',
    doctor: 'Consultant Orthodontist',
    appointment_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    appointment_time: '06:30 PM',
    message: 'Consultation for transparent aligners for front crowding.',
    status: 'confirmed',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'apt-7823',
    first_name: 'Suresh',
    last_name: 'Kulkarni',
    phone: '+91 98334 98765',
    email: 'suresh.kulkarni@example.com',
    service: 'Dental Implants',
    doctor: 'Dr. Tamhankar',
    appointment_date: new Date().toISOString().split('T')[0],
    appointment_time: '05:30 PM',
    message: 'Second stage implant review and abutment check.',
    status: 'confirmed',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

function getLocalAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_APPOINTMENTS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_APPOINTMENTS_KEY, JSON.stringify(INITIAL_PREVIEW_APPOINTMENTS));
      return INITIAL_PREVIEW_APPOINTMENTS;
    }
    return JSON.parse(raw) as Appointment[];
  } catch {
    return INITIAL_PREVIEW_APPOINTMENTS;
  }
}

function saveLocalAppointments(list: Appointment[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_APPOINTMENTS_KEY, JSON.stringify(list));
  } catch {
    // Ignore storage errors
  }
}

export async function submitAppointment(
  data: AppointmentInsert
): Promise<{ success: boolean; data?: Appointment; error?: string }> {
  try {
    if (isSupabaseConfigured()) {
      const payload = {
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim(),
        phone: data.phone.trim(),
        email: data.email.trim().toLowerCase(),
        service: data.service,
        doctor: data.doctor || 'Dr. Tamhankar',
        appointment_date: data.appointment_date,
        appointment_time: data.appointment_time,
        message: data.message?.trim() || '',
        status: 'pending' as AppointmentStatus,
      };

      const { error } = await supabase.from('appointments').insert([payload]);

      if (error) {
        console.error('Supabase appointment insert error:', error);
        return { success: false, error: error.message };
      }

      const createdAppointment: Appointment = {
        id: crypto.randomUUID(),
        first_name: payload.first_name,
        last_name: payload.last_name,
        phone: payload.phone,
        email: payload.email,
        service: payload.service,
        doctor: payload.doctor,
        appointment_date: payload.appointment_date,
        appointment_time: payload.appointment_time,
        message: payload.message,
        status: payload.status,
        created_at: new Date().toISOString(),
      };

      return { success: true, data: createdAppointment };
    }

    const newAppt: Appointment = {
      id: 'apt-' + Math.floor(1000 + Math.random() * 9000),
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      phone: data.phone.trim(),
      email: data.email.trim().toLowerCase(),
      service: data.service,
      doctor: data.doctor || 'Dr. Tamhankar',
      appointment_date: data.appointment_date,
      appointment_time: data.appointment_time,
      message: data.message?.trim() || '',
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    const current = getLocalAppointments();
    saveLocalAppointments([newAppt, ...current]);

    return { success: true, data: newAppt };
  } catch (err: unknown) {
    console.error('Appointment submission error:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to submit appointment. Please try again or call our clinic.',
    };
  }
}

export async function fetchAppointments(): Promise<{ appointments: Appointment[]; error?: string }> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching appointments from Supabase:', error);
        return { appointments: [], error: error.message };
      }

      return { appointments: (data as Appointment[]) || [] };
    }

    return { appointments: getLocalAppointments() };
  } catch (err: unknown) {
    console.error('Fetch appointments error:', err);
    return { appointments: [], error: err instanceof Error ? err.message : 'Failed to retrieve appointments.' };
  }
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.from('appointments').update({ status }).eq('id', id);

      if (error) {
        console.error('Supabase status update error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    }

    const list = getLocalAppointments();
    const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
    saveLocalAppointments(updated);

    return { success: true };
  } catch (err: unknown) {
    console.error('Status update error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Failed to update status.' };
  }
}

export interface DoctorAuthSession {
  user: {
    id: string;
    email: string;
    role: 'doctor';
    name: string;
  };
}

export async function getDoctorSession(): Promise<DoctorAuthSession | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return null;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, role, full_name')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      console.error('Doctor profile lookup failed:', profileError);
      return null;
    }

    if (profile.role !== 'doctor') {
      return null;
    }

    return {
      user: {
        id: user.id,
        email: user.email || '',
        role: 'doctor',
        name: profile.full_name || user.email || 'Doctor',
      },
    };
  } catch (err) {
    console.error('Error verifying doctor session:', err);
    return null;
  }
}

export async function loginDoctor(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; session?: DoctorAuthSession }> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: 'Supabase is not configured. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment.',
    };
  }

  const cleanEmail = email.trim();

  if (!cleanEmail || !password) {
    return { success: false, error: 'Please enter both your doctor email address and password.' };
  }

  try {
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (authError) {
      console.error('Supabase authentication error:', authError);
      return { success: false, error: authError.message };
    }

    if (!data.user) {
      return { success: false, error: 'Authentication failed: No user returned from Supabase.' };
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, role, full_name')
      .eq('id', data.user.id)
      .single();

    if (profileError || !profile) {
      console.error('Doctor profile lookup failed:', profileError);
      await supabase.auth.signOut();
      return {
        success: false,
        error: `Authenticated as ${data.user.email || cleanEmail}, but no clinical profile was found in the database. A doctor profile (role = 'doctor') is required.`,
      };
    }

    if (profile.role !== 'doctor') {
      await supabase.auth.signOut();
      return {
        success: false,
        error: `Access denied. Your account role is "${profile.role}". Doctor portal access requires role = "doctor".`,
      };
    }

    const session: DoctorAuthSession = {
      user: {
        id: data.user.id,
        email: data.user.email || cleanEmail,
        role: 'doctor',
        name: profile.full_name || data.user.email || 'Doctor',
      },
    };

    return { success: true, session };
  } catch (err: unknown) {
    console.error('Doctor authentication error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'An error occurred during authentication.' };
  }
}

export async function logoutDoctor(): Promise<void> {
  if (!isSupabaseConfigured()) {
    return;
  }

  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Supabase sign out error:', error);
  }
}