import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, FileText, Eye } from 'lucide-react';

interface Pamphlet {
  id: string;
  title: string;
  description: string;
  language: string;
  languageNative: string;
  category: 'basic' | 'medical' | 'decision' | 'legal';
  pages: number;
  downloadCount: number;
  rating: number;
  image: string;
  downloadUrl: string;
  previewUrl: string;
  featured: boolean;
  tags: string[];
}

export const Pamphlets = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // TODO: Connect to real pamphlets database
  const pamphlets: Pamphlet[] = [
    {
      id: '1',
      title: 'Complete Guide to Cord Blood Banking',
      description: 'Comprehensive introduction covering benefits, process, costs, and decision-making factors for expectant parents.',
      language: 'English',
      languageNative: 'English',
      category: 'basic',
      pages: 16,
      downloadCount: 12847,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/159832/justice-law-case-hearing-159832.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '#',
      previewUrl: '#',
      featured: true,
      tags: ['Beginner Friendly', 'Complete Guide', 'Parents']
    },
    {
      id: '2',
      title: 'कॉर्ड ब्लड बैंकिंग की संपूर्ण जानकारी',
      description: 'गर्भवती माताओं के लिए कॉर्ड ब्लड बैंकिंग के फायदे, प्रक्रिया और निर्णय लेने की जानकारी।',
      language: 'Hindi',
      languageNative: 'हिंदी',
      category: 'basic',
      pages: 18,
      downloadCount: 8934,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/159832/justice-law-case-hearing-159832.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '#',
      previewUrl: '#',
      featured: true,
      tags: ['शुरुआती', 'संपूर्ण गाइड', 'माता-पिता']
    },
    {
      id: '3',
      title: 'Medical Applications of Cord Blood',
      description: 'Detailed overview of diseases treated with cord blood, success rates, and ongoing clinical trials.',
      language: 'English',
      languageNative: 'English',
      category: 'medical',
      pages: 24,
      downloadCount: 6721,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '#',
      previewUrl: '#',
      featured: false,
      tags: ['Medical Professional', 'Treatment Options', 'Research']
    },
    {
      id: '4',
      title: 'Public vs Private Banking Guide',
      description: 'Comparative analysis helping families choose between public donation and private storage options.',
      language: 'English',
      languageNative: 'English',
      category: 'decision',
      pages: 12,
      downloadCount: 9156,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '#',
      previewUrl: '#',
      featured: true,
      tags: ['Decision Support', 'Banking Options', 'Comparison']
    },
    {
      id: '5',
      title: 'கொரிடர் ரத்த வங்கி வழிகாட்டி',
      description: 'கர்ப்பிணிப் பெண்களுக்கான கொரிடர் ரத்த வங்கியின் நன்மைகள் மற்றும் செயல்முறை பற்றிய விவரங்கள்.',
      language: 'Tamil',
      languageNative: 'தமிழ்',
      category: 'basic',
      pages: 20,
      downloadCount: 4523,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/159832/justice-law-case-hearing-159832.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '#',
      previewUrl: '#',
      featured: false,
      tags: ['ஆரம்பநிலை', 'முழுமையான வழிகாட்டி', 'பெற்றோர்']
    },
    {
      id: '6',
      title: 'Legal Aspects of Cord Blood Banking',
      description: 'Understanding contracts, ownership rights, and legal considerations in cord blood preservation.',
      language: 'English',
      languageNative: 'English',
      category: 'legal',
      pages: 8,
      downloadCount: 3421,
      rating: 4.4,
      image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '#',
      previewUrl: '#',
      featured: false,
      tags: ['Legal Rights', 'Contracts', 'Ownership']
    },
    {
      id: '7',
      title: 'కార్డ్ బ్లడ్ బ్యాంకింగ్ గైడ్',
      description: 'గర్భిణీ స్త్రీలకు కార్డ్ బ్లడ్ బ్యాంకింగ్ యొక్క ప్రయోజనాలు మరియు ప్రక్రియ గురించి సమాచారం.',
      language: 'Telugu',
      languageNative: 'తెలుగు',
      category: 'basic',
      pages: 16,
      downloadCount: 3847,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/159832/justice-law-case-hearing-159832.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '#',
      previewUrl: '#',
      featured: false,
      tags: ['ప్రాథమిక', 'పూర్తి గైడ్', 'తల్లిదండ్రులు']
    },
    {
      id: '8',
      title: 'Cost Analysis and Insurance Coverage',
      description: 'Financial planning guide covering costs, payment options, insurance policies, and financial assistance programs.',
      language: 'English',
      languageNative: 'English',
      category: 'decision',
      pages: 14,
      downloadCount: 7234,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloadUrl: '#',
      previewUrl: '#',
      featured: false,
      tags: ['Financial Planning', 'Insurance', 'Cost Analysis']
    }
  ];

  const languages = Array.from(new Set(pamphlets.map(p => p.language))).sort();
  const categories = [
    { key: 'basic', label: 'Basic Information' },
    { key: 'medical', label: 'Medical Applications' },
    { key: 'decision', label: 'Decision Support' },
    { key: 'legal', label: 'Legal Aspects' }
  ];

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredPamphlets = pamphlets.filter(pamphlet => {
    const matchesSearch = pamphlet.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      pamphlet.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      pamphlet.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()));
    const matchesLanguage = selectedLanguage === 'all' || pamphlet.language === selectedLanguage;
    const matchesCategory = selectedCategory === 'all' || pamphlet.category === selectedCategory;
    return matchesSearch && matchesLanguage && matchesCategory;
  });

  const featuredPamphlets = pamphlets.filter(p => p.featured);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic': return 'bg-coral/10 text-coral';
      case 'medical': return 'bg-teal/10 text-teal';
      case 'decision': return 'bg-lavender/20 text-navy';
      case 'legal': return 'bg-navy/10 text-navy';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const PamphletCard = ({ pamphlet, featured = false }: { pamphlet: Pamphlet; featured?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group ${
        featured ? 'ring-2 ring-coral/20' : ''
      }`}
    >
      <div className="relative">
        <img
          src={pamphlet.image}
          alt={pamphlet.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(pamphlet.category)}`}>
            {categories.find(c => c.key === pamphlet.category)?.label}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 bg-white/90 text-navy rounded-full text-xs font-medium">
            {pamphlet.languageNative}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <span className="px-2 py-1 bg-black/60 text-white rounded text-xs">
            {pamphlet.pages} pages
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-navy mb-2 line-clamp-2">{pamphlet.title}</h3>
        <p className="text-navy/70 text-sm mb-4 line-clamp-3">{pamphlet.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {pamphlet.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => {
              // TODO: Connect to preview functionality
            }}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-coral text-coral rounded-lg hover:bg-coral/10 transition-colors duration-200 text-sm"
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
        </div>
      </div>
    </motion.div>
  );

  const PamphletListItem = ({ pamphlet }: { pamphlet: Pamphlet }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start space-x-6">
        <img
          src={pamphlet.image}
          alt={pamphlet.title}
          className="w-24 h-32 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold text-navy mb-1">{pamphlet.title}</h3>
              <p className="text-navy/60 text-sm">{pamphlet.languageNative} • {pamphlet.pages} pages</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(pamphlet.category)}`}>
                {categories.find(c => c.key === pamphlet.category)?.label}
              </span>
            </div>
          </div>
          
          <p className="text-navy/70 mb-4">{pamphlet.description}</p>
          
          <div className="flex items-center justify-between">
            <div />
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  // TODO: Connect to preview functionality
                }}
                className="flex items-center space-x-1 px-4 py-2 border border-coral text-coral rounded-lg hover:bg-coral/10 transition-colors duration-200 text-sm"
              >
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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
            <FileText className="h-16 w-16 mx-auto mb-6 text-coral" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Educational Resources
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Download comprehensive guides, brochures, and educational materials 
              about cord blood banking in multiple languages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Pamphlets */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Featured Resources
            </h2>
            <p className="text-xl text-navy/70">
              Our most popular and comprehensive educational materials
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPamphlets.map((pamphlet) => (
              <PamphletCard key={pamphlet.id} pamphlet={pamphlet} featured={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-navy/60" />
              <input
                type="text"
                placeholder="Search pamphlets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral text-sm"
              >
                <option value="all">All Languages</option>
                {languages.map((language) => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.key} value={category.key}>{category.label}</option>
                ))}
              </select>

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
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white text-coral shadow-sm'
                      : 'text-navy/60 hover:text-navy'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-navy/60">
            Showing {filteredPamphlets.length} of {pamphlets.length} resources
          </div>
        </div>
      </section>

      {/* Pamphlets Display */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPamphlets.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto mb-4 text-navy/30" />
              <h3 className="text-xl font-semibold text-navy mb-2">No resources found</h3>
              <p className="text-navy/60">Try adjusting your search criteria or filters.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPamphlets.map((pamphlet) => (
                <PamphletCard key={pamphlet.id} pamphlet={pamphlet} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPamphlets.map((pamphlet) => (
                <PamphletListItem key={pamphlet.id} pamphlet={pamphlet} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};