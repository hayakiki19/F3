/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GymActivitiesVideoShowcase } from './components/GymActivitiesVideoShowcase';
import { HowItWorks } from './components/HowItWorks';
import { TrainersSection } from './components/TrainersSection';
import { PlansSection } from './components/PlansSection';
import { AboutSection } from './components/AboutSection';
import { ConsultationSection } from './components/ConsultationSection';
import { ProductRecommendations } from './components/ProductRecommendations';
import { Footer } from './components/Footer';
import { TrainerModal } from './components/TrainerModal';
import { BookingModal } from './components/BookingModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { TrainerChatModal } from './components/client/TrainerChatModal';
import { ClientApp } from './components/client/ClientApp';
import { TrainerDashboard } from './components/trainer/TrainerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileAppHomeView } from './components/mobile/MobileAppHomeView';
import { TrainersPage } from './pages/TrainersPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PlansPage } from './pages/PlansPage';
import { SupplementsPage } from './pages/SupplementsPage';
import { AboutPage } from './pages/AboutPage';

const MainLayout: React.FC = () => {
  const { currentView, activePublicPage } = useApp();

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] flex flex-col font-sans selection:bg-[#FF6A00] selection:text-white">
      {/* Universal Top Navigation */}
      <Navbar />

      {/* Dynamic Views */}
      {currentView === 'public' && (
        <div className="flex-1">
          {activePublicPage === 'trainers' && (
            <main className="pb-20 lg:pb-0">
              <TrainersPage />
              <Footer />
            </main>
          )}

          {activePublicPage === 'how-it-works' && (
            <main className="pb-20 lg:pb-0">
              <HowItWorksPage />
              <Footer />
            </main>
          )}

          {activePublicPage === 'plans' && (
            <main className="pb-20 lg:pb-0">
              <PlansPage />
              <Footer />
            </main>
          )}

          {activePublicPage === 'supplements' && (
            <main className="pb-20 lg:pb-0">
              <SupplementsPage />
              <Footer />
            </main>
          )}

          {activePublicPage === 'about' && (
            <main className="pb-20 lg:pb-0">
              <AboutPage />
              <Footer />
            </main>
          )}

          {activePublicPage === 'home' && (
            <main className="flex-1 pb-20 lg:pb-0">
              {/* Unique Native-App Mobile Home Screen for Phones */}
              <div className="lg:hidden">
                <MobileAppHomeView />
              </div>

              {/* Full Web Landing Page for Desktop Viewports */}
              <div className="hidden lg:block">
                <HeroSection />
                <GymActivitiesVideoShowcase />
                <HowItWorks />
                <TrainersSection />
                <PlansSection />
                <AboutSection />
                <ConsultationSection />
                <div id="supplements">
                  <ProductRecommendations />
                </div>
                <Footer />
              </div>
            </main>
          )}
        </div>
      )}

      {currentView === 'client-app' && <ClientApp />}

      {currentView === 'trainer-dashboard' && <TrainerDashboard />}

      {currentView === 'admin-dashboard' && <AdminDashboard />}

      {/* Global Modals & Drawers */}
      <TrainerModal />
      <BookingModal />
      <CheckoutModal />
      <AuthModal />
      <NotificationsDrawer />
      <TrainerChatModal />

      {/* Mobile Ergonomic Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
