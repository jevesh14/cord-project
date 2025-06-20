import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Learn', path: '/learn' },
    { name: 'Cord Banks', path: '/banks' },
    { name: 'Stories', path: '/stories' },
    { name: 'Events', path: '/events' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ta', name: 'தமிழ்' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Heart className="h-8 w-8 text-coral group-hover:scale-110 transition-transform duration-200" fill="currentColor" />
              <div className="absolute inset-0 bg-coral/20 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-navy group-hover:text-coral transition-colors duration-200">
                Sanjeevni Stem
              </h1>
              <p className="text-xs text-navy/70 hidden sm:block">Every Drop Has a Future</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-coral'
                    : 'text-navy hover:text-coral'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral rounded-full"
                  />
                )}
              </Link>
            ))}
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-navy hover:text-coral transition-colors duration-200"
              >
                <span>EN</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="w-full px-4 py-2 text-left text-sm text-navy hover:bg-coral/10 transition-colors duration-200"
                        onClick={() => {
                          // TODO: Connect to language switching functionality
                          setLanguageOpen(false);
                        }}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-navy hover:bg-coral/10 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-coral/10 text-coral'
                      : 'text-navy hover:bg-coral/10 hover:text-coral'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <p className="px-4 py-2 text-xs font-medium text-navy/70 uppercase tracking-wide">
                  Language
                </p>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="block w-full px-4 py-2 text-left text-sm text-navy hover:bg-coral/10 transition-colors duration-200"
                    onClick={() => {
                      // TODO: Connect to language switching functionality
                      setIsOpen(false);
                    }}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};