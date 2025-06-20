import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Heart, Shield, Users, BookOpen, Search, Calendar } from 'lucide-react';

export const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Heart,
      title: 'Life-Saving Potential',
      description: 'Umbilical cord blood contains powerful stem cells that can treat over 80 diseases',
      color: 'coral'
    },
    {
      icon: Shield,
      title: 'Future Protection',
      description: 'Secure your family\'s health with preserved cord blood for potential future treatments',
      color: 'teal'
    },
    {
      icon: Users,
      title: 'Family Benefits',
      description: 'Cord blood can potentially help siblings and family members in need of treatment',
      color: 'lavender'
    }
  ];

  const quickActions = [
    {
      title: 'Learn More',
      description: 'Understand cord blood banking',
      path: '/learn',
      icon: BookOpen,
      color: 'bg-coral'
    },
    {
      title: 'Find Cord Banks',
      description: 'Locate nearby cord blood banks',
      path: '/locator',
      icon: Search,
      color: 'bg-teal'
    },
    {
      title: 'Read Stories',
      description: 'Real families, real impact',
      path: '/stories',
      icon: Users,
      color: 'bg-navy'
    },
    {
      title: 'Upcoming Events',
      description: 'Join awareness programs',
      path: '/events',
      icon: Calendar,
      color: 'bg-lavender'
    }
  ];

  const getFeatureClasses = (color: string) => {
    const colorMap = {
      coral: 'bg-coral/10',
      teal: 'bg-teal/10',
      lavender: 'bg-lavender/10'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-coral/10';
  };

  const getTextClasses = (color: string) => {
    const colorMap = {
      coral: 'text-coral',
      teal: 'text-teal',
      lavender: 'text-lavender'
    };
    return colorMap[color as keyof typeof colorMap] || 'text-coral';
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-navy/90 to-navy/80">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-coral/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Heart className="h-16 w-16 mx-auto mb-6 text-coral animate-pulse" fill="currentColor" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Every Drop Has a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-teal">
                Future
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              Discover the life-saving potential of umbilical cord blood. 
              Preserve today's miracle for tomorrow's hope.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link
              to="/learn"
              className="px-8 py-4 bg-coral text-white font-semibold rounded-2xl hover:bg-coral/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Learn More
            </Link>
            <Link
              to="/locator"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              Find Cord Bank
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="animate-bounce"
          >
            <ChevronDown className="h-8 w-8 text-white/60 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Why Cord Blood Banking Matters
            </h2>
            <p className="text-xl text-navy/70 max-w-3xl mx-auto">
              Understanding the science and potential behind umbilical cord blood preservation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
              >
                <div className={`inline-flex p-4 rounded-2xl mb-6 ${getFeatureClasses(feature.color)} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 ${getTextClasses(feature.color)}`} />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-4">{feature.title}</h3>
                <p className="text-navy/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Take Action Today
            </h2>
            <p className="text-xl text-navy/70 max-w-3xl mx-auto">
              Explore resources, find support, and connect with the cord blood community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={action.path}
                  className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100"
                >
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${action.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-coral transition-colors duration-300">
                    {action.title}
                  </h3>
                  <p className="text-navy/70 text-sm">{action.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-coral to-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Learn More?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join thousands of families who have already discovered the potential of cord blood banking. 
              Your journey to understanding starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/learn"
                className="px-8 py-4 bg-white text-coral font-semibold rounded-2xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Start Learning
              </Link>
              <Link
                to="/banks"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                Browse Cord Banks
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};