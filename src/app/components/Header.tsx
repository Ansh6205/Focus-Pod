import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import logoImage from 'figma:asset/5666512ea0ca615ae6eb1feaadbc1adf8e76dc34.png';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: any;
  onLogout: () => void;
  onAuthClick: () => void;
}

export function Header({ currentPage, onNavigate, user, onLogout, onAuthClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'research', label: 'Research' },
    { id: 'procedures', label: 'Procedures' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'booking', label: 'Book Now' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80 shadow-lg shadow-black/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
          <img 
            src={logoImage} 
            alt="FocusPod Logo" 
            className="h-12 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`transition-colors hover:text-teal-400 font-medium ${ 
                currentPage === item.id ? 'text-teal-400' : 'text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Menu */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                <User className="w-4 h-4 text-teal-400" />
                <span className="text-sm text-gray-300">{user.email}</span>
              </div>
              <Button onClick={onLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={onAuthClick}>Login / Register</Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-black">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 transition-colors hover:text-teal-400 ${
                  currentPage === item.id ? 'text-teal-400' : 'text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-gray-800">
              {user ? (
                <>
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-300">
                    <User className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <Button onClick={onLogout} variant="outline" className="w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button onClick={onAuthClick} className="w-full">
                  Login / Register
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}