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
      name: 'Quentin',
      role: '',
      location: '',
      image: '',
      shortQuote: "A Sister's Gift: How Jory's Cord Blood Saved Quentin's Life",
      fullStory: 'At age 4, Quentin was diagnosed with acute lymphoblastic leukemia. His family had stored his newborn sister Jory\'s cord blood—just in case. At age 5, Quentin received a combined transplant using Jory\'s cord blood and placenta stem cells, giving him a crucial second chance. His mother shared how grateful she was that something so often discarded became his lifeline.',
      condition: '',
      outcome: '',
      date: '',
      featured: false
    },
    {
      id: '2',
      name: 'Xiao An',
      role: '',
      location: '',
      image: '',
      shortQuote: "19 Years on Ice: Xiao An's Cord Blood Miracle",
      fullStory: 'Born in China in 2003, Xiao An\'s cord blood was stored "for peace of mind." In 2021—aged 18—he was diagnosed with aplastic anemia. Miraculously, after 19 years in cryo-storage, his own cord blood was used to successfully transplant and restore his health.',
      condition: '',
      outcome: '',
      date: '',
      featured: false
    },
    {
      id: '3',
      name: '',
      role: '',
      location: '',
      image: '',
      shortQuote: "Our Twins Became Life Savers at Birth",
      fullStory: 'We decided to donate our twins cord blood. It didn\'t hurt me or my babies  & would have otherwise been chucked away! The cord blood is collected & goes to someone who is fighting blood cancer - where it can literally give someone a second chance of life. Our babies became life savers at birth. I recommend any "mother\'s to be" to look into doing the same. It\'s a gorgeous thing to do for a stranger in need.',
      condition: '',
      outcome: '',
      date: '',
      featured: false
    },
    {
      id: '4',
      name: 'Kellie Shirley',
      role: '',
      location: '',
      image: '',
      shortQuote: "Giving Back: Kellie Shirley's Cord Blood Donation Story",
      fullStory: 'Kellie Shirley, who donated her twins\' cord blood in 2015.',
      condition: '',
      outcome: '',
      date: '',
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
  // Fallback: if no featured stories, use the first filtered story
  const safeFeaturedStories = featuredStories.length > 0 ? featuredStories : (filteredStories.length > 0 ? [filteredStories[0]] : []);

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
            {story.shortQuote}
          </p>
        </div>
        {/* No condition, outcome, or date */}
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
          className="bg-background-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-text-light">
              <h2 className="text-2xl font-semibold mb-1">{story.name}</h2>
              <p className="text-lg opacity-90">{story.role} • {story.location}</p>
            </div>
            <button
              onClick={onClose}
              className="fixed top-8 right-8 z-50 bg-background-card/90 text-plum p-3 rounded-full hover:bg-pink-primary hover:text-text-light transition-colors duration-200 shadow-lg"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-6 pt-16">
            <div className="flex items-start space-x-3 mb-6">
              <Quote className="h-6 w-6 text-pink-primary flex-shrink-0 mt-1" />
              <p className="text-lg text-text-body leading-relaxed">
                {story.fullStory}
              </p>
            </div>
            {/* No condition, outcome, or date in modal */}
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

      {/* Story Modal */}
      {selectedStory && (
        <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}
    </div>
  );
};