import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Services from '../components/sections/Services';
import Stats from '../components/sections/Stats';
import Testimonials from '../components/sections/Testimonials';
import { Helmet } from 'react-helmet';

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
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | PaperHouse Construction</title>
        <meta name="description" content="Welcome to PaperHouse Construction, your trusted partner in construction excellence." />
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Enhanced Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-red opacity-95" />
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.1)_50%,_transparent_75%)] bg-[length:20px_20px]" />
          </div>
          
          {/* Enhanced Animated Particles - Reduced Count */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
          
          <motion.div 
            style={{ opacity, scale }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8"
                variants={textVariants}
              >
                <motion.span 
                  variants={letterVariants} 
                  className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 drop-shadow-xl"
                >
                  Building Dreams
                </motion.span>
                <motion.span 
                  variants={letterVariants} 
                  className="block text-primary-red bg-clip-text text-transparent bg-gradient-to-r from-primary-red to-red-400 drop-shadow-xl"
                >
                  Into Reality
                </motion.span>
              </motion.h1>
              <motion.p 
                variants={letterVariants}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Your trusted partner in construction excellence, delivering innovative solutions with precision and passion
              </motion.p>
              <motion.div
                variants={letterVariants}
                className="mt-12 space-x-4"
              >
                <Link
                  to="/contact"
                  className="inline-block bg-primary-red text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Start Your Project
                </Link>
                <Link
                  to="/services"
                  className="inline-block bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Explore Services
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
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
              className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm"
            >
              <motion.div
                animate={{
                  y: [0, 16, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1.5 h-3 bg-white rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Services Section */}
        <Services />

        {/* Stats Section with Fade In */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-0"
        >
          <Stats />
        </motion.div>

        {/* Testimonials Section with Slide In */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Testimonials />
        </motion.div>

        {/* Enhanced CTA Section */}
        <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.1)_50%,_transparent_75%)] bg-[length:20px_20px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Transform Your Space?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                Let's discuss how we can bring your vision to life with our expertise and dedication
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  to="/contact"
                  className="inline-block bg-primary-red text-white px-12 py-5 rounded-full font-semibold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started Today
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
} 