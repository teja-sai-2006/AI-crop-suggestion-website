import { Expert, ConsultationBooking } from '../types/expertConsultation.types';
import { mockExperts } from '../data/mockExperts';
import { mockConsultations } from '../data/mockConsultations';

const EXPERTS_STORAGE_KEY = 'km_experts';
const CONSULTATIONS_STORAGE_KEY = 'km_consultations';

// Initialize localStorage with mock data if not exists
const initializeStorage = () => {
  if (!localStorage.getItem(EXPERTS_STORAGE_KEY)) {
    localStorage.setItem(EXPERTS_STORAGE_KEY, JSON.stringify(mockExperts));
  }
  if (!localStorage.getItem(CONSULTATIONS_STORAGE_KEY)) {
    localStorage.setItem(CONSULTATIONS_STORAGE_KEY, JSON.stringify(mockConsultations));
  }
};

export const expertConsultationAPI = {
  /**
   * Get all available experts with their profiles and availability
   */
  async getExperts(): Promise<Expert[]> {
    // TODO: Replace with real backend API call
    return new Promise((resolve) => {
      setTimeout(() => {
        initializeStorage();
        const expertsData = localStorage.getItem(EXPERTS_STORAGE_KEY);
        const experts: Expert[] = expertsData ? JSON.parse(expertsData) : mockExperts;
        resolve(experts);
      }, 300); // Simulate network delay
    });
  },

  /**
   * Book a consultation with an expert
   * @param expertId - The ID of the expert to book
   * @param consultationTime - The requested consultation time
   * @param userDetails - User details for the booking
   */
  async bookConsultation(
    expertId: string, 
    scheduledDate: string,
    scheduledTime: string,
    userDetails?: {
      name?: string;
      phone?: string;
      location?: string;
      topic?: string;
      description?: string;
    }
  ): Promise<ConsultationBooking> {
    // TODO: Replace with real backend API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          initializeStorage();
          
          // Get current consultations
          const consultationsData = localStorage.getItem(CONSULTATIONS_STORAGE_KEY);
          const consultations: ConsultationBooking[] = consultationsData 
            ? JSON.parse(consultationsData) 
            : [];

          // Get expert details
          const expertsData = localStorage.getItem(EXPERTS_STORAGE_KEY);
          const experts: Expert[] = expertsData ? JSON.parse(expertsData) : mockExperts;
          const expert = experts.find(e => e.id === expertId);

          if (!expert) {
            reject(new Error('Expert not found'));
            return;
          }

          // Create new consultation booking
          const newBooking: ConsultationBooking = {
            id: `consultation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            expertId: expertId,
            expertName: expert.name,
            expertSpecialization: expert.specialization,
            userId: 'current_user', // TODO: Get from auth context
            userName: userDetails?.name || 'Anonymous User',
            userContact: userDetails?.phone || '',
            topic: userDetails?.topic || 'General consultation',
            description: userDetails?.description || 'Farming consultation request',
            scheduledDate: scheduledDate,
            scheduledTime: scheduledTime,
            duration: 60, // Default 60 minutes
            consultationMethod: expert.consultationMethods[0], // Default to first available method
            status: 'pending',
            fee: expert.consultationFee,
            paymentStatus: 'pending',
            notes: `Consultation booked with ${expert.name} for ${expert.specialization.join(', ')}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          // Add to consultations
          consultations.unshift(newBooking); // Add to beginning for recent first

          // Save back to localStorage
          localStorage.setItem(CONSULTATIONS_STORAGE_KEY, JSON.stringify(consultations));

          resolve(newBooking);
        } catch (error) {
          reject(new Error('Failed to book consultation'));
        }
      }, 500); // Simulate network delay
    });
  },

  /**
   * Get consultation history for the current user
   * @param status - Optional filter by booking status
   */
  async getConsultationHistory(status?: ConsultationBooking['status']): Promise<ConsultationBooking[]> {
    // TODO: Replace with real backend API call
    return new Promise((resolve) => {
      setTimeout(() => {
        initializeStorage();
        const consultationsData = localStorage.getItem(CONSULTATIONS_STORAGE_KEY);
        let consultations: ConsultationBooking[] = consultationsData 
          ? JSON.parse(consultationsData) 
          : mockConsultations;

        // Filter by status if provided
        if (status) {
          consultations = consultations.filter(consultation => consultation.status === status);
        }

        // Sort by booking date (most recent first)
        consultations.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        resolve(consultations);
      }, 200); // Simulate network delay
    });
  },

  /**
   * Get specific consultation by ID
   * @param consultationId - The consultation ID
   */
  async getConsultationById(consultationId: string): Promise<ConsultationBooking | null> {
    // TODO: Replace with real backend API call
    return new Promise((resolve) => {
      setTimeout(() => {
        initializeStorage();
        const consultationsData = localStorage.getItem(CONSULTATIONS_STORAGE_KEY);
        const consultations: ConsultationBooking[] = consultationsData 
          ? JSON.parse(consultationsData) 
          : mockConsultations;

        const consultation = consultations.find(c => c.id === consultationId);
        resolve(consultation || null);
      }, 200);
    });
  },

  /**
   * Update consultation status (for expert or admin use)
   * @param consultationId - The consultation ID
   * @param status - New status
   */
  async updateConsultationStatus(
    consultationId: string, 
    status: ConsultationBooking['status']
  ): Promise<ConsultationBooking> {
    // TODO: Replace with real backend API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          initializeStorage();
          const consultationsData = localStorage.getItem(CONSULTATIONS_STORAGE_KEY);
          const consultations: ConsultationBooking[] = consultationsData 
            ? JSON.parse(consultationsData) 
            : [];

          const consultationIndex = consultations.findIndex(c => c.id === consultationId);
          
          if (consultationIndex === -1) {
            reject(new Error('Consultation not found'));
            return;
          }

          // Update status
          consultations[consultationIndex].status = status;
          
          // Update payment status based on booking status
          if (status === 'confirmed') {
            consultations[consultationIndex].paymentStatus = 'paid';
          } else if (status === 'cancelled') {
            consultations[consultationIndex].paymentStatus = 'refunded';
          }

          // Save back to localStorage
          localStorage.setItem(CONSULTATIONS_STORAGE_KEY, JSON.stringify(consultations));

          resolve(consultations[consultationIndex]);
        } catch (error) {
          reject(new Error('Failed to update consultation status'));
        }
      }, 300);
    });
  },

  /**
   * Get experts filtered by specialization
   * @param specialization - The specialization to filter by
   */
  async getExpertsBySpecialization(specialization: string): Promise<Expert[]> {
    // TODO: Replace with real backend API call
    return new Promise((resolve) => {
      setTimeout(() => {
        initializeStorage();
        const expertsData = localStorage.getItem(EXPERTS_STORAGE_KEY);
        const experts: Expert[] = expertsData ? JSON.parse(expertsData) : mockExperts;
        
        const filteredExperts = experts.filter(expert => 
          expert.specialization.some(spec => 
            spec.toLowerCase().includes(specialization.toLowerCase())
          )
        );
        
        resolve(filteredExperts);
      }, 250);
    });
  }
};

export default expertConsultationAPI;