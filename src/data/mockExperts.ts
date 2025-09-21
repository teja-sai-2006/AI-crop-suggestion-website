/**
 * Mock Experts Data
 * Frontend-first implementation for KM farming assistant
 */

import { Expert } from '../types/expertConsultation.types';

export const mockExperts: Expert[] = [
  {
    id: 'expert_001',
    name: 'Dr. Rajesh Kumar',
    title: 'Senior Agricultural Scientist',
    specialization: ['Crop Disease Management', 'Pest Control', 'Organic Farming'],
    experience: 15,
    rating: 4.8,
    reviewCount: 127,
    profileImage: '/experts/rajesh-kumar.jpg',
    bio: 'Dr. Rajesh Kumar is a renowned agricultural scientist with over 15 years of experience in crop disease management and sustainable farming practices. He has helped thousands of farmers improve their crop yields and adopt organic farming methods.',
    languages: ['English', 'Hindi', 'Telugu'],
    location: 'Hyderabad, Telangana',
    availability: {
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      timeSlots: ['09:00-10:00', '10:00-11:00', '14:00-15:00', '15:00-16:00', '16:00-17:00']
    },
    consultationFee: 500,
    consultationMethods: ['video', 'audio', 'chat'],
    credentials: ['PhD in Plant Pathology', 'ICAR-IARI New Delhi', 'Certified Organic Farming Expert'],
    isVerified: true,
    isAvailable: true,
    responseTime: 'Usually responds within 2 hours',
    createdAt: '2023-01-15T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z'
  },
  {
    id: 'expert_002',
    name: 'Dr. Priya Sharma',
    title: 'Soil Science Specialist',
    specialization: ['Soil Health', 'Fertilizer Management', 'Crop Nutrition'],
    experience: 12,
    rating: 4.9,
    reviewCount: 89,
    profileImage: '/experts/priya-sharma.jpg',
    bio: 'Dr. Priya Sharma specializes in soil science and has extensive experience in soil health assessment, fertilizer recommendations, and sustainable crop nutrition practices. She has worked with farmers across different agro-climatic zones.',
    languages: ['English', 'Hindi', 'Marathi'],
    location: 'Pune, Maharashtra',
    availability: {
      days: ['monday', 'wednesday', 'friday', 'saturday'],
      timeSlots: ['08:00-09:00', '09:00-10:00', '11:00-12:00', '17:00-18:00']
    },
    consultationFee: 600,
    consultationMethods: ['video', 'chat', 'in_person'],
    credentials: ['PhD in Soil Science', 'ICRISAT Hyderabad', 'Soil Testing Laboratory Certified'],
    isVerified: true,
    isAvailable: true,
    responseTime: 'Usually responds within 1 hour',
    createdAt: '2023-02-20T00:00:00.000Z',
    updatedAt: '2024-01-20T00:00:00.000Z'
  },
  {
    id: 'expert_003',
    name: 'Ravi Patel',
    title: 'Irrigation Expert',
    specialization: ['Water Management', 'Drip Irrigation', 'Water Conservation'],
    experience: 10,
    rating: 4.6,
    reviewCount: 156,
    profileImage: '/experts/ravi-patel.jpg',
    bio: 'Ravi Patel is an irrigation specialist with a decade of experience in designing efficient water management systems. He has implemented water-saving irrigation solutions for small and large-scale farmers.',
    languages: ['English', 'Hindi', 'Gujarati'],
    location: 'Ahmedabad, Gujarat',
    availability: {
      days: ['tuesday', 'thursday', 'friday', 'saturday', 'sunday'],
      timeSlots: ['07:00-08:00', '10:00-11:00', '15:00-16:00', '18:00-19:00']
    },
    consultationFee: 400,
    consultationMethods: ['video', 'audio', 'chat', 'in_person'],
    credentials: ['B.Tech Agricultural Engineering', 'Water Management Certificate', 'Drip Irrigation Specialist'],
    isVerified: true,
    isAvailable: true,
    responseTime: 'Usually responds within 3 hours',
    createdAt: '2023-03-10T00:00:00.000Z',
    updatedAt: '2024-01-10T00:00:00.000Z'
  },
  {
    id: 'expert_004',
    name: 'Dr. Kavitha Nair',
    title: 'Horticulture Specialist',
    specialization: ['Fruit Farming', 'Vegetable Cultivation', 'Post-Harvest Management'],
    experience: 18,
    rating: 4.7,
    reviewCount: 203,
    profileImage: '/experts/kavitha-nair.jpg',
    bio: 'Dr. Kavitha Nair is a horticulture expert with 18 years of experience in fruit and vegetable cultivation. She specializes in modern cultivation techniques and post-harvest management to reduce losses and improve quality.',
    languages: ['English', 'Hindi', 'Tamil', 'Malayalam'],
    location: 'Bangalore, Karnataka',
    availability: {
      days: ['monday', 'tuesday', 'thursday', 'friday'],
      timeSlots: ['09:00-10:00', '11:00-12:00', '14:00-15:00', '16:00-17:00']
    },
    consultationFee: 550,
    consultationMethods: ['video', 'audio', 'chat'],
    credentials: ['PhD in Horticulture', 'UAS Bangalore', 'Post-Harvest Technology Expert'],
    isVerified: true,
    isAvailable: false, // Currently on leave
    responseTime: 'Usually responds within 4 hours',
    createdAt: '2023-04-05T00:00:00.000Z',
    updatedAt: '2024-01-05T00:00:00.000Z'
  },
  {
    id: 'expert_005',
    name: 'Suresh Reddy',
    title: 'Cotton Farming Expert',
    specialization: ['Cotton Cultivation', 'Integrated Pest Management', 'Bt Cotton'],
    experience: 14,
    rating: 4.5,
    reviewCount: 178,
    profileImage: '/experts/suresh-reddy.jpg',
    bio: 'Suresh Reddy is a cotton farming specialist with 14 years of hands-on experience. He has helped farmers transition to Bt cotton and implement integrated pest management practices for sustainable cotton production.',
    languages: ['English', 'Telugu', 'Kannada'],
    location: 'Warangal, Telangana',
    availability: {
      days: ['monday', 'wednesday', 'friday', 'saturday'],
      timeSlots: ['08:00-09:00', '10:00-11:00', '15:00-16:00', '17:00-18:00']
    },
    consultationFee: 450,
    consultationMethods: ['video', 'audio', 'chat', 'in_person'],
    credentials: ['M.Sc Agriculture', 'Cotton Research Station', 'IPM Certified Expert'],
    isVerified: true,
    isAvailable: true,
    responseTime: 'Usually responds within 6 hours',
    createdAt: '2023-05-15T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z'
  },
  {
    id: 'expert_006',
    name: 'Dr. Meera Singh',
    title: 'Sustainable Agriculture Consultant',
    specialization: ['Sustainable Farming', 'Climate Adaptation', 'Agroecology'],
    experience: 20,
    rating: 4.9,
    reviewCount: 95,
    profileImage: '/experts/meera-singh.jpg',
    bio: 'Dr. Meera Singh is a leading expert in sustainable agriculture with 20 years of research and field experience. She focuses on climate-resilient farming practices and helping farmers adapt to changing environmental conditions.',
    languages: ['English', 'Hindi', 'Punjabi'],
    location: 'Ludhiana, Punjab',
    availability: {
      days: ['tuesday', 'thursday', 'saturday'],
      timeSlots: ['10:00-11:00', '14:00-15:00', '16:00-17:00']
    },
    consultationFee: 700,
    consultationMethods: ['video', 'chat'],
    credentials: ['PhD in Sustainable Agriculture', 'PAU Ludhiana', 'Climate Change Adaptation Expert'],
    isVerified: true,
    isAvailable: true,
    responseTime: 'Usually responds within 2 hours',
    createdAt: '2023-06-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  }
];

// Helper data for expert categories and specializations
export const expertSpecializations = [
  'Crop Disease Management',
  'Pest Control',
  'Organic Farming',
  'Soil Health',
  'Fertilizer Management',
  'Crop Nutrition',
  'Water Management',
  'Drip Irrigation',
  'Water Conservation',
  'Fruit Farming',
  'Vegetable Cultivation',
  'Post-Harvest Management',
  'Cotton Cultivation',
  'Integrated Pest Management',
  'Bt Cotton',
  'Sustainable Farming',
  'Climate Adaptation',
  'Agroecology'
];

export const consultationMethods = [
  { value: 'video', label: 'Video Call', icon: 'video' },
  { value: 'audio', label: 'Audio Call', icon: 'phone' },
  { value: 'chat', label: 'Text Chat', icon: 'message-circle' },
  { value: 'in_person', label: 'In Person', icon: 'map-pin' }
];

export const timeSlots = [
  '07:00-08:00',
  '08:00-09:00',
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
  '18:00-19:00',
  '19:00-20:00'
];

// Helper function to get expert by ID
export const getExpertById = (id: string): Expert | undefined => {
  return mockExperts.find(expert => expert.id === id);
};

// Helper function to get experts by specialization
export const getExpertsBySpecialization = (specialization: string): Expert[] => {
  return mockExperts.filter(expert => 
    expert.specialization.some(spec => 
      spec.toLowerCase().includes(specialization.toLowerCase())
    )
  );
};

// Helper function to get available experts
export const getAvailableExperts = (): Expert[] => {
  return mockExperts.filter(expert => expert.isAvailable);
};

// Helper function to generate expert availability for a date
export const generateExpertAvailability = (expertId: string, date: string) => {
  const expert = getExpertById(expertId);
  if (!expert) return null;

  const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const isAvailableDay = expert.availability.days.includes(dayOfWeek);

  if (!isAvailableDay) {
    return {
      expertId,
      date,
      availableSlots: [],
      unavailableSlots: expert.availability.timeSlots,
      specialAvailability: {
        isHoliday: true,
        customMessage: 'Expert is not available on this day'
      }
    };
  }

  // Simulate some random bookings
  const bookedSlots = expert.availability.timeSlots.filter(() => Math.random() > 0.7);
  
  const availableSlots = expert.availability.timeSlots.map(time => ({
    date,
    time,
    isAvailable: !bookedSlots.includes(time),
    isBooked: bookedSlots.includes(time)
  }));

  return {
    expertId,
    date,
    availableSlots,
    unavailableSlots: bookedSlots
  };
};