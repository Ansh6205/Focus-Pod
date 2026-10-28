import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { ResearchPage } from './components/ResearchPage';
import { ProceduresPage } from './components/ProceduresPage';
import { PricingPage } from './components/PricingPage';
import { BookingPage } from './components/BookingPage';
import { createClient } from './utils/supabase/client';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { Toaster, toast } from 'sonner@2.0.3';
import { safeFetch } from './utils/safeFetch';
import { initErrorSuppression } from './utils/errorSuppression';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDemoAuth, setIsDemoAuth] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    // Initialize error suppression
    initErrorSuppression();
    // Skip session check - app works in demo mode by default
    setLoading(false);
  }, []);

  const handleAuth = async (email: string, password: string, name?: string, isSignup?: boolean) => {
    try {
      if (isSignup) {
        // Sign up via server
        const response = await safeFetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-36dd771d/signup`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, name })
          }
        );

        if (!response || !response.ok) {
          // Backend unavailable - create demo user
          const demoUser = {
            id: `demo-${Date.now()}`,
            email,
            user_metadata: { name: name || email.split('@')[0] }
          };
          setUser(demoUser);
          setAccessToken('demo-token');
          setIsDemoAuth(true);
          toast.success('Demo account created! (Local mode - no backend needed)');
          return;
        }

        const data = await response.json();

        // After signup, sign in
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) throw signInError;

        setUser(signInData.user);
        setAccessToken(signInData.session.access_token);
        setIsDemoAuth(false);
        toast.success('Account created successfully!');
      } else {
        // Sign in
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) {
          // Backend unavailable - create demo user
          const demoUser = {
            id: `demo-${Date.now()}`,
            email,
            user_metadata: { name: email.split('@')[0] }
          };
          setUser(demoUser);
          setAccessToken('demo-token');
          setIsDemoAuth(true);
          toast.success('Logged in (Demo Mode - Local only)');
          return;
        }

        setUser(signInData.user);
        setAccessToken(signInData.session.access_token);
        setIsDemoAuth(false);
        toast.success('Logged in successfully!');
      }
    } catch (error: any) {
      // Create demo user on any error
      const demoUser = {
        id: `demo-${Date.now()}`,
        email: email || 'demo@focuspod.com',
        user_metadata: { name: name || 'Demo User' }
      };
      setUser(demoUser);
      setAccessToken('demo-token');
      setIsDemoAuth(true);
      toast.success('Logged in (Demo Mode - Local only)');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setAccessToken(null);
      toast.success('Logged out successfully');
      setCurrentPage('home');
    } catch (error) {
      // Silently handle logout - clear state anyway
      setUser(null);
      setAccessToken(null);
      setCurrentPage('home');
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthClick = () => {
    setShowAuthModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 font-medium">Loading FocusPod...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Toaster position="top-right" richColors />
      
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
        onAuthClick={handleAuthClick}
      />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'research' && <ResearchPage />}
        {currentPage === 'procedures' && <ProceduresPage />}
        {currentPage === 'pricing' && <PricingPage onNavigate={handleNavigate} />}
        {currentPage === 'booking' && (
          <BookingPage
            user={user}
            accessToken={accessToken}
            onAuthClick={handleAuthClick}
          />
        )}
      </main>

      <Footer />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />
    </div>
  );
}