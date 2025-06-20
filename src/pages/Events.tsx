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
      case 'workshop': return 'bg-coral/10 text-coral';
      case 'seminar': return 'bg-teal/10 text-teal';
      case 'webinar': return 'bg-lavender/20 text-navy';
      case 'conference': return 'bg-navy/10 text-navy';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAvailabilityStatus = (registered: number, capacity: number) => {
    const percentage = (registered / capacity) * 100;
    if (percentage >= 100) return { text: 'Full', color: 'text-red-600' };
    if (percentage >= 80) return { text: 'Almost Full', color: 'text-orange-600' };
    return { text: 'Available', color: 'text-green-600' };
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
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/90 ${availability.color}`}>
                {availability.text}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-navy mb-3">{event.title}</h3>
          
          <div className="space-y-2 mb-4 text-sm text-navy/70">
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
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-navy/80 mb-4 leading-relaxed">{event.description}</p>
                <div className="mb-4">
                  <p className="text-sm text-navy/60 mb-2">Organized by: <span className="font-medium">{event.organizer}</span></p>
                  <p className="text-sm text-navy/60">Address: {event.address}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-lavender/20 text-navy text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
              className="text-coral hover:text-coral/80 font-medium text-sm flex items-center space-x-1"
            >
              <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
              <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-ivory pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-navy to-navy/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Calendar className="h-16 w-16 mx-auto mb-6 text-coral" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Events & Workshops
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Join our community events, educational workshops, and expert seminars 
              to learn more about cord blood banking and connect with other families.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs and Filters */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-2xl p-1">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-white text-coral shadow-sm'
                    : 'text-navy/60 hover:text-navy'
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === 'past'
                    ? 'bg-white text-coral shadow-sm'
                    : 'text-navy/60 hover:text-navy'
                }`}
              >
                Past Events
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-navy/60" />
                <span className="text-sm font-medium text-navy">Filter by type:</span>
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as typeof selectedType)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral text-sm"
              >
                <option value="all">All Types</option>
                <option value="workshop">Workshops</option>
                <option value="seminar">Seminars</option>
                <option value="webinar">Webinars</option>
                <option value="conference">Conferences</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-navy/60">
            Showing {filteredEvents.length} {activeTab} events
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-navy/30" />
              <h3 className="text-xl font-semibold text-navy mb-2">No events found</h3>
              <p className="text-navy/60">
                {activeTab === 'upcoming' 
                  ? 'Check back soon for upcoming events and workshops.'
                  : 'No past events match your selected filters.'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};