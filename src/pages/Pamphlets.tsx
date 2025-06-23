import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, FileText, Eye, Download, ArrowRight } from 'lucide-react';

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
      case 'basic': return 'bg-pink-primary/10 text-pink-primary';
      case 'medical': return 'bg-pink-soft/10 text-pink-soft';
      case 'decision': return 'bg-plum/10 text-plum';
      case 'legal': return 'bg-pink-hover/10 text-pink-hover';
      default: return 'bg-background-alt text-text-body';
    }
  };

  const PamphletCard = ({ pamphlet, featured = false }: { pamphlet: Pamphlet; featured?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`bg-background-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="relative">
          <img
            src={pamphlet.image}
            alt={pamphlet.title}
            className={`w-full object-cover ${featured ? 'h-64' : 'h-48'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className={`font-semibold text-text-light mb-2 ${featured ? 'text-xl' : 'text-lg'}`}>
              {pamphlet.title}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(pamphlet.category)}`}>
                {categories.find(c => c.key === pamphlet.category)?.label}
              </span>
              <span className="text-text-light/90 text-sm">{pamphlet.languageNative}</span>
            </div>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <p className="text-text-body mb-4">{pamphlet.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {pamphlet.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-background-alt rounded-lg text-text-body text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between text-sm text-text-body mb-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>{pamphlet.pages} pages</span>
              </div>
              <div className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>{pamphlet.downloadCount.toLocaleString()} downloads</span>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={pamphlet.previewUrl}
                className="flex-1 py-2 px-4 bg-background-alt text-plum rounded-xl hover:bg-pink-soft/10 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </a>
              <a
                href={pamphlet.downloadUrl}
                className="flex-1 py-2 px-4 bg-pink-primary text-text-light rounded-xl hover:bg-pink-hover transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </a>
            </div>
          </div>
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
      className="bg-background-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
    >
      <div className="flex">
        <div className="w-48 h-32 flex-shrink-0">
          <img
            src={pamphlet.image}
            alt={pamphlet.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-plum mb-2">{pamphlet.title}</h3>
              <p className="text-text-body text-sm mb-2">{pamphlet.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <a
                href={pamphlet.previewUrl}
                className="p-2 bg-background-alt text-plum rounded-xl hover:bg-pink-soft/10 transition-colors duration-200"
              >
                <Eye className="h-5 w-5" />
              </a>
              <a
                href={pamphlet.downloadUrl}
                className="p-2 bg-pink-primary text-text-light rounded-xl hover:bg-pink-hover transition-colors duration-200"
              >
                <Download className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(pamphlet.category)}`}>
                {categories.find(c => c.key === pamphlet.category)?.label}
              </span>
              <span className="text-text-body text-sm">{pamphlet.languageNative}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-text-body">
              <div className="flex items-center space-x-1">
                <FileText className="h-4 w-4" />
                <span>{pamphlet.pages} pages</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="h-4 w-4" />
                <span>{pamphlet.downloadCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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
            <FileText className="h-16 w-16 mx-auto mb-6 text-pink-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-light mb-6">
              Educational Resources
            </h1>
            <p className="text-xl text-text-light/90 max-w-3xl mx-auto">
              Download comprehensive guides and pamphlets about cord blood banking in multiple languages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Pamphlets */}
      <section className="py-12 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-plum">Featured Resources</h2>
            <a
              href="#all-resources"
              className="flex items-center space-x-2 text-pink-primary hover:text-pink-hover transition-colors duration-200"
            >
              <span>View all resources</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredPamphlets.map(pamphlet => (
              <PamphletCard key={pamphlet.id} pamphlet={pamphlet} featured />
            ))}
          </div>
        </div>
      </section>

      {/* All Pamphlets */}
      <section id="all-resources" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex-1 w-full md:max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-body" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-background-card border border-pink-soft/20 text-plum placeholder-text-body/60 focus:outline-none focus:ring-2 focus:ring-pink-primary/20"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-text-body" />
                  <span className="text-sm font-medium text-plum">Filter by:</span>
                </div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-4 py-2 bg-background-card border border-pink-soft/20 rounded-xl text-plum focus:outline-none focus:ring-2 focus:ring-pink-primary/20"
                >
                  <option value="all">All Languages</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-background-card border border-pink-soft/20 rounded-xl text-plum focus:outline-none focus:ring-2 focus:ring-pink-primary/20"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.key} value={cat.key}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-4 py-2 bg-background-card text-plum rounded-xl border border-pink-soft/20 hover:bg-pink-soft/10 transition-colors duration-200"
              >
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </button>
            </div>
          </div>

          {/* Results */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPamphlets.map(pamphlet => (
                <PamphletCard key={pamphlet.id} pamphlet={pamphlet} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPamphlets.map(pamphlet => (
                <PamphletListItem key={pamphlet.id} pamphlet={pamphlet} />
              ))}
            </div>
          )}

          {filteredPamphlets.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto mb-4 text-pink-soft" />
              <h3 className="text-xl font-semibold text-plum mb-2">
                No resources found
              </h3>
              <p className="text-text-body">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Request Resources CTA */}
      <section className="py-16 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-plum to-plum/90 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-text-light mb-4">
                Need Something Specific?
              </h2>
              <p className="text-text-light/90 mb-8">
                Can't find what you're looking for? Request resources in your preferred language or topic.
              </p>
              <button className="inline-flex items-center space-x-2 px-6 py-3 bg-pink-primary text-text-light rounded-xl hover:bg-pink-hover transition-colors duration-200">
                <span>Request Resources</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};