import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Phone, Mail, Globe, Building, Shield, Users } from 'lucide-react';

interface CordBank {
  id: string;
  name: string;
  type: 'public' | 'private';
  city: string;
  state: string;
  phone: string;
  email: string;
  website: string;
  services: string[];
  accreditation: string[];
  established: number;
  distance?: number;
}

export const Banks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'public' | 'private'>('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // TODO: Connect to backend API for real data
  const cordBanks: CordBank[] = [
    {
      id: '1',
      name: 'LifeCell International',
      type: 'private',
      city: 'Chennai',
      state: 'Tamil Nadu',
      phone: '+91-44-4567-8900',
      email: 'info@lifecell.in',
      website: 'https://lifecell.in',
      services: ['Cord Blood Banking', 'Cord Tissue Banking', 'Immune Cell Banking'],
      accreditation: ['AABB', 'CAP', 'FACT'],
      established: 2004
    },
    {
      id: '2',
      name: 'Cryoviva Biotech',
      type: 'private',
      city: 'Gurgaon',
      state: 'Haryana',
      phone: '+91-124-456-7890',
      email: 'contact@cryoviva.com',
      website: 'https://cryoviva.com',
      services: ['Umbilical Cord Blood Banking', 'Cord Tissue Storage'],
      accreditation: ['ISO 9001', 'AABB'],
      established: 2006
    },
    {
      id: '3',
      name: 'Stemcyte India',
      type: 'public',
      city: 'Mumbai',
      state: 'Maharashtra',
      phone: '+91-22-2345-6789',
      email: 'info@stemcyte.in',
      website: 'https://stemcyte.in',
      services: ['Public Cord Blood Donation', 'HLA Typing', 'Stem Cell Processing'],
      accreditation: ['FACT', 'AABB', 'NetCord'],
      established: 2008
    },
    {
      id: '4',
      name: 'Reliance Cord Blood Bank',
      type: 'private',
      city: 'Mumbai',
      state: 'Maharashtra',
      phone: '+91-22-3456-7890',
      email: 'cordblood@reliance.com',
      website: 'https://reliance-cordblood.com',
      services: ['Cord Blood Banking', 'Genetic Testing', 'Stem Cell Therapy'],
      accreditation: ['AABB', 'CAP'],
      established: 2010
    },
    {
      id: '5',
      name: 'All India Institute of Medical Sciences (AIIMS)',
      type: 'public',
      city: 'Delhi',
      state: 'Delhi',
      phone: '+91-11-2345-6789',
      email: 'cordblood@aiims.edu',
      website: 'https://aiims.edu',
      services: ['Public Banking', 'Research', 'Treatment'],
      accreditation: ['NABH', 'NABL'],
      established: 2005
    },
    {
      id: '6',
      name: 'Babycell',
      type: 'private',
      city: 'Hyderabad',
      state: 'Telangana',
      phone: '+91-40-4567-8901',
      email: 'info@babycell.in',
      website: 'https://babycell.in',
      services: ['Cord Blood Banking', 'Cord Tissue Banking'],
      accreditation: ['ISO 9001'],
      established: 2012
    }
  ];

  const cities = Array.from(new Set(cordBanks.map(bank => bank.city))).sort();

  // Haversine formula for distance
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Dummy coordinates for each city (for demo; in real app, use real coordinates)
  const cityCoords: Record<string, { lat: number; lng: number }> = {
    'Chennai': { lat: 13.0827, lng: 80.2707 },
    'Gurgaon': { lat: 28.4595, lng: 77.0266 },
    'Mumbai': { lat: 19.0760, lng: 72.8777 },
    'Delhi': { lat: 28.6139, lng: 77.2090 },
    'Hyderabad': { lat: 17.3850, lng: 78.4867 },
  };

  // Add distance to banks if userLocation is set
  const filteredBanks = useMemo(() => {
    let banks = cordBanks.filter(bank => {
      const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bank.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bank.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || bank.type === selectedType;
      const matchesCity = selectedCity === 'all' || bank.city === selectedCity;
      return matchesSearch && matchesType && matchesCity;
    });
    if (userLocation) {
      banks = banks.map(bank => {
        const coords = cityCoords[bank.city];
        if (coords) {
          // @ts-ignore
          bank.distance = calculateDistance(userLocation.lat, userLocation.lng, coords.lat, coords.lng);
        }
        return bank;
      }).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }
    return banks;
  }, [searchTerm, selectedType, selectedCity, userLocation]);

  // Use My Location handler
  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          // Optionally show error
        }
      );
    }
  };

  const getBankTypeClasses = (type: 'public' | 'private') => {
    return type === 'public' 
      ? 'bg-teal/10 text-teal' 
      : 'bg-coral/10 text-coral';
  };

  const getBankIconClasses = (type: 'public' | 'private') => {
    return type === 'public' ? 'bg-teal/10' : 'bg-coral/10';
  };

  const getBankIconColor = (type: 'public' | 'private') => {
    return type === 'public' ? 'text-teal' : 'text-coral';
  };

  const BankCard = ({ bank }: { bank: CordBank }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-navy mb-2">{bank.name}</h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBankTypeClasses(bank.type)}`}>
                {bank.type === 'public' ? 'Public Bank' : 'Private Bank'}
              </span>
              <span className="text-navy/60 text-sm">Est. {bank.established}</span>
            </div>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bank.name + ', ' + bank.city + ', ' + bank.state)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-coral/10 text-coral rounded-lg hover:bg-coral/20 transition-colors duration-200 flex items-center"
            title="View on Google Maps"
          >
            <MapPin className="h-6 w-6" />
          </a>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-navy/70">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{bank.city}, {bank.state}</span>
          </div>
          <div className="flex items-center space-x-2 text-navy/70">
            <Phone className="h-4 w-4" />
            <a href={`tel:${bank.phone}`} className="text-sm hover:text-coral transition-colors">
              {bank.phone}
            </a>
          </div>
          <div className="flex items-center space-x-2 text-navy/70">
            <Mail className="h-4 w-4" />
            <a href={`mailto:${bank.email}`} className="text-sm hover:text-coral transition-colors">
              {bank.email}
            </a>
          </div>
          <div className="flex items-center space-x-2 text-navy/70">
            <Globe className="h-4 w-4" />
            <a 
              href={bank.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm hover:text-coral transition-colors"
            >
              Visit Website
            </a>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-navy mb-2">Services</h4>
          <div className="flex flex-wrap gap-1">
            {bank.services.map((service) => (
              <span
                key={service}
                className="px-2 py-1 bg-lavender/20 text-navy text-xs rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-navy mb-2">Accreditation</h4>
          <div className="flex flex-wrap gap-1">
            {bank.accreditation.map((acc) => (
              <span
                key={acc}
                className="px-2 py-1 bg-teal/10 text-teal text-xs rounded-full font-medium"
              >
                {acc}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const BankTableRow = ({ bank }: { bank: CordBank }) => (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
    >
      <td className="px-6 py-4">
        <div>
          <div className="font-semibold text-navy">{bank.name}</div>
          <div className="text-sm text-navy/60">{bank.city}, {bank.state}</div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBankTypeClasses(bank.type)}`}>
          {bank.type === 'public' ? 'Public' : 'Private'}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-navy/70">{bank.phone}</td>
      <td className="px-6 py-4 text-sm text-navy/70">{bank.email}</td>
      <td className="px-6 py-4">
        <a 
          href={bank.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-coral hover:text-coral/80 transition-colors text-sm"
        >
          Visit Website
        </a>
      </td>
    </motion.tr>
  );

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
            <Building className="h-16 w-16 mx-auto mb-6 text-coral" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cord Blood Banks in India
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Find accredited cord blood banking facilities across India. 
              Compare services, locations, and choose the right bank for your family.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-navy/60" />
              <input
                type="text"
                placeholder="Search by name, city, or state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-colors duration-200"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-navy/60" />
                <span className="text-sm font-medium text-navy">Filters:</span>
              </div>
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as 'all' | 'public' | 'private')}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral text-sm"
              >
                <option value="all">All Types</option>
                <option value="public">Public Banks</option>
                <option value="private">Private Banks</option>
              </select>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral text-sm"
              >
                <option value="all">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              <button
                onClick={handleUseMyLocation}
                className="flex items-center space-x-2 px-4 py-2 bg-coral text-white rounded-lg hover:bg-coral/90 transition-colors duration-200"
              >
                <MapPin className="h-4 w-4" />
                <span>Use My Location</span>
              </button>

              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white text-coral shadow-sm'
                      : 'text-navy/60 hover:text-navy'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'table'
                      ? 'bg-white text-coral shadow-sm'
                      : 'text-navy/60 hover:text-navy'
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-navy/60">
            Showing {filteredBanks.length} of {cordBanks.length} cord blood banks
          </div>
        </div>
      </section>

      {/* Banks Display */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredBanks.length === 0 ? (
            <div className="text-center py-12">
              <Building className="h-16 w-16 mx-auto mb-4 text-navy/30" />
              <h3 className="text-xl font-semibold text-navy mb-2">No banks found</h3>
              <p className="text-navy/60">Try adjusting your search criteria or filters.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBanks.map((bank) => (
                <BankCard key={bank.id} bank={bank} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-navy">Bank Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-navy">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-navy">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-navy">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-navy">Website</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBanks.map((bank) => (
                      <BankTableRow key={bank.id} bank={bank} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};