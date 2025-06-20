import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Navigation, Phone, Mail, Globe, Filter, Locate } from 'lucide-react';

interface CordBank {
  id: string;
  name: string;
  type: 'public' | 'private';
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  website: string;
  coordinates: { lat: number; lng: number };
  distance?: number;
}

export const Locator = () => {
  const [selectedBank, setSelectedBank] = useState<CordBank | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'public' | 'private'>('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // TODO: Connect to real cord bank database
  const cordBanks: CordBank[] = [
    {
      id: '1',
      name: 'LifeCell International',
      type: 'private',
      address: '123 Medical Center Drive, Anna Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      phone: '+91-44-4567-8900',
      email: 'info@lifecell.in',
      website: 'https://lifecell.in',
      coordinates: { lat: 13.0827, lng: 80.2707 }
    },
    {
      id: '2',
      name: 'Cryoviva Biotech',
      type: 'private',
      address: '456 Cyber City, Sector 24',
      city: 'Gurgaon',
      state: 'Haryana',
      phone: '+91-124-456-7890',
      email: 'contact@cryoviva.com',
      website: 'https://cryoviva.com',
      coordinates: { lat: 28.4595, lng: 77.0266 }
    },
    {
      id: '3',
      name: 'Stemcyte India',
      type: 'public',
      address: '789 Medical Plaza, Bandra East',
      city: 'Mumbai',
      state: 'Maharashtra',
      phone: '+91-22-2345-6789',
      email: 'info@stemcyte.in',
      website: 'https://stemcyte.in',
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    {
      id: '4',
      name: 'AIIMS Cord Blood Bank',
      type: 'public',
      address: 'All India Institute of Medical Sciences, Ansari Nagar',
      city: 'Delhi',
      state: 'Delhi',
      phone: '+91-11-2345-6789',
      email: 'cordblood@aiims.edu',
      website: 'https://aiims.edu',
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    {
      id: '5',
      name: 'Babycell',
      type: 'private',
      address: '321 Bio-Tech Park, HITEC City',
      city: 'Hyderabad',
      state: 'Telangana',
      phone: '+91-40-4567-8901',
      email: 'info@babycell.in',
      website: 'https://babycell.in',
      coordinates: { lat: 17.3850, lng: 78.4867 }
    }
  ];

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getUserLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
          // TODO: Show user-friendly error message
        }
      );
    } else {
      setIsLoadingLocation(false);
      // TODO: Show browser not supported message
    }
  };

  const filteredBanks = cordBanks
    .filter(bank => {
      const matchesSearch = bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           bank.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           bank.state.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || bank.type === filterType;
      return matchesSearch && matchesType;
    })
    .map(bank => {
      if (userLocation) {
        const distance = calculateDistance(
          userLocation.lat, userLocation.lng,
          bank.coordinates.lat, bank.coordinates.lng
        );
        return { ...bank, distance };
      }
      return bank;
    })
    .sort((a, b) => {
      if (a.distance && b.distance) {
        return a.distance - b.distance;
      }
      return 0;
    });

  useEffect(() => {
    // TODO: Initialize map integration (Google Maps or Mapbox)
    console.log('Map integration to be implemented');
  }, []);

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
            <MapPin className="h-16 w-16 mx-auto mb-6 text-coral" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Cord Banks Near You
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Locate accredited cord blood banking facilities in your area. 
              Get directions, contact information, and compare services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-navy/60" />
              <input
                type="text"
                placeholder="Search by name, city, or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-colors duration-200"
              />
            </div>

            {/* Filters and Location */}
            <div className="flex flex-wrap items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-navy/60" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as 'all' | 'public' | 'private')}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="public">Public Banks</option>
                  <option value="private">Private Banks</option>
                </select>
              </div>

              <button
                onClick={getUserLocation}
                disabled={isLoadingLocation}
                className="flex items-center space-x-2 px-4 py-2 bg-coral text-white rounded-lg hover:bg-coral/90 transition-colors duration-200 disabled:opacity-50"
              >
                <Locate className={`h-4 w-4 ${isLoadingLocation ? 'animate-spin' : ''}`} />
                <span>{isLoadingLocation ? 'Locating...' : 'Use My Location'}</span>
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-navy/60">
            Showing {filteredBanks.length} cord blood banks
            {userLocation && ' sorted by distance'}
          </div>
        </div>
      </section>

      {/* Map and Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Container */}
            <div className="order-2 lg:order-1">
              {/* Map container removed as per instructions */}
            </div>

            {/* Banks List */}
            <div className="order-1 lg:order-2">
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredBanks.length === 0 ? (
                  <div className="text-center py-12">
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-navy/30" />
                    <h3 className="text-xl font-semibold text-navy mb-2">No banks found</h3>
                    <p className="text-navy/60">Try adjusting your search criteria.</p>
                  </div>
                ) : (
                  filteredBanks.map((bank, index) => (
                    <motion.div
                      key={bank.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`bg-white rounded-2xl shadow-lg p-4 md:p-5 cursor-pointer transition-all duration-300 ${
                        selectedBank?.id === bank.id 
                          ? 'border border-coral/40 bg-gray-50 shadow-xl'
                          : 'hover:shadow-xl hover:-translate-y-1'
                      }`}
                      onClick={() => setSelectedBank(bank)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-navy mb-2">{bank.name}</h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              bank.type === 'public' 
                                ? 'bg-teal/10 text-teal' 
                                : 'bg-coral/10 text-coral'
                            }`}>
                              {bank.type === 'public' ? 'Public Bank' : 'Private Bank'}
                            </span>
                            {bank.distance && (
                              <span className="text-xs text-navy/60">
                                {bank.distance.toFixed(1)} km away
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Integrate with maps for directions
                            window.open(`https://maps.google.com/?q=${bank.coordinates.lat},${bank.coordinates.lng}`, '_blank');
                          }}
                          className="p-2 bg-coral/10 text-coral rounded-lg hover:bg-coral/20 transition-colors duration-200"
                        >
                          <Navigation className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-start space-x-2 text-navy/70">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{bank.address}, {bank.city}, {bank.state}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-navy/70">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <a href={`tel:${bank.phone}`} className="hover:text-coral transition-colors">
                            {bank.phone}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2 text-navy/70">
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          <a href={`mailto:${bank.email}`} className="hover:text-coral transition-colors">
                            {bank.email}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2 text-navy/70">
                          <Globe className="h-4 w-4 flex-shrink-0" />
                          <a 
                            href={bank.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-coral transition-colors"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};