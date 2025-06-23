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
      color: 'primary'
    },
    {
      icon: Shield,
      title: 'Future Protection',
      description: 'Secure your family\'s health with preserved cord blood for potential future treatments',
      color: 'soft'
    },
    {
      icon: Users,
      title: 'Family Benefits',
      description: 'Cord blood can potentially help siblings and family members in need of treatment',
      color: 'vivid'
    }
  ];

  const quickActions = [
    {
      title: 'Learn More',
      description: 'Understand cord blood banking',
      path: '/learn',
      icon: BookOpen,
      color: 'bg-pink-primary'
    },
    {
      title: 'Find Cord Banks',
      description: 'Locate nearby cord blood banks',
      path: '/locator',
      icon: Search,
      color: 'bg-pink-soft'
    },
    {
      title: 'Read Stories',
      description: 'Real families, real impact',
      path: '/stories',
      icon: Users,
      color: 'bg-plum'
    },
    {
      title: 'Upcoming Events',
      description: 'Join awareness programs',
      path: '/events',
      icon: Calendar,
      color: 'bg-pink-vivid'
    }
  ];

  const getFeatureClasses = (color: string) => {
    const colorMap = {
      primary: 'bg-pink-primary/10',
      soft: 'bg-pink-soft/10',
      vivid: 'bg-pink-vivid/10'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-pink-primary/10';
  };

  const getTextClasses = (color: string) => {
    const colorMap = {
      primary: 'text-pink-primary',
      soft: 'text-pink-soft',
      vivid: 'text-pink-vivid'
    };
    return colorMap[color as keyof typeof colorMap] || 'text-pink-primary';
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-plum via-plum/90 to-plum/80">
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
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-primary/10 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-soft/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Heart className="h-16 w-16 mx-auto mb-6 text-pink-primary animate-pulse" fill="currentColor" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-light mb-6 leading-tight">
              Every Drop Has a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-primary to-pink-soft">
                Future
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-text-light/90 mb-8 max-w-4xl mx-auto leading-relaxed">
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
              className="px-8 py-4 bg-pink-primary text-text-light font-semibold rounded-2xl hover:bg-pink-hover hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Learn More
            </Link>
            <Link
              to="/locator"
              className="px-8 py-4 bg-text-light/10 text-text-light font-semibold rounded-2xl border border-text-light/20 hover:bg-text-light/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
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
            <ChevronDown className="h-8 w-8 text-text-light/60 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-plum mb-4">
              Why Cord Blood Banking Matters
            </h2>
            <p className="text-xl text-text-body max-w-3xl mx-auto">
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
                className="bg-background-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
              >
                <div className={`inline-flex p-4 rounded-2xl mb-6 ${getFeatureClasses(feature.color)} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 ${getTextClasses(feature.color)}`} />
                </div>
                <h3 className="text-xl font-semibold text-plum mb-4">{feature.title}</h3>
                <p className="text-text-body leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-20 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-plum mb-4">
              Take the Next Step
            </h2>
            <p className="text-xl text-text-body max-w-3xl mx-auto">
              Explore resources and connect with cord blood banking experts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={action.path}
                  className="block p-6 bg-background-card rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className={`${action.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                    <action.icon className="h-6 w-6 text-text-light" />
                  </div>
                  <h3 className="text-lg font-semibold text-plum mb-2">{action.title}</h3>
                  <p className="text-text-body">{action.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};