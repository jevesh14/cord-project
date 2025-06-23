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
      className={`bg-background-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group ${
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
        <div className="absolute bottom-4 left-4 text-text-light">
          <h3 className={`font-semibold mb-1 ${featured ? 'text-xl' : 'text-lg'}`}>
            {story.name}
          </h3>
          <p className="text-sm opacity-90">{story.role} • {story.location}</p>
        </div>
        {story.featured && (
          <div className="absolute top-4 right-4">
            <Star className="h-6 w-6 text-pink-primary" fill="currentColor" />
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start space-x-3 mb-4">
          <Quote className="h-5 w-5 text-pink-primary flex-shrink-0 mt-1" />
          <p className={`text-text-body italic leading-relaxed ${
            featured ? 'text-lg' : 'text-base'
          }`}>
            "{story.shortQuote}"
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium text-pink-primary">{story.condition}</span>
            <span className="text-text-body/60 mx-2">•</span>
            <span className="text-text-body">{story.outcome}</span>
          </div>
          <span className="text-xs text-text-body/50">
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
          className="bg-background-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src={story.image}
              alt={story.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-text-light">
              <h2 className="text-2xl font-semibold mb-1">{story.name}</h2>
              <p className="text-lg opacity-90">{story.role} • {story.location}</p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-background-card/90 text-plum p-2 rounded-full hover:bg-pink-primary hover:text-text-light transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <div className="flex items-start space-x-3 mb-6">
              <Quote className="h-6 w-6 text-pink-primary flex-shrink-0 mt-1" />
              <p className="text-lg text-text-body leading-relaxed">
                "{story.fullStory}"
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-pink-soft/10 pt-4">
              <div>
                <p className="text-sm font-medium text-plum mb-1">Condition</p>
                <p className="text-pink-primary">{story.condition}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-plum mb-1">Outcome</p>
                <p className="text-pink-primary">{story.outcome}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-plum mb-1">Date</p>
                <p className="text-text-body">
                  {new Date(story.date).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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
            <Heart className="h-16 w-16 mx-auto mb-6 text-pink-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-light mb-6">
              Success Stories
            </h1>
            <p className="text-xl text-text-light/90 max-w-3xl mx-auto">
              Real stories from families, patients, and doctors who have experienced the life-changing impact of cord blood banking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Stories Carousel */}
      <section className="py-12 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-plum">Featured Stories</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={prevStory}
                className="p-2 rounded-xl bg-background-card text-plum hover:bg-pink-primary hover:text-text-light transition-colors duration-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextStory}
                className="p-2 rounded-xl bg-background-card text-plum hover:bg-pink-primary hover:text-text-light transition-colors duration-200"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <StoryCard story={featuredStories[currentIndex]} featured />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* All Stories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-plum">All Stories</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-text-body" />
                <span className="text-sm font-medium text-plum">Filter by:</span>
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as typeof filter)}
                className="px-4 py-2 bg-background-card border border-pink-soft/20 rounded-xl text-plum focus:outline-none focus:ring-2 focus:ring-pink-primary/20"
              >
                <option value="all">All Stories</option>
                <option value="parents">Parents</option>
                <option value="patients">Patients</option>
                <option value="doctors">Medical Professionals</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>

          {filteredStories.length === 0 && (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 mx-auto mb-4 text-pink-soft" />
              <h3 className="text-xl font-semibold text-plum mb-2">
                No stories found
              </h3>
              <p className="text-text-body">
                Try adjusting your filter to see more stories.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="py-16 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-plum to-plum/90 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-text-light mb-4">
                Share Your Story
              </h2>
              <p className="text-text-light/90 mb-8">
                Has cord blood banking made a difference in your life? Share your experience and inspire others.
              </p>
              <button className="inline-flex items-center space-x-2 px-6 py-3 bg-pink-primary text-text-light rounded-xl hover:bg-pink-hover transition-colors duration-200">
                <Heart className="h-5 w-5" />
                <span>Tell Your Story</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Modal */}
      {selectedStory && (
        <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}
    </div>
  );
};