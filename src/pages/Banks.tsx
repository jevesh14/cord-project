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
      name: 'Biocell',
      type: 'private',
      city: 'Mumbai',
      state: 'Maharashtra',
      phone: '1800-209-0309',
      email: 'info@biocell.in',
      website: 'https://biocell.in',
      services: ['Umbilical cord blood & tissue banking', 'advanced regenerative cell therapies like OSSGROW(R)', 'CARTIGROW(R)', 'UREGROW(R)'],
      accreditation: ['ISO', 'DCGI'],
      established: 2009
    },
    {
      id: '2',
      name: 'Cloudnine (Cryonine Stem Cell Banking)',
      type: 'private',
      city: 'Bengaluru',
      state: 'Karnataka',
      phone: '+91 76191 97295',
      email: 'cloudninecare.com',
      website: 'https://cloudninecare.com/service-types/cryonine-stem-cell-banking',
      services: ['Umbilical cord blood collection', 'processing', 'secure storage (powered by Cryoviva)'],
      accreditation: ['Cryoviva partnership'],
      established: 2018
    },
    {
      id: '3',
      name: 'Cocoon Hospital (Stem Cell Preservation Division)',
      type: 'private',
      city: 'Jaipur',
      state: 'Rajasthan',
      phone: '08929-816349',
      email: 'contactjpr@cocoon.co.in',
      website: 'https://cocoon.co.in',
      services: ['Umbilical Cord Blood Banking', 'Cord Tissue Storage', 'Stem Cell Preservation'],
      accreditation: ['In partnership with Cryoviva (AABB, ISO 9001)'],
      established: 2013
    },
    {
      id: '4',
      name: 'Cryo StemCell',
      type: 'private',
      city: 'Bengaluru',
      state: 'Karnataka',
      phone: '+91 94480 74485',
      email: 'info@cryostemcell.in',
      website: 'https://cryostemcell.in',
      services: ['Umbilical cord blood & cord tissue banking for family use'],
      accreditation: ['ISO', 'DCGI'],
      established: 2003
    },
    {
      id: '5',
      name: 'Cryovault Biotech Pvt. Ltd.',
      type: 'private',
      city: 'Bengaluru',
      state: 'Karnataka',
      phone: '1800 102 4026 / +91 73311 61886',
      email: 'info@cryovault.in',
      website: 'https://cryovault.in',
      services: ['Umbilical cord blood & tissue banking', 'support kits', '24/7 customer care'],
      accreditation: ['IFDA', 'DCGI', 'ANSI', 'ISO 9001'],
      established: 2015
    },
    {
      id: '6',
      name: 'Novacord',
      type: 'private',
      city: 'Gurugram',
      state: 'Haryana',
      phone: '(via website)',
      email: 'enquiry@totipotentrx.com',
      website: 'https://novacord.com',
      services: ['Umbilical cord blood & tissue banking integrated with advanced cellular therapy'],
      accreditation: ['DCGI'],
      established: 2011
    },
    {
      id: '7',
      name: 'Ree Laboratories Pvt. Ltd.',
      type: 'private',
      city: 'Mumbai',
      state: 'Maharashtra',
      phone: '1800-222-454',
      email: '(via website)',
      website: 'https://reelabs.com',
      services: ['Stem cell banking from multiple sources - cord blood, tissue, placenta, amniotic sac, amniotic fluid, bone marrow, adipose tissue, menstrual blood'],
      accreditation: ['ISO', 'DCGI', 'cGMP'],
      established: 2010
    },
    {
      id: '8',
      name: 'StemPlus Cryopreservation Pvt Ltd.',
      type: 'private',
      city: 'Sangli',
      state: 'Maharashtra',
      phone: '+91 95952 72702',
      email: 'info@stemplusbiotech.com',
      website: 'https://stemplusbiotech.com',
      services: ['Cord blood', 'cord tissue', 'placenta', 'menstrual', 'urine-derived', 'dental stem cell banking', 'DCGI/FDA-approved cGMP lab'],
      accreditation: ['DCGI', 'cGLP', 'ISO 9001 2015', 'AABB'],
      established: 2012
    },
    {
      id: '9',
      name: 'Cordlife Sciences India Pvt. Ltd.',
      type: 'private',
      city: 'Kolkata',
      state: 'West Bengal',
      phone: '98301 66200',
      email: 'info@cordlifeindia.com',
      website: 'https://cordlifeindia.com',
      services: ['Cord blood & cord tissue storage', 'newborn screening options'],
      accreditation: ['AABB', 'NABL', 'CAP', 'DCGI', 'ISO', 'WHO-GMP'],
      established: 2001
    },
    {
      id: '10',
      name: 'Narayana Hrudayalaya Tissue Bank & Stem Cells Research Centre',
      type: 'public',
      city: 'Bengaluru',
      state: 'Karnataka',
      phone: '(via hospital)',
      email: '(via hospital)',
      website: 'https://narayanahospitals.com/cellsofhope',
      services: ["Cord blood and Wharton's jelly (cord tissue) banking", 'combined public/private repository'],
      accreditation: ['DCGI-licensed'],
      established: 2010
    },
    {
      id: '11',
      name: 'Best Wellcare Management Services Pvt. Ltd. (Indu Stem Cell Bank)',
      type: 'private',
      city: 'Vadodara',
      state: 'Gujarat',
      phone: '(via website)',
      email: '(via website)',
      website: '(via website)',
      services: ['Umbilical cord blood & tissue stem cell banking', 'collection kits', 'safe transport logistics', 'processing', 'cryopreservation at -196 C', 'long-term secure storage'],
      accreditation: ['Licensed by DCGI'],
      established: 2018
    },
    {
      id: '12',
      name: 'Path Care Labs Pvt. Ltd. (Cord Care division)',
      type: 'private',
      city: 'Hyderabad',
      state: 'Telangana',
      phone: '78389-99111',
      email: '(via website)',
      website: 'https://pathcarelabs.com',
      services: ['Umbilical cord blood stem cell banking as part of diagnostic & life sciences offerings', 'access to 600+ regional collection centers and automated labs'],
      accreditation: ['NABL-certified diagnostic labs', 'licensed by DCGI'],
      established: 2008
    },
    {
      id: '13',
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
      id: '14',
      name: 'Cryoviva Biotech',
      type: 'private',
      city: 'Gurugram',
      state: 'Haryana',
      phone: '+91-124-456-7890',
      email: 'contact@cryoviva.com',
      website: 'https://cryoviva.com',
      services: ['Umbilical Cord Blood Banking', 'Cord Tissue Storage'],
      accreditation: ['ISO 9001', 'AABB'],
      established: 2006
    },
    {
      id: '15',
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
      id: '16',
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
      id: '17',
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
      id: '18',
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

  const filteredCities = useMemo(() => {
    const citySet = new Set(cordBanks.map(bank => bank.city));
    return Array.from(citySet).sort();
  }, []);

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
      ? 'bg-pink-soft/10 text-pink-soft' 
      : 'bg-pink-primary/10 text-pink-primary';
  };

  const getBankIconClasses = (type: 'public' | 'private') => {
    return type === 'public' ? 'bg-pink-soft/10' : 'bg-pink-primary/10';
  };

  const getBankIconColor = (type: 'public' | 'private') => {
    return type === 'public' ? 'text-pink-soft' : 'text-pink-primary';
  };

  const BankCard = ({ bank }: { bank: CordBank }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background-card rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-plum mb-2">{bank.name}</h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBankTypeClasses(bank.type)}`}>
                {bank.type === 'public' ? 'Public Bank' : 'Private Bank'}
              </span>
              <span className="text-text-body text-sm">Est. {bank.established}</span>
            </div>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${bank.name}, ${bank.city}, ${bank.state}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-pink-primary/10 hover:bg-pink-primary/20 transition-colors"
            title="View on Google Maps"
          >
            <MapPin className="h-6 w-6 text-pink-primary" />
          </a>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-text-body">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{bank.city}, {bank.state}</span>
          </div>
          <div className="flex items-center space-x-2 text-text-body">
            <Phone className="h-4 w-4 flex-shrink-0" />
            <a href={`tel:${bank.phone}`} className="hover:text-pink-primary transition-colors duration-200">
              {bank.phone}
            </a>
          </div>
          <div className="flex items-center space-x-2 text-text-body">
            <Mail className="h-4 w-4 flex-shrink-0" />
            <a href={`mailto:${bank.email}`} className="hover:text-pink-primary transition-colors duration-200">
              {bank.email}
            </a>
          </div>
          <div className="flex items-center space-x-2 text-text-body">
            <Globe className="h-4 w-4 flex-shrink-0" />
            <a href={bank.website} target="_blank" rel="noopener noreferrer" className="hover:text-pink-primary transition-colors duration-200">
              {bank.website.replace('https://', '')}
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-plum mb-2">Services</h4>
            <div className="flex flex-wrap gap-2">
              {bank.services.map((service, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-background-alt rounded-lg text-text-body text-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-plum mb-2">Accreditation</h4>
            <div className="flex flex-wrap gap-2">
              {bank.accreditation.map((accred, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-pink-soft/5 rounded-lg text-pink-primary text-sm"
                >
                  {accred}
                </span>
              ))}
            </div>
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
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2 text-text-body">
          <MapPin className="h-4 w-4" />
          <span>{bank.city}, {bank.state}</span>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${bank.name}, ${bank.city}, ${bank.state}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-pink-primary hover:text-pink-hover underline text-xs"
            title="View on Google Maps"
          >
            Maps
          </a>
        </div>
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
            <Building className="h-16 w-16 mx-auto mb-6 text-pink-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-light mb-6">
              Find Cord Blood Banks
            </h1>
            <p className="text-xl text-text-light/90 max-w-3xl mx-auto">
              Whether you're considering private storage or public donation, find the right cord bank near you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-body" />
                <input
                  type="text"
                  placeholder="Search by name, city, or state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-background-card border border-pink-soft/20 text-plum placeholder-text-body/60 focus:outline-none focus:ring-2 focus:ring-pink-primary/20"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <div className="w-48">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as 'all' | 'public' | 'private')}
                  className="w-full px-4 py-3 rounded-xl bg-background-card border border-pink-soft/20 text-plum focus:outline-none focus:ring-2 focus:ring-pink-primary/20"
                >
                  <option value="all">All Types</option>
                  <option value="public">Public Banks</option>
                  <option value="private">Private Banks</option>
                </select>
              </div>
              <div className="w-48">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background-card border border-pink-soft/20 text-plum focus:outline-none focus:ring-2 focus:ring-pink-primary/20"
                >
                  <option value="all">All Cities</option>
                  {filteredCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleUseMyLocation}
                className="px-4 py-3 bg-pink-primary text-text-light rounded-xl hover:bg-pink-hover transition-colors duration-200 flex items-center space-x-2"
              >
                <MapPin className="h-5 w-5" />
                <span>Use My Location</span>
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
                className="px-4 py-3 bg-background-card text-plum rounded-xl border border-pink-soft/20 hover:bg-pink-soft/10 transition-colors duration-200"
              >
                {viewMode === 'grid' ? 'Table View' : 'Grid View'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-plum">
              {filteredBanks.length} {filteredBanks.length === 1 ? 'Bank' : 'Banks'} Found
            </h2>
            <div className="flex items-center space-x-2 text-text-body">
              <Filter className="h-5 w-5" />
              <span>Showing results for: {selectedType === 'all' ? 'All Types' : `${selectedType} Banks`}</span>
            </div>
          </div>

          {/* Results Grid/Table */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBanks.map(bank => (
                <BankCard key={bank.id} bank={bank} />
              ))}
            </div>
          ) : (
            <div className="bg-background-card rounded-2xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-background-alt">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-plum">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-plum">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-plum">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-plum">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-plum">Services</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-soft/10">
                  {filteredBanks.map(bank => (
                    <tr key={bank.id} className="hover:bg-pink-soft/5 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div>
                          <h3 className="font-medium text-plum">{bank.name}</h3>
                          <p className="text-sm text-text-body">Est. {bank.established}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBankTypeClasses(bank.type)}`}>
                          {bank.type === 'public' ? 'Public' : 'Private'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-text-body">
                          <MapPin className="h-4 w-4" />
                          <span>{bank.city}, {bank.state}</span>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${bank.name}, ${bank.city}, ${bank.state}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-pink-primary hover:text-pink-hover underline text-xs"
                            title="View on Google Maps"
                          >
                            Maps
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <a href={`tel:${bank.phone}`} className="flex items-center space-x-2 text-text-body hover:text-pink-primary">
                            <Phone className="h-4 w-4" />
                            <span>{bank.phone}</span>
                          </a>
                          <a href={`mailto:${bank.email}`} className="flex items-center space-x-2 text-text-body hover:text-pink-primary">
                            <Mail className="h-4 w-4" />
                            <span>{bank.email}</span>
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {bank.services.slice(0, 2).map((service, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-background-alt rounded-lg text-text-body text-sm"
                            >
                              {service}
                            </span>
                          ))}
                          {bank.services.length > 2 && (
                            <span className="px-2 py-1 text-text-body text-sm">
                              +{bank.services.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-background-card p-6 rounded-2xl shadow-lg"
            >
              <div className="w-12 h-12 bg-pink-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-pink-primary" />
              </div>
              <h3 className="text-lg font-semibold text-plum mb-2">Accredited Banks</h3>
              <p className="text-text-body">
                All listed banks meet strict quality standards and are accredited by recognized organizations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-background-card p-6 rounded-2xl shadow-lg"
            >
              <div className="w-12 h-12 bg-pink-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-pink-primary" />
              </div>
              <h3 className="text-lg font-semibold text-plum mb-2">Expert Support</h3>
              <p className="text-text-body">
                Get guidance from medical professionals to help you make informed decisions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-background-card p-6 rounded-2xl shadow-lg"
            >
              <div className="w-12 h-12 bg-pink-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-pink-primary" />
              </div>
              <h3 className="text-lg font-semibold text-plum mb-2">Pan-India Network</h3>
              <p className="text-text-body">
                Access a wide network of cord blood banks across major cities in India.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};