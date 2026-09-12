/**
 * Supabase Database Types & Interfaces
 *
 * Tamhankar Dental Clinic
 */

export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'rescheduled'
  | 'cancelled'
  | 'completed';

export interface Appointment {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  service: string;
  doctor: string;
  appointment_date: string;
  appointment_time: string;
  message?: string;
  status: AppointmentStatus;
  created_at?: string;
}

export type AppointmentInsert = Omit<
  Appointment,
  'id' | 'created_at' | 'status'
> & {
  status?: AppointmentStatus;
};

export type UserRole =
  | 'doctor'
  | 'admin'
  | 'staff';

export interface Profile {
  id: string;
  role: UserRole;
  full_name?: string;
  created_at?: string;
}

export type InquiryStatus =
  | 'new'
  | 'contacted'
  | 'resolved'
  | 'closed';

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: InquiryStatus;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: Appointment;

        Insert: AppointmentInsert;

        Update: Partial<Appointment>;
      };

      profiles: {
        Row: Profile;

        Insert: Partial<Profile> & {
          id: string;
        };

        Update: Partial<Profile>;
      };

      inquiries: {
        Row: Inquiry;

        Insert: Omit<
          Inquiry,
          'id' | 'created_at' | 'status'
        > & {
          status?: InquiryStatus;
        };

        Update: Partial<Inquiry>;
      };
    };
  };
}