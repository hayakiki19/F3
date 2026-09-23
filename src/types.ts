export type Role = 'client' | 'trainer' | 'admin' | 'guest';

export type FitnessGoal = 'Weight Loss' | 'Muscle Gain' | 'Strength' | 'General Fitness' | 'Flexibility';

export interface Trainer {
  id: string;
  name: string;
  photo: string;
  headline: string;
  experience: string;
  certifications: string[];
  specializations: string[];
  goals: FitnessGoal[];
  languages: string[];
  rating: number;
  reviewsCount: number;
  location: string;
  serviceArea: string;
  startingPrice: number;
  gender: 'Male' | 'Female';
  availabilityDays: string;
  availabilityHours: string;
  about: string;
  trainingApproach: string;
  equipmentProvided: string[];
  slots: {
    [dateKey: string]: {
      time: string;
      available: boolean;
      blockedByAdmin?: boolean;
      blockReason?: string;
    }[];
  };
}

export interface TrainerReview {
  id: string;
  trainerId: string;
  clientName: string;
  clientLocation: string;
  rating: number;
  date: string;
  comment: string;
}

export interface TrainingPlan {
  id: string;
  name: string;
  tagline: string;
  sessionsCount: number;
  period: string;
  price: number;
  originalPrice?: number;
  sessionDuration: string;
  features: string[];
  isPopular?: boolean;
}

export interface UserFitnessProfile {
  age: number;
  heightCm: number;
  weightKg: number;
  targetWeightKg: number;
  fitnessLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  primaryGoal: FitnessGoal;
  workoutExperience: string;
  preferredWorkoutTime: string;
  serviceAddress: string;
  dietaryPreferences: string;
  medicalNotes?: string;
  height?: string;
  weight?: string;
  fitnessGoal?: string;
}

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  role: 'client';
  signedUpDate?: string;
  status?: 'active' | 'trial' | 'expired' | 'lead';
  hasActivePlan: boolean;
  activePlan?: {
    planId: string;
    planName: string;
    sessionsTotal: number;
    sessionsUsed: number;
    sessionsRemaining: number;
    startDate: string;
    expiryDate: string;
    assignedTrainerId: string;
    assignedTrainerName: string;
    sessionDuration: string;
    paymentStatus: 'Active' | 'Paid' | 'Pending Renewal';
  };
  fitnessProfile: UserFitnessProfile;
}

export interface SessionBooking {
  id: string;
  clientId: string;
  clientName: string;
  trainerId: string;
  trainerName: string;
  trainerPhoto: string;
  sessionType: 'Trial Session' | 'Personal Training' | 'Consultation';
  date: string;
  timeSlot: string;
  durationMinutes: number;
  location: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'reschedule_pending';
  changeRequest?: {
    preferredDate: string;
    preferredTime: string;
    requestedAt: string;
    status: 'pending' | 'approved' | 'rejected';
    note?: string;
    reason?: string;
  };
  notesFromTrainer?: string;
}

export interface ExerciseItem {
  id: string;
  name: string;
  target: string;
  sets: number;
  reps: string;
  rest: string;
  notes: string;
  completed?: boolean;
  image: string;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  category: string;
  assignedBy: string;
  assignedDate: string;
  estimatedMinutes: number;
  exercises: ExerciseItem[];
  isCompleted: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'booking' | 'reminder' | 'trainer' | 'plan' | 'workout';
}

export interface ProductRecommendation {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
}

export interface ConsultationLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferredTime: string;
  fitnessGoal: string;
  location: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'converted' | 'archived';
  assignedTrainerId?: string;
  notes?: string;
}

export interface EquipmentKit {
  id: string;
  kitName: string;
  trainerId: string;
  trainerName: string;
  items: string[];
  status: 'Deployed with Coach' | 'Maintenance' | 'Warehouse Backup';
  lastAuditDate: string;
  serialNumber: string;
}

