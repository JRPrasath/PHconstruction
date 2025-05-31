import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Services from '../components/sections/Services';
import Stats from '../components/sections/Stats';
import Testimonials from '../components/sections/Testimonials';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-red opacity-95" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              variants={textVariants}
            >
              <motion.span variants={letterVariants} className="block">
                Building Dreams
              </motion.span>
              <motion.span variants={letterVariants} className="block text-primary-red">
                Into Reality
              </motion.span>
            </motion.h1>
            <motion.p 
              variants={letterVariants}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            >
            Your trusted partner in construction excellence
            </motion.p>
            <motion.div
              variants={letterVariants}
              className="mt-8"
            >
            <Link
              to="/contact"
                className="inline-block bg-primary-red text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
                Start Your Project
            </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1 h-2 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <Services />

      {/* Stats Section */}
      <Stats />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-cream-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Let's discuss how we can bring your vision to life
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            <Link
              to="/contact"
                className="inline-block bg-primary-red text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
                Get Started
            </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 