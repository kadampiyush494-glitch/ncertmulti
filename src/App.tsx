import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Chat } from './pages/Chat';
import { Admin } from './pages/Admin';

type Page = 'home' | 'login' | 'chat' | 'admin';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    if (user) {
      if (user.role === 'student') {
        setCurrentPage('chat');
      } else if (user.role === 'admin') {
        setCurrentPage('admin');
      }
    } else {
      setCurrentPage('home');
    }
  }, [user]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
      {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
      {currentPage === 'login' && <Login onNavigate={handleNavigate} />}
      {currentPage === 'chat' && user && <Chat />}
      {currentPage === 'admin' && user && <Admin />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
