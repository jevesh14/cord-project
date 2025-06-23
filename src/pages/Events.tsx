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

export const Events = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedType, setSelectedType] = useState<'all' | 'workshop' | 'seminar' | 'webinar' | 'conference'>('all');
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  // TODO: Connect to real events database
  const events: Event[] = [
    {
      id: '1',
      title: 'Cord Blood Banking: Making the Right Choice',
      description: 'A comprehensive workshop for expectant parents about the benefits, process, and considerations of cord blood banking. Learn from medical experts and hear real family experiences.',
      date: '2024-02-15',
      time: '10:00 AM - 12:00 PM',
      location: 'Apollo Hospital Auditorium',
      address: 'Jubilee Hills, Hyderabad, Telangana',
      type: 'workshop',
      status: 'upcoming',
      capacity: 100,
      registered: 67,
      image: 'https://images.pexels.com/photos/7088526/pexels-photo-7088526.jpeg?auto=compress&cs=tinysrgb&w=400',
      organizer: 'Sanjeevni Stem Foundation',
      tags: ['Education', 'Parents', 'Decision Making']
    },
    {
      id: '2',
      title: 'Stem Cell Therapy: Current Research and Future Prospects',
      description: 'Join leading researchers and clinicians as they discuss the latest developments in stem cell therapy and the role of cord blood in regenerative medicine.',
      date: '2024-02-22',
      time: '2:00 PM - 4:00 PM',
      location: 'Online Webinar',
      address: 'Virtual Event',
      type: 'webinar',
      status: 'upcoming',
      capacity: 500,
      registered: 342,
      image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=400',
      organizer: 'Indian Society of Hematology',
      tags: ['Research', 'Medical Professionals', 'Innovation']
    },
    {
      id: '3',
      title: 'Public vs Private Banking: Panel Discussion',
      description: 'Expert panel discussing the differences between public and private cord blood banking, helping families make informed decisions based on their circumstances.',
      date: '2024-03-05',
      time: '6:00 PM - 8:00 PM',
      location: 'Fortis Hospital Conference Hall',
      address: 'Vasant Kunj, New Delhi',
      type: 'seminar',
      status: 'upcoming',
      capacity: 80,
      registered: 45,
      image: 'https://images.pexels.com/photos/7088440/pexels-photo-7088440.jpeg?auto=compress&cs=tinysrgb&w=400',
      organizer: 'Delhi Medical Association',
      tags: ['Expert Panel', 'Decision Support', 'Banking Options']
    },
    {
      id: '4',
      title: 'National Cord Blood Awareness Conference',
      description: 'Two-day national conference bringing together medical professionals, researchers, families, and cord blood banks to discuss advancements and share experiences.',
      date: '2024-03-20',
      time: '9:00 AM - 5:00 PM',
      location: 'Taj Palace Hotel',
      address: 'Mumbai, Maharashtra',
      type: 'conference',
      status: 'upcoming',
      capacity: 300,
      registered: 189,
      image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=400',
      organizer: 'National Cord Blood Initiative',
      tags: ['National Event', 'Networking', 'Research']
    },
    {
      id: '5',
      title: 'Success Stories: Families Share Their Journey',
      description: 'An evening of inspiration where families who have benefited from cord blood treatments share their stories and experiences with the community.',
      date: '2024-01-20',
      time: '7:00 PM - 9:00 PM',
      location: 'Community Center Auditorium',
      address: 'Koramangala, Bangalore, Karnataka',
      type: 'workshop',
      status: 'past',
      capacity: 120,
      registered: 120,
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
      organizer: 'Bangalore Cord Blood Support Group',
      tags: ['Success Stories', 'Community', 'Inspiration']
    },
    {
      id: '6',
      title: 'Healthcare Professional Training Program',
      description: 'Intensive training program for healthcare professionals on cord blood collection procedures, storage protocols, and patient counseling.',
      date: '2024-01-10',
      time: '9:00 AM - 5:00 PM',
      location: 'Medical College Campus',
      address: 'Chennai, Tamil Nadu',
      type: 'workshop',
      status: 'past',
      capacity: 50,
      registered: 50,
      image: 'https://images.pexels.com/photos/5452290/pexels-photo-5452290.jpeg?auto=compress&cs=tinysrgb&w=400',
      organizer: 'Association of Cord Blood Banks',
      tags: ['Medical Training', 'Healthcare Professionals', 'Certification']
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesTab = event.status === activeTab;
    const matchesType = selectedType === 'all' || event.type === selectedType;
    return matchesTab && matchesType;
  });

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-pink-primary/10 text-pink-primary';
      case 'seminar': return 'bg-pink-soft/10 text-pink-soft';
      case 'webinar': return 'bg-plum/10 text-plum';
      case 'conference': return 'bg-pink-hover/10 text-pink-hover';
      default: return 'bg-background-alt text-text-body';
    }
  };

  const getAvailabilityStatus = (registered: number, capacity: number) => {
    const percentage = (registered / capacity) * 100;
    if (percentage >= 100) return { text: 'Full', color: 'text-pink-primary' };
    if (percentage >= 80) return { text: 'Almost Full', color: 'text-pink-hover' };
    return { text: 'Available', color: 'text-pink-soft' };
  };

  const EventCard = ({ event }: { event: Event }) => {
    const availability = getAvailabilityStatus(event.registered, event.capacity);
    const isExpanded = expandedEvent === event.id;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-background-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </span>
          </div>
          {event.status === 'upcoming' && (
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-background-card/90 ${availability.color}`}>
                {availability.text}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-plum mb-3">{event.title}</h3>
          
          <div className="space-y-2 mb-4 text-sm text-text-body">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(event.date).toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{event.registered} / {event.capacity} registered</span>
            </div>
          </div>

          <div className="mb-4">
            <p className={`text-text-body ${!isExpanded && 'line-clamp-2'}`}>
              {event.description}
            </p>
            <button
              onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
              className="mt-2 text-pink-primary hover:text-pink-hover flex items-center space-x-1 text-sm font-medium transition-colors duration-200"
            >
              <span>{isExpanded ? 'Show less' : 'Read more'}</span>
              <ChevronRight className={`h-4 w-4 transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-background-alt rounded-lg text-text-body text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background-main pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-plum to-plum/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Calendar className="h-16 w-16 mx-auto mb-6 text-pink-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-light mb-6">
              Upcoming Events
            </h1>
            <p className="text-xl text-text-light/90 max-w-3xl mx-auto">
              Join our educational events and workshops to learn more about cord blood banking and its benefits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
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
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-pink-soft" />
              <h3 className="text-xl font-semibold text-plum mb-2">
                No {activeTab} events found
              </h3>
              <p className="text-text-body">
                {activeTab === 'upcoming' 
                  ? 'Check back later for new events!'
                  : 'Stay tuned for our next event series.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-plum to-plum/90 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-text-light mb-4">
                Want to Host an Event?
              </h2>
              <p className="text-text-light/90 mb-8">
                Are you a medical professional or organization interested in hosting an educational event about cord blood banking?
              </p>
              <button className="inline-flex items-center space-x-2 px-6 py-3 bg-pink-primary text-text-light rounded-xl hover:bg-pink-hover transition-colors duration-200">
                <span>Get in Touch</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};