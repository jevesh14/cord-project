import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Links': [
      { name: 'Learn About Cord Blood', path: '/learn' },
      { name: 'Find Cord Banks', path: '/banks' },
      { name: 'Success Stories', path: '/stories' },
    ],
    'Resources': [
      { name: 'Educational Materials', path: '/pamphlets' },
      { name: 'Events & Workshops', path: '/events' },
      { name: 'FAQ', path: '/learn#faq' },
      { name: 'Myths vs Facts', path: '/learn#myths' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-plum-light text-text-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-pink-primary" fill="currentColor" />
              <div>
                <h3 className="text-xl font-bold">Aanchal</h3>
                <p className="text-sm text-text-light/70">The Future Of Healing</p>
              </div>
            </div>
            <p className="text-text-light/80 mb-6 max-w-md">
              Empowering families with knowledge about umbilical cord blood preservation 
              and its life-saving potential. Together, we can build a healthier future 
              for our children.
            </p>
            <div className="space-y-2">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=advikasahney123@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-text-light/80 hover:text-pink-soft transition-colors duration-200"
              >
                <Mail className="h-4 w-4" />
                <span>advikasahney123@gmail.com</span>
              </a>
              <a 
                href="tel:9116083443" 
                className="flex items-center space-x-2 text-text-light/80 hover:text-pink-soft transition-colors duration-200"
              >
                <Phone className="h-4 w-4" />
                <span>9116083443</span>
              </a>
              <div className="flex items-center space-x-2 text-text-light/80">
                <MapPin className="h-4 w-4" />
                <span>Pan India Initiative</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-text-light">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-text-light/80 hover:text-pink-soft transition-colors duration-200 text-sm"
                      style={{ cursor: 'pointer' }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-text-light/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-text-light/60 text-sm">
                © {currentYear} Aanchal. All rights reserved.
              </p>
              <p className="text-text-light/60 text-sm">made by jevesh jain</p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-lg bg-text-light/10 hover:bg-pink-primary hover:scale-110 transition-all duration-200"
                  aria-label={`Follow us on ${social.name}`}
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Connect to actual social media links
                  }}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="py-4 border-t border-text-light/5">
          <p className="text-text-light/50 text-xs text-center">
            This website is for educational purposes only. Please consult with healthcare 
            professionals for medical advice. Cord blood banking decisions should be made 
            after thorough research and consultation with qualified medical practitioners.
          </p>
        </div>
      </div>
    </footer>
  );
};