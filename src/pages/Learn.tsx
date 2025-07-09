import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Play, Download, ExternalLink, BookOpen, Video, FileText, HelpCircle, Phone, Mail } from 'lucide-react';

// Typewriter effect with typing and deleting
function useTypewriterDelete(words: string[], speed = 80, pause = 1200, delSpeed = 40) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === 'typing') {
      if (displayed.length < words[index].length) {
        timeout = setTimeout(() => setDisplayed(words[index].slice(0, displayed.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pause);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 400);
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), delSpeed);
      } else {
        setIndex((index + 1) % words.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, index, words, speed, pause, delSpeed]);
  return displayed;
}

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
    { myth: '"Cord blood is the same as regular blood"', fact: 'It\'s not. UCB is rich in stem cells, which have the unique ability to form new blood and immune cells — making it useful for treating serious diseases.' },
    { myth: '"It\'s risky or painful for the baby."', fact: 'It\'s collected after birth and cord cutting. Safe and painless.' },
    { myth: '"Only my baby can use it."', fact: 'It can help siblings or even unrelated patients.' },
    { myth: '"Public donation isn\'t available in India."', fact: 'It is — through selected hospitals and public banks. Awareness is just low.' },
    { myth: '"It\'s not worth it if I\'m not storing it for my child."', fact: 'Even if your child may never need it, your donation could save someone else\'s life. Public donation is a selfless act of medical generosity.' },
    { myth: '"It\'s just a trend — will it even be useful years from now?"', fact: 'Cord blood use is expanding. Stem cell therapies are being researched for autism, cerebral palsy, and more. Banking or donating is an investment in future medicine.' },
    { myth: '"It\'s too complicated — I don\'t want extra stress during delivery."', fact: 'The collection process is handled by trained staff and doesn\'t interrupt your birth experience. Just a simple consent form and coordination with your doctor are enough.' },
    { myth: "It's painful for the baby.", fact: "It's done after the cord is cut. Painless." },
    { myth: "It's complicated and risky.", fact: "It's simple, safe, and guided by doctors." },
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

  const typewriterText = useTypewriterDelete([
    "Every Drop, Someone's Tomorrow",
    "Born Today. Saving Tomorrow."
  ], 60, 1600, 40);

  return (
    <div className="min-h-screen bg-background-main pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-plum to-plum/90 text-text-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <BookOpen className="h-16 w-16 mx-auto mb-6 text-pink-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-2 min-h-[3.5rem]">
              <span
                className="inline-block border-r-2 border-pink-primary pr-1 animate-pulse"
                style={{ minWidth: '1ch' }}
              >
                {typewriterText}
              </span>
            </h1>
            <p className="text-xl text-text-light/90 max-w-3xl mx-auto">
              Get comprehensive information about umbilical cord blood, its benefits, 
              and how it can impact your family's future health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gradient-to-br from-background-card to-background-main">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-primary/10 rounded-full mb-6">
              <HelpCircle className="h-8 w-8 text-pink-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-plum mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-text-body max-w-3xl mx-auto">
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
                className="bg-background-card rounded-2xl shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-plum pr-8">{faq.question}</h3>
                  {activeAccordion === index ? (
                    <ChevronUp className="h-5 w-5 text-pink-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-pink-primary flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {activeAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-text-body">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Myths vs Facts Section */}
      <section id="myths" className="py-16 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-plum mb-4">
              Myths vs Facts
            </h2>
            <p className="text-xl text-text-body max-w-3xl mx-auto">
              Let's clear up some common misconceptions about cord blood banking
            </p>
          </motion.div>

          {/* Main myths vs facts flip cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {mythsVsFacts.map((item, index) => {
              const isFlipped = flippedCards.has(index);
              // Remove double quotes from myth and fact
              const myth = item.myth.replace(/^"|"$/g, '');
              const fact = item.fact.replace(/^"|"$/g, '');
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex justify-center items-stretch cursor-pointer"
                  style={{ perspective: 1200 }}
                  onClick={() => toggleFlipCard(index)}
                >
                  <div
                    className={`w-full max-w-xs min-h-[220px] [transform-style:preserve-3d] transition-transform duration-700 rounded-2xl shadow-lg border-2 ${isFlipped ? 'rotate-y-180' : ''} ${isFlipped ? 'bg-pink-primary border-pink-primary' : 'bg-background-card border-pink-primary/20'}`}
                  >
                    {/* Front (Myth) */}
                    <div className={`absolute inset-0 w-full h-full px-6 py-6 rounded-2xl flex flex-col justify-center items-start backface-hidden ${isFlipped ? 'invisible' : 'visible'}`} style={{ backfaceVisibility: 'hidden' }}>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-pink-primary">Myth</h3>
                      </div>
                      <p className="text-text-body">{myth}</p>
                    </div>
                    {/* Back (Fact) */}
                    <div className={`absolute inset-0 w-full h-full px-6 py-6 rounded-2xl flex flex-col justify-center items-start backface-hidden ${isFlipped ? 'visible' : 'invisible'}`} style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-text-light">Fact</h3>
                      </div>
                      <p className="text-text-light/90">{fact}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Educational Videos Section */}
      <section className="py-16 bg-background-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-primary/10 rounded-full mb-6">
              <Video className="h-8 w-8 text-pink-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-plum mb-4">
              Educational Videos
            </h2>
            <p className="text-xl text-text-body max-w-3xl mx-auto">
              Watch our informative videos to learn more about cord blood banking
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background-card rounded-2xl overflow-hidden shadow-lg group"
              >
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setSelectedVideo(video.id)}
                    className="absolute inset-0 flex items-center justify-center bg-plum/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-pink-primary text-text-light">
                      <Play className="h-8 w-8" />
                    </div>
                  </button>
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-plum/80 text-text-light text-sm rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-plum mb-2">{video.title}</h3>
                  <p className="text-text-body">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Resources Section */}
      <section className="py-16 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-primary/10 rounded-full mb-6">
              <Download className="h-8 w-8 text-pink-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-plum mb-4">
              Downloadable Resources
            </h2>
            <p className="text-xl text-text-body max-w-3xl mx-auto">
              Access our collection of infographics and educational materials
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infographics.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background-card rounded-2xl overflow-hidden shadow-lg group"
              >
                <div className="relative aspect-video">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-plum/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href={resource.downloadUrl}
                      className="px-6 py-3 bg-pink-primary text-text-light rounded-full flex items-center space-x-2 hover:bg-pink-hover transition-colors duration-300"
                    >
                      <Download className="h-5 w-5" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-plum mb-2">{resource.title}</h3>
                  <p className="text-text-body">{resource.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* In-Depth Articles Section */}
      <section className="py-16 bg-background-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-primary/10 rounded-full mb-6">
              <FileText className="h-8 w-8 text-pink-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-plum mb-4">
              In-Depth Articles
            </h2>
            <p className="text-xl text-text-body max-w-3xl mx-auto">
              Explore detailed articles about cord blood banking and its implications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-pink-soft/10 text-pink-primary text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-text-body text-sm">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-plum mb-2">{article.title}</h3>
                <p className="text-text-body mb-4">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-text-body text-sm">{article.date}</span>
                  <button className="flex items-center space-x-1 text-pink-primary hover:text-pink-hover transition-colors duration-200">
                    <span>Read More</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 bg-background-alt">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-plum mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-text-body mb-8">
              Our team of experts is here to help you make an informed decision about 
              cord blood banking. Get in touch with us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:9116083443"
                className="px-8 py-4 bg-pink-primary text-text-light font-semibold rounded-2xl hover:bg-pink-hover hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>Call Us: 9116083443</span>
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=advikasahney123@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-background-card text-plum font-semibold rounded-2xl border border-pink-soft/20 hover:bg-pink-soft/10 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Mail className="h-5 w-5" />
                <span>Email Us</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How You Can Help Section (standalone) */}
      <section id="how-you-can-help" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-plum mb-4">
              How You Can Help
            </h2>
            <p className="text-xl text-text-body max-w-3xl mx-auto mb-8">
              You can make a difference by spreading awareness and supporting cord blood donation.
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <ul className="list-disc ml-8 space-y-2 text-base mb-6 text-left">
              <li>Ask your doctor if cord blood donation is available at your hospital.</li>
              <li>Choose public donation—it's free, ethical, and life-saving.</li>
              <li>Join the movement. Visit our site, watch the stories, and share the message. Spread awareness. One family's birth can save another's.</li>
            </ul>
            <div className="mb-2 text-lg font-semibold">Safe</div>
            <div className="mb-2 text-lg font-semibold">Painless</div>
            <div className="mb-2 text-lg font-semibold">Takes only minutes after birth</div>
            <div className="text-lg">It can become a <span className="font-bold">second chance at life</span> for someone in need.</div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* Add the following CSS to your global stylesheet (e.g., src/index.css):
.rotate-y-180 { transform: rotateY(180deg); }
.backface-hidden { backface-visibility: hidden; } */