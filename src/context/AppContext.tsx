import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  Trainer,
  TrainingPlan,
  ClientUser,
  SessionBooking,
  WorkoutRoutine,
  NotificationItem,
  TrainerReview,
  UserFitnessProfile,
  ConsultationLead,
  EquipmentKit,
} from '../types';
import {
  INITIAL_TRAINERS,
  TRAINING_PLANS,
  DEMO_CLIENT_RAHUL,
  DEMO_CLIENT_ANITA,
  INITIAL_CLIENTS,
  INITIAL_BOOKINGS,
  INITIAL_WORKOUT,
  INITIAL_NOTIFICATIONS,
  INITIAL_REVIEWS,
  INITIAL_CONSULTATION_LEADS,
  INITIAL_EQUIPMENT_KITS,
} from '../data/mockData';

interface AppContextType {
  // User & Role State
  user: ClientUser | null;
  activeRole: Role;
  currentView: 'public' | 'client-app' | 'trainer-dashboard' | 'admin-dashboard';
  setCurrentView: (view: 'public' | 'client-app' | 'trainer-dashboard' | 'admin-dashboard') => void;
  activePublicPage: 'home' | 'trainers' | 'how-it-works' | 'plans' | 'supplements' | 'about';
  setActivePublicPage: (page: 'home' | 'trainers' | 'how-it-works' | 'plans' | 'supplements' | 'about') => void;
  navigateToPage: (page: 'home' | 'trainers' | 'how-it-works' | 'plans' | 'supplements' | 'about') => void;
  activeClientTab: 'dashboard' | 'schedule' | 'plan' | 'workout' | 'progress' | 'profile';
  setActiveClientTab: (tab: 'dashboard' | 'schedule' | 'plan' | 'workout' | 'progress' | 'profile') => void;

  // Domain Data
  clients: ClientUser[];
  trainers: Trainer[];
  plans: TrainingPlan[];
  bookings: SessionBooking[];
  reviews: TrainerReview[];
  workoutRoutine: WorkoutRoutine;
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  consultationLeads: ConsultationLead[];
  equipmentKits: EquipmentKit[];
  trainerEarnings: { thisMonth: number; pendingPayout: number; sessionsCompleted: number };

  // Modals & UI Triggers
  isBookingModalOpen: boolean;
  bookingModalTrainerId: string | null;
  bookingModalSessionType?: string;
  openBookingModal: (trainerId?: string, sessionType?: string) => void;
  closeBookingModal: () => void;

  isCheckoutModalOpen: boolean;
  checkoutSelectedPlan: TrainingPlan | null;
  checkoutTrainerId?: string;
  openCheckoutModal: (plan: TrainingPlan, trainerId?: string) => void;
  closeCheckoutModal: () => void;

  isAuthModalOpen: boolean;
  authModalInitialTab: 'login' | 'signup';
  openAuthModal: (tab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;

  isConsultationModalOpen: boolean;
  openConsultationModal: () => void;
  closeConsultationModal: () => void;

  selectedTrainerForProfile: Trainer | null;
  openTrainerModal: (trainer: Trainer) => void;
  closeTrainerModal: () => void;

  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;

  isTrainerChatOpen: boolean;
  openTrainerChat: () => void;
  closeTrainerChat: () => void;

  isDownloadAppModalOpen: boolean;
  openDownloadAppModal: () => void;
  closeDownloadAppModal: () => void;

  // Business Actions
  loginAsClient: (persona: 'rahul' | 'anita' | 'custom', custom?: Partial<ClientUser>) => void;
  loginAsTrainer: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
  switchRole: (role: Role) => void;
  purchasePlan: (plan: TrainingPlan, trainerId?: string) => void;
  bookSession: (data: {
    trainerId: string;
    date: string;
    timeSlot: string;
    sessionType: 'Trial Session' | 'Personal Training' | 'Consultation';
    location: string;
  }) => { success: boolean; message: string };
  requestTimeChange: (bookingId: string, preferredDate: string, preferredTime: string, note?: string) => void;
  cancelBooking: (bookingId: string) => { success: boolean; message: string; refundedSession: boolean };
  approveTimeChange: (bookingId: string) => void;
  rejectTimeChange: (bookingId: string) => void;
  confirmTimeChange: (bookingId: string) => void;
  declineTimeChange: (bookingId: string) => void;
  completeSessionByTrainer: (bookingId: string, note?: string) => void;
  markExerciseComplete: (exerciseId: string) => void;
  markWholeWorkoutComplete: () => void;
  toggleTrainerSlot: (trainerId: string, date: string, time: string) => void;
  addSessionNote: (bookingId: string, note: string) => void;
  updateFitnessProfile: (profile: Partial<UserFitnessProfile>) => void;
  updateClientProfile: (profile: Partial<UserFitnessProfile>) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Admin Client Actions
  addClientSessions: (clientId: string, count: number) => void;
  assignClientTrainer: (clientId: string, trainerId: string) => void;
  updateClientStatus: (clientId: string, status: 'active' | 'trial' | 'expired' | 'lead') => void;
  upgradeClientPlan: (clientId: string, planId: string) => void;

  // Admin Bookings Actions
  adminUpdateBookingStatus: (bookingId: string, status: SessionBooking['status']) => void;
  adminRescheduleBooking: (bookingId: string, newDate: string, newTimeSlot: string) => void;
  adminReassignTrainer: (bookingId: string, newTrainerId: string) => void;
  adminCreateManualBooking: (booking: Omit<SessionBooking, 'id'>) => void;

  // Admin Trainer Timing / Slot Blackouts
  adminBlockSlot: (trainerId: string, date: string, time: string, reason?: string) => void;
  adminUnblockSlot: (trainerId: string, date: string, time: string) => void;
  adminAddCustomSlot: (trainerId: string, date: string, time: string) => void;
  adminBlockFullDay: (trainerId: string, date: string, reason?: string) => void;

  // Admin Leads & Equipment
  updateLeadStatus: (leadId: string, status: ConsultationLead['status'], assignedTrainerId?: string) => void;
  updateEquipmentStatus: (kitId: string, status: EquipmentKit['status'], trainerId?: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // By default, start with Rahul Verma logged in so the client dashboard is immediately interactive and feature-complete,
  // but allow instant switching to Anita (no active plan) or guest (logged out) or Trainer or Admin!
  const [user, setUser] = useState<ClientUser | null>(DEMO_CLIENT_RAHUL);
  const [activeRole, setActiveRole] = useState<Role>('client');
  const [currentView, setCurrentView] = useState<'public' | 'client-app' | 'trainer-dashboard' | 'admin-dashboard'>('public');
  const [activePublicPage, setActivePublicPage] = useState<'home' | 'trainers' | 'how-it-works' | 'plans' | 'supplements' | 'about'>('home');
  const [activeClientTab, setActiveClientTab] = useState<'dashboard' | 'schedule' | 'plan' | 'workout' | 'progress' | 'profile'>('dashboard');

  const navigateToPage = (page: 'home' | 'trainers' | 'how-it-works' | 'plans' | 'supplements' | 'about') => {
    setCurrentView('public');
    setActivePublicPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [trainers, setTrainers] = useState<Trainer[]>(INITIAL_TRAINERS);
  const [clients, setClients] = useState<ClientUser[]>(INITIAL_CLIENTS);
  const [consultationLeads, setConsultationLeads] = useState<ConsultationLead[]>(INITIAL_CONSULTATION_LEADS);
  const [equipmentKits, setEquipmentKits] = useState<EquipmentKit[]>(INITIAL_EQUIPMENT_KITS);
  const [plans] = useState<TrainingPlan[]>(TRAINING_PLANS);
  const [bookings, setBookings] = useState<SessionBooking[]>(INITIAL_BOOKINGS);
  const [reviews] = useState<TrainerReview[]>(INITIAL_REVIEWS);
  const [workoutRoutine, setWorkoutRoutine] = useState<WorkoutRoutine>(INITIAL_WORKOUT);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalTrainerId, setBookingModalTrainerId] = useState<string | null>(null);
  const [bookingModalSessionType, setBookingModalSessionType] = useState<string | undefined>(undefined);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutSelectedPlan, setCheckoutSelectedPlan] = useState<TrainingPlan | null>(null);
  const [checkoutTrainerId, setCheckoutTrainerId] = useState<string | undefined>(undefined);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialTab, setAuthModalInitialTab] = useState<'login' | 'signup'>('login');

  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedTrainerForProfile, setSelectedTrainerForProfile] = useState<Trainer | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isTrainerChatOpen, setIsTrainerChatOpen] = useState(false);
  const [isDownloadAppModalOpen, setIsDownloadAppModalOpen] = useState(false);

  // Sync view when role switches
  useEffect(() => {
    if (activeRole === 'client' && currentView === 'public' && user) {
      // stay on public or client-app as navigated
    } else if (activeRole === 'trainer') {
      setCurrentView('trainer-dashboard');
    } else if (activeRole === 'admin') {
      setCurrentView('admin-dashboard');
    } else if (activeRole === 'guest') {
      setCurrentView('public');
    }
  }, [activeRole]);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const openBookingModal = (trainerId?: string, sessionType?: string) => {
    setBookingModalTrainerId(trainerId || trainers[0]?.id || null);
    setBookingModalSessionType(sessionType);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingModalTrainerId(null);
    setBookingModalSessionType(undefined);
  };

  const openCheckoutModal = (plan: TrainingPlan, trainerId?: string) => {
    setCheckoutSelectedPlan(plan);
    setCheckoutTrainerId(trainerId || user?.activePlan?.assignedTrainerId || 'trainer-1');
    setIsCheckoutModalOpen(true);
  };

  const closeCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
    setCheckoutSelectedPlan(null);
    setCheckoutTrainerId(undefined);
  };

  const openAuthModal = (tab: 'login' | 'signup' = 'login') => {
    setAuthModalInitialTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openConsultationModal = () => {
    setIsConsultationModalOpen(true);
  };

  const closeConsultationModal = () => {
    setIsConsultationModalOpen(false);
  };

  const openTrainerModal = (trainer: Trainer) => {
    setSelectedTrainerForProfile(trainer);
  };

  const closeTrainerModal = () => {
    setSelectedTrainerForProfile(null);
  };

  const openTrainerChat = () => setIsTrainerChatOpen(true);
  const closeTrainerChat = () => setIsTrainerChatOpen(false);

  const openDownloadAppModal = () => setIsDownloadAppModalOpen(true);
  const closeDownloadAppModal = () => setIsDownloadAppModalOpen(false);

  // Role switching
  const loginAsClient = (persona: 'rahul' | 'anita' | 'custom', custom?: Partial<ClientUser>) => {
    if (persona === 'rahul') {
      setUser(DEMO_CLIENT_RAHUL);
    } else if (persona === 'anita') {
      setUser(DEMO_CLIENT_ANITA);
    } else {
      setUser({
        id: `client-${Date.now()}`,
        name: custom?.name || 'New Member',
        email: custom?.email || 'member@example.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
        phone: '+1 (555) 000-1122',
        role: 'client',
        hasActivePlan: false,
        fitnessProfile: {
          age: 28,
          heightCm: 172,
          weightKg: 70,
          targetWeightKg: 65,
          fitnessLevel: 'Intermediate',
          primaryGoal: 'General Fitness',
          workoutExperience: 'Home workouts with bands',
          preferredWorkoutTime: 'Mornings (7:00 AM)',
          serviceAddress: '100 Fitness Way, Apt 3',
          dietaryPreferences: 'Balanced, high protein',
        },
      });
    }
    setActiveRole('client');
    setCurrentView('client-app');
    setActiveClientTab('dashboard');
    closeAuthModal();
  };

  const loginAsTrainer = () => {
    setActiveRole('trainer');
    setCurrentView('trainer-dashboard');
    closeAuthModal();
  };

  const loginAsAdmin = () => {
    setActiveRole('admin');
    setCurrentView('admin-dashboard');
    closeAuthModal();
  };

  const logout = () => {
    setUser(null);
    setActiveRole('guest');
    setCurrentView('public');
  };

  const switchRole = (newRole: Role) => {
    if (newRole === 'client') {
      if (!user) setUser(DEMO_CLIENT_RAHUL);
      setActiveRole('client');
      setCurrentView('client-app');
    } else if (newRole === 'trainer') {
      setActiveRole('trainer');
      setCurrentView('trainer-dashboard');
    } else if (newRole === 'admin') {
      setActiveRole('admin');
      setCurrentView('admin-dashboard');
    } else {
      logout();
    }
  };

  // Plan purchase
  const purchasePlan = (plan: TrainingPlan, trainerId?: string) => {
    const assignedTrainer = trainers.find((t) => t.id === trainerId) || trainers[0];
    const updatedUser: ClientUser = user
      ? {
          ...user,
          hasActivePlan: true,
          activePlan: {
            planId: plan.id,
            planName: plan.name,
            sessionsTotal: plan.sessionsCount,
            sessionsUsed: 0,
            sessionsRemaining: plan.sessionsCount,
            startDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }),
            assignedTrainerId: assignedTrainer.id,
            assignedTrainerName: assignedTrainer.name,
            sessionDuration: plan.sessionDuration,
            paymentStatus: 'Active',
          },
        }
      : {
          ...DEMO_CLIENT_RAHUL,
          hasActivePlan: true,
          activePlan: {
            planId: plan.id,
            planName: plan.name,
            sessionsTotal: plan.sessionsCount,
            sessionsUsed: 0,
            sessionsRemaining: plan.sessionsCount,
            startDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }),
            assignedTrainerId: assignedTrainer.id,
            assignedTrainerName: assignedTrainer.name,
            sessionDuration: plan.sessionDuration,
            paymentStatus: 'Active',
          },
        };

    setUser(updatedUser);
    setActiveRole('client');
    setCurrentView('client-app');
    setActiveClientTab('plan');
    closeCheckoutModal();

    // Add confirmation notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `${plan.name} Plan Activated!`,
        message: `Your subscription for ${plan.sessionsCount} sessions with ${assignedTrainer.name} is now active. Book your first session!`,
        timestamp: 'Just now',
        read: false,
        type: 'plan',
      },
      ...prev,
    ]);
  };

  // Book a session
  const bookSession = (data: {
    trainerId: string;
    date: string;
    timeSlot: string;
    sessionType: 'Trial Session' | 'Personal Training' | 'Consultation';
    location: string;
  }) => {
    const trainer = trainers.find((t) => t.id === data.trainerId) || trainers[0];

    // Check if user has active plan and deduction is needed
    if (user?.activePlan && user.activePlan.sessionsRemaining <= 0 && data.sessionType === 'Personal Training') {
      return { success: false, message: 'No remaining sessions in your current plan. Please renew or top up.' };
    }

    const newBooking: SessionBooking = {
      id: `book-${Date.now()}`,
      clientId: user?.id || 'client-guest',
      clientName: user?.name || 'Guest Client',
      trainerId: trainer.id,
      trainerName: trainer.name,
      trainerPhoto: trainer.photo,
      sessionType: data.sessionType,
      date: data.date,
      timeSlot: data.timeSlot,
      durationMinutes: 60,
      location: data.location || user?.fitnessProfile?.serviceAddress || 'Client Residence',
      status: 'confirmed',
      notesFromTrainer: `Confirmed ${data.sessionType} at home. Coach will bring all necessary resistance gear.`,
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Deduct session if active plan
    if (user?.activePlan && data.sessionType === 'Personal Training') {
      setUser({
        ...user,
        activePlan: {
          ...user.activePlan,
          sessionsUsed: user.activePlan.sessionsUsed + 1,
          sessionsRemaining: Math.max(0, user.activePlan.sessionsRemaining - 1),
        },
      });
    }

    // Mark slot as booked for that trainer
    setTrainers((prev) =>
      prev.map((t) => {
        if (t.id === trainer.id && t.slots[data.date]) {
          return {
            ...t,
            slots: {
              ...t.slots,
              [data.date]: t.slots[data.date].map((s) => (s.time === data.timeSlot.split(' – ')[0] ? { ...s, available: false } : s)),
            },
          };
        }
        return t;
      })
    );

    // Add notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Session Booked Successfully',
        message: `${data.sessionType} with ${trainer.name} on ${data.date} at ${data.timeSlot} is confirmed.`,
        timestamp: 'Just now',
        read: false,
        type: 'booking',
      },
      ...prev,
    ]);

    closeBookingModal();
    return { success: true, message: 'Session successfully booked!' };
  };

  // Request time change
  const requestTimeChange = (bookingId: string, preferredDate: string, preferredTime: string, note?: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status: 'reschedule_pending',
            changeRequest: {
              preferredDate,
              preferredTime,
              requestedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: 'pending',
              note: note || 'Client requested slot adjustment',
            },
          };
        }
        return b;
      })
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Time Change Request Submitted',
        message: `Your request to reschedule to ${preferredDate} at ${preferredTime} was sent to your trainer for confirmation.`,
        timestamp: 'Just now',
        read: false,
        type: 'reminder',
      },
      ...prev,
    ]);
  };

  // Cancel booking
  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return { success: false, message: 'Booking not found', refundedSession: false };

    // Update status to cancelled
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );

    // Return session balance to client if it was personal training
    let refunded = false;
    if (user?.activePlan && booking.sessionType === 'Personal Training') {
      setUser({
        ...user,
        activePlan: {
          ...user.activePlan,
          sessionsUsed: Math.max(0, user.activePlan.sessionsUsed - 1),
          sessionsRemaining: user.activePlan.sessionsRemaining + 1,
        },
      });
      refunded = true;
    }

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Session Cancelled',
        message: `Your home session for ${booking.date} was cancelled. 1 session credit has been returned to your active plan balance.`,
        timestamp: 'Just now',
        read: false,
        type: 'reminder',
      },
      ...prev,
    ]);

    return {
      success: true,
      message: 'Session cancelled according to policy. 1 session returned to your balance.',
      refundedSession: refunded,
    };
  };

  // Trainer approves time change
  const approveTimeChange = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId && b.changeRequest) {
          return {
            ...b,
            date: b.changeRequest.preferredDate,
            timeSlot: b.changeRequest.preferredTime,
            status: 'confirmed',
            changeRequest: {
              ...b.changeRequest,
              status: 'approved',
            },
          };
        }
        return b;
      })
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Time Change Approved! 🎉',
        message: 'Your trainer has confirmed your new session time slot.',
        timestamp: 'Just now',
        read: false,
        type: 'trainer',
      },
      ...prev,
    ]);
  };

  const rejectTimeChange = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId && b.changeRequest) {
          return {
            ...b,
            status: 'confirmed',
            changeRequest: {
              ...b.changeRequest,
              status: 'rejected',
            },
          };
        }
        return b;
      })
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Reschedule Request Unavailable',
        message: 'The requested slot could not be accommodated. Your original session time remains reserved.',
        timestamp: 'Just now',
        read: false,
        type: 'trainer',
      },
      ...prev,
    ]);
  };

  // Workouts
  const markExerciseComplete = (exerciseId: string) => {
    setWorkoutRoutine((prev) => {
      const updatedExercises = prev.exercises.map((e) =>
        e.id === exerciseId ? { ...e, completed: !e.completed } : e
      );
      const allDone = updatedExercises.every((e) => e.completed);
      return {
        ...prev,
        exercises: updatedExercises,
        isCompleted: allDone,
      };
    });
  };

  const markWholeWorkoutComplete = () => {
    setWorkoutRoutine((prev) => ({
      ...prev,
      isCompleted: true,
      exercises: prev.exercises.map((e) => ({ ...e, completed: true })),
    }));

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Workout Completed! 💪',
        message: 'Chest + Triceps logged successfully. 18th total session completed!',
        timestamp: 'Just now',
        read: false,
        type: 'workout',
      },
      ...prev,
    ]);
  };

  // Trainer availability
  const toggleTrainerSlot = (trainerId: string, date: string, time: string) => {
    setTrainers((prev) =>
      prev.map((t) => {
        if (t.id === trainerId) {
          const currentSlots = t.slots[date] || [];
          const exists = currentSlots.find((s) => s.time === time);
          let newSlots;
          if (exists) {
            newSlots = currentSlots.map((s) => (s.time === time ? { ...s, available: !s.available } : s));
          } else {
            newSlots = [...currentSlots, { time, available: true }];
          }
          return {
            ...t,
            slots: {
              ...t.slots,
              [date]: newSlots,
            },
          };
        }
        return t;
      })
    );
  };

  // Session note
  const addSessionNote = (bookingId: string, note: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, notesFromTrainer: note } : b))
    );
  };

  // Profile update
  const updateFitnessProfile = (profile: Partial<UserFitnessProfile>) => {
    if (!user) return;
    setUser({
      ...user,
      fitnessProfile: {
        ...user.fitnessProfile,
        ...profile,
      },
    });
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const completeSessionByTrainer = (bookingId: string, note?: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status: 'completed' as const,
            notesFromTrainer: note || 'Session completed successfully with solid effort and form.',
          };
        }
        return b;
      })
    );
  };

  const addClientSessions = (clientId: string, count: number) => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.id === clientId) {
          if (!c.activePlan) {
            return {
              ...c,
              hasActivePlan: true,
              status: 'active',
              activePlan: {
                planId: 'plan-starter',
                planName: 'STARTER (Admin Granted)',
                sessionsTotal: count,
                sessionsUsed: 0,
                sessionsRemaining: count,
                startDate: 'September 24, 2026',
                expiryDate: 'October 30, 2026',
                assignedTrainerId: trainers[0].id,
                assignedTrainerName: trainers[0].name,
                sessionDuration: '60 Minutes',
                paymentStatus: 'Paid' as const,
              },
            };
          }
          return {
            ...c,
            hasActivePlan: true,
            status: 'active',
            activePlan: {
              ...c.activePlan,
              sessionsTotal: c.activePlan.sessionsTotal + count,
              sessionsRemaining: c.activePlan.sessionsRemaining + count,
            },
          };
        }
        return c;
      })
    );
    if (user?.id === clientId) {
      setUser((prev) => {
        if (!prev) return null;
        if (!prev.activePlan) {
          return {
            ...prev,
            hasActivePlan: true,
            status: 'active',
            activePlan: {
              planId: 'plan-starter',
              planName: 'STARTER (Admin Granted)',
              sessionsTotal: count,
              sessionsUsed: 0,
              sessionsRemaining: count,
              startDate: 'September 24, 2026',
              expiryDate: 'October 30, 2026',
              assignedTrainerId: trainers[0].id,
              assignedTrainerName: trainers[0].name,
              sessionDuration: '60 Minutes',
              paymentStatus: 'Paid',
            },
          };
        }
        return {
          ...prev,
          hasActivePlan: true,
          status: 'active',
          activePlan: {
            ...prev.activePlan,
            sessionsTotal: prev.activePlan.sessionsTotal + count,
            sessionsRemaining: prev.activePlan.sessionsRemaining + count,
          },
        };
      });
    }
  };

  const assignClientTrainer = (clientId: string, trainerId: string) => {
    const trainer = trainers.find((t) => t.id === trainerId);
    if (!trainer) return;
    setClients((prev) =>
      prev.map((c) => {
        if (c.id === clientId && c.activePlan) {
          return {
            ...c,
            activePlan: {
              ...c.activePlan,
              assignedTrainerId: trainer.id,
              assignedTrainerName: trainer.name,
            },
          };
        }
        return c;
      })
    );
    if (user?.id === clientId && user.activePlan) {
      setUser({
        ...user,
        activePlan: {
          ...user.activePlan,
          assignedTrainerId: trainer.id,
          assignedTrainerName: trainer.name,
        },
      });
    }
  };

  const updateClientStatus = (clientId: string, status: 'active' | 'trial' | 'expired' | 'lead') => {
    setClients((prev) => prev.map((c) => (c.id === clientId ? { ...c, status } : c)));
  };

  const upgradeClientPlan = (clientId: string, planId: string) => {
    const plan = plans.find((p) => p.id === planId) || plans[1];
    setClients((prev) =>
      prev.map((c) => {
        if (c.id === clientId) {
          return {
            ...c,
            hasActivePlan: true,
            status: 'active',
            activePlan: {
              planId: plan.id,
              planName: plan.name,
              sessionsTotal: plan.sessionsCount,
              sessionsUsed: 0,
              sessionsRemaining: plan.sessionsCount,
              startDate: 'September 24, 2026',
              expiryDate: 'October 30, 2026',
              assignedTrainerId: c.activePlan?.assignedTrainerId || trainers[0].id,
              assignedTrainerName: c.activePlan?.assignedTrainerName || trainers[0].name,
              sessionDuration: plan.sessionDuration,
              paymentStatus: 'Active' as const,
            },
          };
        }
        return c;
      })
    );
  };

  const adminUpdateBookingStatus = (bookingId: string, status: SessionBooking['status']) => {
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status } : b)));
  };

  const adminRescheduleBooking = (bookingId: string, newDate: string, newTimeSlot: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              date: newDate,
              timeSlot: newTimeSlot,
              status: 'confirmed' as const,
              changeRequest: undefined,
            }
          : b
      )
    );
  };

  const adminReassignTrainer = (bookingId: string, newTrainerId: string) => {
    const trainer = trainers.find((t) => t.id === newTrainerId);
    if (!trainer) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              trainerId: trainer.id,
              trainerName: trainer.name,
              trainerPhoto: trainer.photo,
            }
          : b
      )
    );
  };

  const adminCreateManualBooking = (bookingData: Omit<SessionBooking, 'id'>) => {
    const newBooking: SessionBooking = {
      ...bookingData,
      id: `book-manual-${Date.now()}`,
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const adminBlockSlot = (trainerId: string, date: string, time: string, reason?: string) => {
    setTrainers((prev) =>
      prev.map((t) => {
        if (t.id !== trainerId) return t;
        const daySlots = t.slots[date] || [];
        const exists = daySlots.some((s) => s.time === time);
        let updatedSlots = [];
        if (exists) {
          updatedSlots = daySlots.map((s) =>
            s.time === time
              ? { ...s, available: false, blockedByAdmin: true, blockReason: reason || 'Admin Blackout' }
              : s
          );
        } else {
          updatedSlots = [
            ...daySlots,
            { time, available: false, blockedByAdmin: true, blockReason: reason || 'Admin Blackout' },
          ];
        }
        return {
          ...t,
          slots: {
            ...t.slots,
            [date]: updatedSlots,
          },
        };
      })
    );
  };

  const adminUnblockSlot = (trainerId: string, date: string, time: string) => {
    setTrainers((prev) =>
      prev.map((t) => {
        if (t.id !== trainerId) return t;
        const daySlots = t.slots[date] || [];
        const updatedSlots = daySlots.map((s) =>
          s.time === time
            ? { ...s, available: true, blockedByAdmin: false, blockReason: undefined }
            : s
        );
        return {
          ...t,
          slots: {
            ...t.slots,
            [date]: updatedSlots,
          },
        };
      })
    );
  };

  const adminAddCustomSlot = (trainerId: string, date: string, time: string) => {
    setTrainers((prev) =>
      prev.map((t) => {
        if (t.id !== trainerId) return t;
        const daySlots = t.slots[date] || [];
        if (daySlots.some((s) => s.time === time)) return t;
        return {
          ...t,
          slots: {
            ...t.slots,
            [date]: [...daySlots, { time, available: true, blockedByAdmin: false }],
          },
        };
      })
    );
  };

  const adminBlockFullDay = (trainerId: string, date: string, reason?: string) => {
    setTrainers((prev) =>
      prev.map((t) => {
        if (t.id !== trainerId) return t;
        const daySlots = t.slots[date] || [
          { time: '06:00 AM', available: true },
          { time: '07:30 AM', available: true },
          { time: '09:00 AM', available: true },
          { time: '05:00 PM', available: true },
          { time: '06:30 PM', available: true },
          { time: '08:00 PM', available: true },
        ];
        const blocked = daySlots.map((s) => ({
          ...s,
          available: false,
          blockedByAdmin: true,
          blockReason: reason || 'Day Blocked by Admin',
        }));
        return {
          ...t,
          slots: {
            ...t.slots,
            [date]: blocked,
          },
        };
      })
    );
  };

  const updateLeadStatus = (leadId: string, status: ConsultationLead['status'], assignedTrainerId?: string) => {
    setConsultationLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, status, assignedTrainerId: assignedTrainerId || l.assignedTrainerId }
          : l
      )
    );
  };

  const updateEquipmentStatus = (kitId: string, status: EquipmentKit['status'], trainerId?: string) => {
    setEquipmentKits((prev) =>
      prev.map((k) =>
        k.id === kitId
          ? { ...k, status, trainerId: trainerId !== undefined ? trainerId : k.trainerId }
          : k
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        activeRole,
        currentView,
        setCurrentView,
        activePublicPage,
        setActivePublicPage,
        navigateToPage,
        activeClientTab,
        setActiveClientTab,
        clients,
        trainers,
        plans,
        bookings,
        reviews,
        workoutRoutine,
        notifications,
        unreadNotificationsCount,
        consultationLeads,
        equipmentKits,
        trainerEarnings: {
          thisMonth: 78500,
          pendingPayout: 18400,
          sessionsCompleted: 35,
        },

        isBookingModalOpen,
        bookingModalTrainerId,
        bookingModalSessionType,
        openBookingModal,
        closeBookingModal,

        isCheckoutModalOpen,
        checkoutSelectedPlan,
        checkoutTrainerId,
        openCheckoutModal,
        closeCheckoutModal,

        isAuthModalOpen,
        authModalInitialTab,
        openAuthModal,
        closeAuthModal,

        isConsultationModalOpen,
        openConsultationModal,
        closeConsultationModal,

        selectedTrainerForProfile,
        openTrainerModal,
        closeTrainerModal,

        isNotificationsOpen,
        setIsNotificationsOpen,

        isTrainerChatOpen,
        openTrainerChat,
        closeTrainerChat,

        isDownloadAppModalOpen,
        openDownloadAppModal,
        closeDownloadAppModal,

        loginAsClient,
        loginAsTrainer,
        loginAsAdmin,
        logout,
        switchRole,
        purchasePlan,
        bookSession,
        requestTimeChange,
        cancelBooking,
        approveTimeChange,
        rejectTimeChange,
        confirmTimeChange: approveTimeChange,
        declineTimeChange: rejectTimeChange,
        completeSessionByTrainer,
        markExerciseComplete,
        markWholeWorkoutComplete,
        toggleTrainerSlot,
        addSessionNote,
        updateFitnessProfile,
        updateClientProfile: updateFitnessProfile,
        markNotificationRead,
        clearAllNotifications,

        // Admin Client Actions
        addClientSessions,
        assignClientTrainer,
        updateClientStatus,
        upgradeClientPlan,

        // Admin Bookings Actions
        adminUpdateBookingStatus,
        adminRescheduleBooking,
        adminReassignTrainer,
        adminCreateManualBooking,

        // Admin Trainer Timing / Slot Blackouts
        adminBlockSlot,
        adminUnblockSlot,
        adminAddCustomSlot,
        adminBlockFullDay,

        // Admin Leads & Equipment
        updateLeadStatus,
        updateEquipmentStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
