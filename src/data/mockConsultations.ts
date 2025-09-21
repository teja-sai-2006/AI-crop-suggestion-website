/**
 * Mock Consultations Data
 * Frontend-first implementation for KM farming assistant
 */

import { ConsultationBooking } from '../types/expertConsultation.types';

export const mockConsultations: ConsultationBooking[] = [
  {
    id: 'consultation_001',
    expertId: 'expert_001',
    expertName: 'Dr. Rajesh Kumar',
    expertSpecialization: ['Crop Disease Management', 'Pest Control', 'Organic Farming'],
    userId: 'user_001',
    userName: 'Ramesh Patel',
    userContact: '+91-9876543210',
    topic: 'Tomato Leaf Curl Disease',
    description: 'My tomato plants are showing yellow leaves with curling. Need urgent advice on treatment and prevention.',
    scheduledDate: '2024-01-20',
    scheduledTime: '10:00-11:00',
    duration: 60,
    consultationMethod: 'video',
    status: 'completed',
    fee: 500,
    paymentStatus: 'paid',
    meetingLink: 'https://meet.krishimitra.com/consultation_001',
    notes: 'Bring photos of affected plants',
    expertNotes: 'Recommended immediate spray with neem oil and soil treatment. Follow-up in 1 week.',
    rating: 5,
    review: 'Excellent advice! My tomato plants recovered completely. Dr. Kumar is very knowledgeable.',
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-20T11:00:00.000Z'
  },
  {
    id: 'consultation_002',
    expertId: 'expert_002',
    expertName: 'Dr. Priya Sharma',
    expertSpecialization: ['Soil Health', 'Fertilizer Management', 'Crop Nutrition'],
    userId: 'user_001',
    userName: 'Ramesh Patel',
    userContact: '+91-9876543210',
    topic: 'Soil pH Management',
    description: 'Need guidance on correcting soil pH for better crop yield. Soil test shows pH 8.2.',
    scheduledDate: '2024-01-25',
    scheduledTime: '09:00-10:00',
    duration: 60,
    consultationMethod: 'video',
    status: 'confirmed',
    fee: 600,
    paymentStatus: 'paid',
    meetingLink: 'https://meet.krishimitra.com/consultation_002',
    notes: 'Bring soil test report',
    createdAt: '2024-01-22T14:30:00.000Z',
    updatedAt: '2024-01-22T14:30:00.000Z'
  },
  {
    id: 'consultation_003',
    expertId: 'expert_003',
    expertName: 'Ravi Patel',
    expertSpecialization: ['Water Management', 'Drip Irrigation', 'Water Conservation'],
    userId: 'user_002',
    userName: 'Sunita Devi',
    userContact: '+91-9765432109',
    topic: 'Drip Irrigation Setup',
    description: 'Planning to install drip irrigation system for 5-acre cotton farm. Need cost estimation and technical guidance.',
    scheduledDate: '2024-01-18',
    scheduledTime: '15:00-16:00',
    duration: 60,
    consultationMethod: 'chat',
    status: 'completed',
    fee: 400,
    paymentStatus: 'paid',
    expertNotes: 'Provided detailed layout design and component list. Estimated cost: ₹80,000 for complete setup.',
    rating: 4,
    review: 'Very helpful consultation. Got clear understanding of irrigation system requirements.',
    createdAt: '2024-01-16T09:15:00.000Z',
    updatedAt: '2024-01-18T16:00:00.000Z'
  },
  {
    id: 'consultation_004',
    expertId: 'expert_004',
    expertName: 'Dr. Kavitha Nair',
    expertSpecialization: ['Fruit Farming', 'Vegetable Cultivation', 'Post-Harvest Management'],
    userId: 'user_003',
    userName: 'Kumar Swamy',
    userContact: '+91-9654321098',
    topic: 'Mango Orchard Management',
    description: 'Need advice on pruning techniques and fertilizer schedule for 10-year-old mango trees.',
    scheduledDate: '2024-01-28',
    scheduledTime: '11:00-12:00',
    duration: 60,
    consultationMethod: 'video',
    status: 'pending',
    fee: 550,
    paymentStatus: 'pending',
    notes: 'First-time consultation, orchard visit might be needed',
    createdAt: '2024-01-24T16:20:00.000Z',
    updatedAt: '2024-01-24T16:20:00.000Z'
  },
  {
    id: 'consultation_005',
    expertId: 'expert_005',
    expertName: 'Suresh Reddy',
    expertSpecialization: ['Cotton Cultivation', 'Integrated Pest Management', 'Bt Cotton'],
    userId: 'user_002',
    userName: 'Sunita Devi',
    userContact: '+91-9765432109',
    topic: 'Cotton Pest Management',
    description: 'Bollworm infestation in Bt cotton. Previous pesticides not effective. Need alternative solution.',
    scheduledDate: '2024-01-30',
    scheduledTime: '10:00-11:00',
    duration: 60,
    consultationMethod: 'in_person',
    status: 'confirmed',
    fee: 450,
    paymentStatus: 'paid',
    notes: 'Field visit required for proper assessment',
    createdAt: '2024-01-26T11:45:00.000Z',
    updatedAt: '2024-01-26T11:45:00.000Z'
  },
  {
    id: 'consultation_006',
    expertId: 'expert_001',
    expertName: 'Dr. Rajesh Kumar',
    expertSpecialization: ['Crop Disease Management', 'Pest Control', 'Organic Farming'],
    userId: 'user_004',
    userName: 'Lakshmi Naidu',
    userContact: '+91-9543210987',
    topic: 'Organic Farming Transition',
    description: 'Want to convert conventional rice farming to organic methods. Need complete guidance on transition process.',
    scheduledDate: '2024-02-02',
    scheduledTime: '14:00-15:00',
    duration: 60,
    consultationMethod: 'audio',
    status: 'confirmed',
    fee: 500,
    paymentStatus: 'paid',
    notes: 'Discuss 3-year transition plan',
    createdAt: '2024-01-28T13:10:00.000Z',
    updatedAt: '2024-01-28T13:10:00.000Z'
  },
  {
    id: 'consultation_007',
    expertId: 'expert_006',
    expertName: 'Dr. Meera Singh',
    expertSpecialization: ['Sustainable Farming', 'Climate Adaptation', 'Agroecology'],
    userId: 'user_005',
    userName: 'Harpal Singh',
    userContact: '+91-9432109876',
    topic: 'Climate Resilient Crops',
    description: 'Looking for crop varieties that can withstand climate change effects like irregular rainfall and temperature fluctuations.',
    scheduledDate: '2024-01-22',
    scheduledTime: '16:00-17:00',
    duration: 60,
    consultationMethod: 'video',
    status: 'cancelled',
    fee: 700,
    paymentStatus: 'refunded',
    notes: 'Cancelled due to expert unavailability, rescheduling requested',
    createdAt: '2024-01-19T08:30:00.000Z',
    updatedAt: '2024-01-21T14:00:00.000Z'
  },
  {
    id: 'consultation_008',
    expertId: 'expert_003',
    expertName: 'Ravi Patel',
    expertSpecialization: ['Water Management', 'Drip Irrigation', 'Water Conservation'],
    userId: 'user_006',
    userName: 'Pradeep Kumar',
    userContact: '+91-9321098765',
    topic: 'Water Conservation Techniques',
    description: 'Farm facing water scarcity. Need guidance on water conservation methods and efficient irrigation scheduling.',
    scheduledDate: '2024-02-05',
    scheduledTime: '18:00-19:00',
    duration: 60,
    consultationMethod: 'chat',
    status: 'pending',
    fee: 400,
    paymentStatus: 'pending',
    notes: 'Urgent consultation needed before next irrigation cycle',
    createdAt: '2024-01-30T17:15:00.000Z',
    updatedAt: '2024-01-30T17:15:00.000Z'
  }
];

// Helper data for consultation topics and categories
export const consultationTopics = [
  'Crop Disease Management',
  'Pest Control',
  'Soil Health Assessment',
  'Fertilizer Recommendations',
  'Irrigation Planning',
  'Water Conservation',
  'Organic Farming Transition',
  'Post-Harvest Management',
  'Market Price Guidance',
  'Climate Adaptation',
  'Seed Selection',
  'Equipment Recommendations',
  'Storage Solutions',
  'Crop Insurance Guidance',
  'Sustainable Farming Practices'
];

export const consultationStatuses = [
  { value: 'pending', label: 'Pending', color: 'orange' },
  { value: 'confirmed', label: 'Confirmed', color: 'blue' },
  { value: 'in_progress', label: 'In Progress', color: 'green' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
  { value: 'rescheduled', label: 'Rescheduled', color: 'yellow' }
];

export const paymentStatuses = [
  { value: 'pending', label: 'Payment Pending', color: 'orange' },
  { value: 'paid', label: 'Paid', color: 'green' },
  { value: 'refunded', label: 'Refunded', color: 'gray' }
];

// Helper functions
export const getConsultationById = (id: string): ConsultationBooking | undefined => {
  return mockConsultations.find(consultation => consultation.id === id);
};

export const getConsultationsByExpert = (expertId: string): ConsultationBooking[] => {
  return mockConsultations.filter(consultation => consultation.expertId === expertId);
};

export const getConsultationsByUser = (userId: string): ConsultationBooking[] => {
  return mockConsultations.filter(consultation => consultation.userId === userId);
};

export const getConsultationsByStatus = (status: ConsultationBooking['status']): ConsultationBooking[] => {
  return mockConsultations.filter(consultation => consultation.status === status);
};

export const generateConsultationId = (): string => {
  return `consultation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const generateMeetingLink = (consultationId: string): string => {
  return `https://meet.krishimitra.com/${consultationId}`;
};

// Mock recent consultation topics for analytics
export const recentConsultationTopics = [
  'Crop Disease Management',
  'Irrigation Planning', 
  'Soil Health Assessment',
  'Pest Control',
  'Organic Farming Transition'
];

// Mock expert performance data
export const expertPerformanceData = {
  'expert_001': { avgRating: 4.8, totalConsultations: 45, responseTime: '2 hours' },
  'expert_002': { avgRating: 4.9, totalConsultations: 32, responseTime: '1 hour' },
  'expert_003': { avgRating: 4.6, totalConsultations: 67, responseTime: '3 hours' },
  'expert_004': { avgRating: 4.7, totalConsultations: 28, responseTime: '4 hours' },
  'expert_005': { avgRating: 4.5, totalConsultations: 53, responseTime: '6 hours' },
  'expert_006': { avgRating: 4.9, totalConsultations: 21, responseTime: '2 hours' }
};