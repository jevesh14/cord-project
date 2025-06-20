import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Play, Download, ExternalLink, BookOpen, Video, FileText, HelpCircle } from 'lucide-react';

export const Learn = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const faqData = [
    {
      question: "What is umbilical cord blood and why is it valuable?",
      answer: "Umbilical cord blood is the blood that remains in the umbilical cord and placenta after childbirth. It contains hematopoietic stem cells (HSCs) that can develop into red blood cells, white blood cells, and platelets. These cells are genetically unique to your baby and family, making them valuable for treating blood disorders, immune system diseases, and certain cancers. Cord blood stem cells are more flexible and have a lower risk of rejection compared to bone marrow transplants."
    },
    {
      question: "What diseases can cord blood stem cells treat?",
      answer: "Cord blood stem cells have been used to treat over 80 diseases including leukemia, lymphoma, sickle cell anemia, thalassemia, immune deficiencies, metabolic disorders, and certain genetic diseases. They're particularly effective for blood cancers and inherited blood disorders. Research is ongoing for treating conditions like cerebral palsy, autism, diabetes, and heart disease. The FDA has approved cord blood for treating specific blood and immune system disorders."
    },
    {
      question: "What's the difference between public and private cord blood banking?",
      answer: "Private banking stores your baby's cord blood exclusively for your family's use, with costs ranging from ₹50,000-₹1,50,000 initially plus annual storage fees. Public banking donates cord blood to a public registry for anyone who needs a match, usually free of charge. Private banking ensures immediate family access, while public banking helps others and may provide free access if your family needs it later. Many families choose public donation due to cost and the altruistic benefit."
    },
    {
      question: "Is cord blood collection safe for mother and baby?",
      answer: "Yes, cord blood collection is completely safe and painless. It occurs after the baby is born and the umbilical cord is clamped and cut, so there's no risk to mother or baby. The collection takes only 3-5 minutes and doesn't interfere with the birthing process. The procedure follows strict medical protocols and is performed by trained healthcare professionals. No anesthesia or pain medication is required."
    },
    {
      question: "How long can cord blood be stored and remain viable?",
      answer: "Cord blood can be stored indefinitely when properly preserved at -196°C in liquid nitrogen. Studies have shown that cord blood stored for over 25 years remains viable and effective. The key factors for long-term viability are proper processing, cryopreservation techniques, and storage conditions. Most banks guarantee storage for 21-25 years, but the cells can theoretically last much longer with proper maintenance."
    },
    {
      question: "What are the success rates of cord blood transplants?",
      answer: "Cord blood transplant success rates vary by disease type and patient factors. For blood cancers like leukemia, success rates range from 60-80% depending on disease stage and patient age. For inherited disorders, success rates can be 70-90%. Cord blood transplants have advantages over bone marrow transplants including lower risk of graft-versus-host disease and greater tolerance for partial HLA matches. Success rates continue to improve with advances in medical technology."
    },
    {
      question: "How much does cord blood banking cost in India?",
      answer: "Private cord blood banking in India costs ₹50,000-₹1,50,000 for initial processing and storage, plus ₹5,000-₹15,000 annually for continued storage. Public banking is typically free. Some private banks offer payment plans, discounts for multiple children, or family packages. Insurance coverage varies, but some policies may cover cord blood banking for families with a history of treatable conditions. Many banks offer financial assistance programs."
    },
    {
      question: "Can cord blood help other family members?",
      answer: "Yes, cord blood can potentially help siblings, parents, and other family members. Siblings have a 25% chance of being a perfect match and a 50% chance of being a partial match. Parents and other relatives may also be compatible depending on genetic similarity. Cord blood is more forgiving of HLA mismatches compared to bone marrow, making it more likely to be usable by family members. Some families bank cord blood specifically for existing family members with treatable conditions."
    }
  ];

  const mythsVsFacts = [
    {
      myth: "Cord blood collection is painful and risky for the baby",
      fact: "Cord blood collection is completely painless and risk-free. It occurs after the baby is born and the cord is already clamped and cut. The procedure takes only 3-5 minutes and doesn't interfere with immediate skin-to-skin contact or breastfeeding."
    },
    {
      myth: "Cord blood banking is only for wealthy families",
      fact: "Public cord blood banking is completely free and available to all families. Private banking costs ₹50,000-₹1,50,000 initially, but many banks offer payment plans, discounts, and financial assistance. Some insurance policies also cover cord blood banking."
    },
    {
      myth: "Cord blood can only help the baby it came from",
      fact: "Cord blood can potentially help siblings (25% perfect match chance), parents, and other family members. It's more forgiving of HLA mismatches than bone marrow transplants, making it more likely to be usable by relatives."
    },
    {
      myth: "Cord blood loses its effectiveness over time",
      fact: "Properly stored cord blood remains viable indefinitely. Studies show cord blood stored for over 25 years maintains its therapeutic potential. The key is proper processing and cryopreservation at -196°C."
    },
    {
      myth: "Cord blood transplants are experimental and unproven",
      fact: "Cord blood transplants are FDA-approved and have been used successfully for over 30 years. They've treated over 80 diseases including leukemia, lymphoma, sickle cell anemia, and immune disorders. Over 40,000 transplants have been performed worldwide."
    },
    {
      myth: "Public banking means you lose access to your baby's cord blood",
      fact: "While public banking donates cord blood to help others, many public banks offer 'directed donation' where you can reserve the cord blood for your family if there's a medical need. Public banking helps others while potentially benefiting your family."
    }
  ];

  const videos = [
    {
      id: "1",
      title: "Understanding Cord Blood Banking",
      description: "A comprehensive introduction to cord blood and its medical applications",
      thumbnail: "https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "5:23"
    },
    {
      id: "2",
      title: "The Collection Process",
      description: "Step-by-step guide to how cord blood is safely collected",
      thumbnail: "https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "3:45"
    },
    {
      id: "3",
      title: "Success Stories",
      description: "Real families share their cord blood treatment experiences",
      thumbnail: "https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "8:12"
    }
  ];

  const infographics = [
    {
      title: "Cord Blood vs Bone Marrow",
      description: "Comparing treatment options and advantages",
      image: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=400",
      downloadUrl: "#"
    },
    {
      title: "Diseases Treated by Cord Blood",
      description: "Complete list of treatable conditions",
      image: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=400",
      downloadUrl: "#"
    },
    {
      title: "The Banking Process",
      description: "From collection to storage timeline",
      image: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=400",
      downloadUrl: "#"
    }
  ];

  const articles = [
    {
      title: "The Science Behind Stem Cells",
      description: "Understanding how cord blood stem cells work and their therapeutic potential",
      readTime: "5 min read",
      tags: ["Science", "Medical"],
      date: "2024-01-15"
    },
    {
      title: "Making the Banking Decision",
      description: "Factors to consider when choosing between public and private banking",
      readTime: "7 min read",
      tags: ["Decision Making", "Family Planning"],
      date: "2024-01-10"
    },
    {
      title: "Cost Analysis and Insurance",
      description: "Understanding the financial aspects of cord blood banking",
      readTime: "6 min read",
      tags: ["Finance", "Insurance"],
      date: "2024-01-05"
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const toggleFlipCard = (index: number) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(index)) {
      newFlipped.delete(index);
    } else {
      newFlipped.add(index);
    }
    setFlippedCards(newFlipped);
  };

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
            <BookOpen className="h-16 w-16 mx-auto mb-6 text-coral" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learn About Cord Blood Banking
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Get comprehensive information about umbilical cord blood, its benefits, 
              and how it can impact your family's future health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gradient-to-br from-white to-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-coral/10 rounded-full mb-6">
              <HelpCircle className="h-8 w-8 text-coral" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-navy/70 max-w-3xl mx-auto">
              Get comprehensive answers to the most common questions about cord blood banking, 
              from collection to storage and everything in between.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-coral/20 rounded-2xl hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-coral/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-coral font-semibold text-sm">{index + 1}</span>
                    </div>
                    <span className="font-semibold text-navy text-lg leading-relaxed">{faq.question}</span>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {activeAccordion === index ? (
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronUp className="h-6 w-6 text-coral" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-6 w-6 text-navy/60 group-hover:text-coral transition-colors duration-200" />
                      </motion.div>
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {activeAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 ml-12">
                        <div className="border-l-4 border-coral/30 pl-6">
                          <p className="text-navy/80 leading-relaxed text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          {/* FAQ Footer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-navy mb-3">
                Still have questions?
              </h3>
              <p className="text-navy/70 mb-4">
                Our comprehensive resources and expert information are here to help you make the best decision for your family.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/banks"
                  className="px-6 py-3 bg-coral text-white font-medium rounded-xl hover:bg-coral/90 transition-colors duration-200"
                >
                  Find Cord Blood Banks
                </a>
                <a
                  href="/stories"
                  className="px-6 py-3 bg-navy/10 text-navy font-medium rounded-xl hover:bg-navy/20 transition-colors duration-200"
                >
                  Read Success Stories
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Myths vs Facts */}
      <section id="myths" className="py-16 bg-gradient-to-br from-ivory to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-coral/10 rounded-full mb-6">
              <HelpCircle className="h-8 w-8 text-coral" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Myths vs Facts
            </h2>
            <p className="text-xl text-navy/70 mb-8 max-w-3xl mx-auto">
              Discover the truth behind common misconceptions about cord blood banking. 
              Click on each card to reveal the facts that matter most to your family.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mythsVsFacts.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative h-80 cursor-pointer group"
                onClick={() => toggleFlipCard(index)}
              >
                <motion.div
                  animate={{ rotateY: flippedCards.has(index) ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-full h-full relative preserve-3d"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Myth Side */}
                  <div 
                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-coral to-coral/80 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-center border-2 border-coral/20"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-4 text-white">MYTH</h3>
                      <p className="text-lg leading-relaxed text-white mb-4 font-medium">{item.myth}</p>
                      <div className="flex items-center justify-center space-x-2 text-white/90 text-sm">
                        <span>Click to reveal the truth</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fact Side */}
                  <div 
                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-teal to-teal/80 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-center border-2 border-teal/20 rotate-y-180"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-4 text-white">FACT</h3>
                      <p className="text-lg leading-relaxed text-white mb-4 font-medium">{item.fact}</p>
                      <div className="flex items-center justify-center space-x-2 text-white/90 text-sm">
                        <motion.div
                          animate={{ x: [0, -5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ←
                        </motion.div>
                        <span>Click to see the myth</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
          
          {/* Additional info box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-navy mb-3">
                💡 Did You Know?
              </h3>
              <p className="text-navy/70 leading-relaxed">
                Cord blood transplants have been performed successfully for over 30 years, with over 40,000 transplants worldwide. 
                The first cord blood transplant was performed in 1988, and since then, the technology has saved countless lives 
                and continues to advance with ongoing research and clinical trials.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Video className="h-12 w-12 mx-auto mb-4 text-coral" />
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Educational Videos
            </h2>
            <p className="text-xl text-navy/70">
              Watch informative videos about cord blood banking and treatments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                onClick={() => {
                  // TODO: Connect to video player or YouTube integration
                  setSelectedVideo(video.id);
                }}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="h-16 w-16 text-white" fill="currentColor" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-navy mb-2">{video.title}</h3>
                  <p className="text-navy/70 text-sm">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infographics */}
      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Visual Learning Resources
            </h2>
            <p className="text-xl text-navy/70">
              Download comprehensive infographics and visual guides
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infographics.map((infographic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative">
                  <img
                    src={infographic.image}
                    alt={infographic.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Download className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-navy mb-2">{infographic.title}</h3>
                  <p className="text-navy/70 text-sm mb-4">{infographic.description}</p>
                  <button
                    onClick={() => {
                      // TODO: Connect to actual download functionality
                    }}
                    className="w-full bg-coral text-white py-2 px-4 rounded-lg hover:bg-coral/90 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <FileText className="h-12 w-12 mx-auto mb-4 text-coral" />
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              In-Depth Articles
            </h2>
            <p className="text-xl text-navy/70">
              Comprehensive guides and detailed information about cord blood banking
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
                onClick={() => {
                  // TODO: Connect to article detail page
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-navy/60">{article.date}</span>
                  <span className="text-sm text-coral font-medium">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-navy mb-3 group-hover:text-coral transition-colors duration-200">
                  {article.title}
                </h3>
                <p className="text-navy/70 mb-4 text-sm leading-relaxed">{article.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-coral/10 text-coral text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};