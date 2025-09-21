/**
 * Expert Consultation Type Definitions
 * Frontend-first implementation for KM farming assistant
 */

export interface Expert {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  experience: number; // years of experience
  rating: number; // 1-5 rating
  reviewCount: number;
  profileImage?: string;
  bio: string;
  languages: string[];
  location: string;
  availability: {
    days: string[]; // ['monday', 'tuesday', etc.]
    timeSlots: string[]; // ['09:00-10:00', '10:00-11:00', etc.]
  };
  consultationFee: number;
  consultationMethods: ('video' | 'audio' | 'chat' | 'in_person')[];
  credentials: string[];
  isVerified: boolean;
  isAvailable: boolean;
  responseTime: string; // "Usually responds within 2 hours"
  createdAt: string;
  updatedAt: string;
}

export interface ConsultationBooking {
  id: string;
  expertId: string;
  expertName: string;
  expertSpecialization: string[];
  userId: string;
  userName: string;
  userContact: string;
  topic: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // in minutes
  consultationMethod: 'video' | 'audio' | 'chat' | 'in_person';
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'rescheduled';
  fee: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  meetingLink?: string;
  notes?: string;
  expertNotes?: string;
  rating?: number;
  review?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConsultationSlot {
  date: string;
  time: string;
  isAvailable: boolean;
  isBooked: boolean;
  consultationId?: string;
}

export interface ExpertAvailability {
  expertId: string;
  date: string;
  availableSlots: ConsultationSlot[];
  unavailableSlots: string[];
  specialAvailability?: {
    isHoliday: boolean;
    customMessage?: string;
  };
}

export interface ConsultationFilter {
  expertId?: string;
  status?: ConsultationBooking['status'];
  startDate?: string;
  endDate?: string;
  consultationMethod?: ConsultationBooking['consultationMethod'];
  specialization?: string;
}

export interface BookingRequest {
  expertId: string;
  topic: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  consultationMethod: 'video' | 'audio' | 'chat' | 'in_person';
  userDetails: {
    name: string;
    contact: string;
    email?: string;
    location?: string;
  };
  cropDetails?: {
    cropType: string;
    problemDescription: string;
    images?: string[];
  };
}

export interface ConsultationHistory {
  bookings: ConsultationBooking[];
  totalConsultations: number;
  completedConsultations: number;
  pendingConsultations: number;
  totalSpent: number;
  favoriteExperts: Expert[];
  recentTopics: string[];
}

export interface ExpertSearchFilter {
  specialization?: string;
  minRating?: number;
  maxFee?: number;
  location?: string;
  language?: string;
  consultationMethod?: ConsultationBooking['consultationMethod'];
  availability?: 'today' | 'this_week' | 'any';
}

export interface ConsultationAnalytics {
  totalBookings: number;
  bookingsByStatus: Record<ConsultationBooking['status'], number>;
  bookingsByMethod: Record<ConsultationBooking['consultationMethod'], number>;
  averageRating: number;
  totalSpent: number;
  mostBookedExperts: Array<{
    expertId: string;
    expertName: string;
    bookingCount: number;
  }>;
  popularTopics: Array<{
    topic: string;
    count: number;
  }>;
  monthlyBookings: Array<{
    month: string;
    count: number;
    spent: number;
  }>;
}