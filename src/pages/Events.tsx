import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ChevronRight, Filter, Plus, ArrowRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  type: 'workshop' | 'seminar' | 'webinar' | 'conference';
  status: 'upcoming' | 'past';
  capacity: number;
  registered: number;
  image: string;
  organizer: string;
  tags: string[];
}

// Typewriter effect with typing and deleting
function useTypewriterDelete(words: string[], speed = 80, pause = 1200, delSpeed = 40) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');
  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === 'typing') {
      if (displayed.length < words[index].length) {
        timeout = setTimeout(() => setDisplayed(words[index].slice(0, displayed.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pause);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 400);
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), delSpeed);
      } else {
        setIndex((index + 1) % words.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, index, words, speed, pause, delSpeed]);
  return displayed;
}

export const Events = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedType, setSelectedType] = useState<'all' | 'workshop' | 'seminar' | 'webinar' | 'conference'>('all');

  const typewriterText = useTypewriterDelete([
    "Every Drop, Someone's Tomorrow",
    "Born Today. Saving Tomorrow."
  ], 60, 1600, 40);

  return (
    <div className="min-h-screen bg-background-main pt-20">
      {/* Typewriter Header Animation */}
      <div className="w-full bg-background-main py-6 flex justify-center items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-plum min-h-[2.5rem]">
          <span className="inline-block border-r-2 border-pink-primary pr-1 animate-pulse" style={{ minWidth: '1ch' }}>{typewriterText}</span>
        </h2>
      </div>

      <section className="py-16 bg-gradient-to-br from-plum to-plum/90 text-text-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Calendar className="h-16 w-16 mx-auto mb-6 text-pink-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Want to volunteer or collaborate with us?
            </h1>
            <p className="text-xl text-text-light/90 max-w-3xl mx-auto">
              We welcome passionate individuals and organizations to join our mission. If you want to volunteer or collaborate, get in touch!
            </p>
          </motion.div>
          <div className="flex justify-center mt-8">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jainjevesh@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-pink-primary text-text-light font-semibold rounded-2xl hover:bg-pink-hover hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center bg-background-card rounded-xl p-1">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'upcoming'
                    ? 'bg-pink-primary text-text-light'
                    : 'text-text-body hover:text-plum'
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'past'
                    ? 'bg-pink-primary text-text-light'
                    : 'text-text-body hover:text-plum'
                }`}
              >
                Past Events
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-text-body" />
                <span className="text-sm font-medium text-plum">Filter by:</span>
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="px-4 py-2 bg-background-card border border-pink-soft/20 rounded-xl text-plum focus:outline-none focus:ring-2 focus:ring-pink-primary/20"
              >
                <option value="all">All Types</option>
                <option value="workshop">Workshops</option>
                <option value="seminar">Seminars</option>
                <option value="webinar">Webinars</option>
                <option value="conference">Conferences</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-full flex flex-col items-center justify-center py-24">
              <Calendar className="h-16 w-16 mb-4 text-pink-soft" />
              <h3 className="text-2xl font-semibold text-plum mb-2">Events coming soon!</h3>
              <p className="text-text-body max-w-md">
                Stay tuned for upcoming workshops, webinars, and community events to learn, connect, and make a difference in cord blood awareness.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};