import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Quote, X, ChevronLeft, ChevronRight, Users, Star } from 'lucide-react';

interface Story {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
  shortQuote: string;
  fullStory: string;
  condition: string;
  outcome: string;
  date: string;
  featured: boolean;
}

export const Stories = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | 'parents' | 'patients' | 'doctors'>('all');

  // TODO: Connect to real testimonials database
  const stories: Story[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      role: 'Mother',
      location: 'Mumbai, Maharashtra',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      shortQuote: "Banking Arjun's cord blood was the best decision we ever made.",
      fullStory: "When our son Arjun was diagnosed with leukemia at age 5, we were devastated. But having preserved his cord blood at birth gave us hope and a treatment option that matched him perfectly. The transplant was successful, and today Arjun is a healthy, active 12-year-old who loves cricket. Cord blood banking didn't just save our son's life—it gave our entire family a second chance at happiness.",
      condition: 'Childhood Leukemia',
      outcome: 'Full Recovery',
      date: '2023-08-15',
      featured: true
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      role: 'Pediatric Hematologist',
      location: 'Delhi',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
      shortQuote: "I've witnessed the life-saving power of cord blood countless times.",
      fullStory: "In my 20 years of practice, I've seen cord blood transform countless lives. Recently, I treated a 7-year-old girl with thalassemia using her baby brother's cord blood. The match was perfect, and her recovery exceeded all expectations. As a doctor, I always recommend cord blood banking to expecting parents. It's not just medical insurance—it's hope preserved for the future.",
      condition: 'Various Blood Disorders',
      outcome: 'Multiple Successful Treatments',
      date: '2023-09-20',
      featured: true
    },
    {
      id: '3',
      name: 'Meera Patel',
      role: 'Patient',
      location: 'Ahmedabad, Gujarat',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      shortQuote: "My sister's cord blood gave me a new lease on life.",
      fullStory: "At 28, I was diagnosed with aplastic anemia. My sister's cord blood, preserved 15 years ago, turned out to be a perfect match. The transplant was less complicated than traditional bone marrow procedures, and my recovery was remarkably smooth. I'm now back to my normal life, working as a teacher and planning my wedding. My sister's gift of life through cord blood is something I'll be grateful for forever.",
      condition: 'Aplastic Anemia',
      outcome: 'Complete Recovery',
      date: '2023-07-10',
      featured: false
    },
    {
      id: '4',
      name: 'Ravi and Sunita Gupta',
      role: 'Parents',
      location: 'Bangalore, Karnataka',
      image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=400',
      shortQuote: "Cord blood banking connected us with another family in need.",
      fullStory: "We chose public cord blood banking for our daughter Kavya. Two years later, we received a call that her cord blood had been matched with a child in need. Knowing that our decision helped save another family's child filled our hearts with joy. Public banking not only secures our family's future but also contributes to a larger community of hope and healing.",
      condition: 'Public Donation',
      outcome: 'Helped Another Child',
      date: '2023-06-25',
      featured: false
    },
    {
      id: '5',
      name: 'Anil Krishnan',
      role: 'Father',
      location: 'Chennai, Tamil Nadu',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      shortQuote: "Three children, three cord blood samples—our family's insurance policy.",
      fullStory: "With each of our three children, we made the decision to bank their cord blood. When our middle child, Asha, developed immune deficiency at age 8, we were prepared. Her own cord blood was used for treatment, and the results were incredible. Today, she's a healthy teenager with a strong immune system. Our investment in cord blood banking wasn't just financial—it was an investment in our children's futures.",
      condition: 'Immune Deficiency',
      outcome: 'Successful Treatment',
      date: '2023-05-12',
      featured: true
    },
    {
      id: '6',
      name: 'Dr. Lakshmi Reddy',
      role: 'Gynecologist',
      location: 'Hyderabad, Telangana',
      image: 'https://images.pexels.com/photos/5452290/pexels-photo-5452290.jpeg?auto=compress&cs=tinysrgb&w=400',
      shortQuote: "I recommend cord blood banking to all my patients.",
      fullStory: "As an obstetrician with over 15 years of experience, I've delivered thousands of babies. I always discuss cord blood banking with expectant parents because I've seen its benefits firsthand. The collection process is simple, safe, and doesn't interfere with delivery. Many of my patients have later thanked me for introducing them to this option. It's preventive medicine at its finest.",
      condition: 'Preventive Care Advocacy',
      outcome: 'Educated Hundreds of Families',
      date: '2023-04-18',
      featured: false
    }
  ];

  const filteredStories = stories.filter(story => {
    if (filter === 'all') return true;
    if (filter === 'parents') return story.role === 'Mother' || story.role === 'Father' || story.role === 'Parents';
    if (filter === 'patients') return story.role === 'Patient';
    if (filter === 'doctors') return story.role.includes('Dr.');
    return true;
  });

  const featuredStories = stories.filter(story => story.featured);

  const nextStory = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredStories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevStory = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredStories.length - 1 : prevIndex - 1
    );
  };

  const StoryCard = ({ story, featured = false }: { story: Story; featured?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group ${
        featured ? 'lg:col-span-2' : ''
      }`}
      onClick={() => setSelectedStory(story)}
    >
      <div className="relative">
        <img
          src={story.image}
          alt={story.name}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            featured ? 'h-64' : 'h-48'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className={`font-semibold mb-1 ${featured ? 'text-xl' : 'text-lg'}`}>
            {story.name}
          </h3>
          <p className="text-sm opacity-90">{story.role} • {story.location}</p>
        </div>
        {story.featured && (
          <div className="absolute top-4 right-4">
            <Star className="h-6 w-6 text-yellow-400" fill="currentColor" />
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start space-x-3 mb-4">
          <Quote className="h-5 w-5 text-coral flex-shrink-0 mt-1" />
          <p className={`text-navy/80 italic leading-relaxed ${
            featured ? 'text-lg' : 'text-base'
          }`}>
            "{story.shortQuote}"
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium text-teal">{story.condition}</span>
            <span className="text-navy/60 mx-2">•</span>
            <span className="text-navy/70">{story.outcome}</span>
          </div>
          <span className="text-xs text-navy/50">
            {new Date(story.date).toLocaleDateString('en-IN')}
          </span>
        </div>
      </div>
    </motion.div>
  );

  const StoryModal = ({ story, onClose }: { story: Story; onClose: () => void }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src={story.image}
              alt={story.name}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors duration-200"
            >
              <X className="h-5 w-5 text-navy" />
            </button>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-2xl font-bold mb-2">{story.name}</h2>
              <p className="text-lg opacity-90">{story.role} • {story.location}</p>
            </div>
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-coral/10 px-3 py-1 rounded-full">
                  <span className="text-coral font-medium text-sm">{story.condition}</span>
                </div>
                <div className="bg-teal/10 px-3 py-1 rounded-full">
                  <span className="text-teal font-medium text-sm">{story.outcome}</span>
                </div>
              </div>
              <p className="text-navy/60 text-sm">
                {new Date(story.date).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <Quote className="h-8 w-8 text-coral mb-4" />
              <p className="text-navy/80 leading-relaxed text-lg">
                "{story.fullStory}"
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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
            <Heart className="h-16 w-16 mx-auto mb-6 text-coral" fill="currentColor" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Stories of Hope and Healing
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Real families sharing their experiences with cord blood banking and treatment. 
              These stories showcase the life-changing impact of preserved stem cells.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Stories Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Star className="h-12 w-12 mx-auto mb-4 text-coral" fill="currentColor" />
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Featured Stories
            </h2>
            <p className="text-xl text-navy/70">
              Inspiring journeys that highlight the power of cord blood preservation
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex items-center justify-center mb-8">
              <button
                onClick={prevStory}
                className="p-3 bg-coral/10 text-coral rounded-full hover:bg-coral/20 transition-colors duration-200 mr-4"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <div className="flex space-x-2">
                {featuredStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentIndex ? 'bg-coral' : 'bg-coral/30'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextStory}
                className="p-3 bg-coral/10 text-coral rounded-full hover:bg-coral/20 transition-colors duration-200 ml-4"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
              >
                <StoryCard story={featuredStories[currentIndex]} featured={true} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* All Stories */}
      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Users className="h-12 w-12 mx-auto mb-4 text-coral" />
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              All Stories
            </h2>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { key: 'all', label: 'All Stories' },
              { key: 'parents', label: 'Parents' },
              { key: 'patients', label: 'Patients' },
              { key: 'doctors', label: 'Medical Professionals' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as typeof filter)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  filter === filterOption.key
                    ? 'bg-coral text-white shadow-lg'
                    : 'bg-white text-navy hover:bg-coral/10 border border-gray-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>

          {filteredStories.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 mx-auto mb-4 text-navy/30" />
              <h3 className="text-xl font-semibold text-navy mb-2">No stories found</h3>
              <p className="text-navy/60">Try selecting a different filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-coral to-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Share Your Story
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Have you been impacted by cord blood banking? Share your experience 
              to inspire and educate other families about this life-saving option.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  // TODO: Connect to story submission form
                }}
                className="px-8 py-4 bg-white text-coral font-semibold rounded-2xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Share Your Story
              </button>
              <a
                href="/learn"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Modal */}
      {selectedStory && (
        <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}
    </div>
  );
};