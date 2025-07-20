import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const values = [
  {
    title: "Excellence",
    description: "We are committed to delivering the highest standards of quality in every aspect of our work.",
    icon: "⭐"
  },
  {
    title: "Innovation",
    description: "We continuously seek new and better ways to solve construction challenges.",
    icon: "💡"
  },
  {
    title: "Integrity",
    description: "We conduct our business with honesty, transparency, and ethical practices.",
    icon: "🤝"
  },
  {
    title: "Sustainability",
    description: "We are dedicated to environmentally conscious construction practices.",
    icon: "🌱"
  }
];

const strengths = [
  {
    title: "Expert Craftsmanship",
    description: "Our skilled team brings years of experience in both traditional and modern construction techniques.",
    icon: "🏗️"
  },
  {
    title: "End-to-End Service",
    description: "From initial design to final construction, we handle every aspect of your project.",
    icon: "🔄"
  },
  {
    title: "Quality Materials",
    description: "We use only premium materials and work with trusted suppliers to ensure durability.",
    icon: "✨"
  },
  {
    title: "Timely Delivery",
    description: "We respect your time and deliver projects on schedule without compromising quality.",
    icon: "⏱️"
  },
  {
    title: "Cost-Effective Solutions",
    description: "We optimize resources to provide the best value while maintaining high standards.",
    icon: "💰"
  },
  {
    title: "Personalized Approach",
    description: "Every project is unique, and we tailor our services to meet your specific needs.",
    icon: "🎯"
  }
];

export default function About() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <>
      <Helmet>
        <title>About | PaperHouse Construction</title>
        <meta name="description" content="Learn more about PaperHouse Construction, our mission, and our team." />
        <link rel="canonical" href="https://yourdomain.com/about" />
      </Helmet>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-red opacity-95" />
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.1)_50%,_transparent_75%)] bg-[length:20px_20px]" />
          </div>

          <motion.div 
            style={{ opacity, scale }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  Our Story
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Building excellence through innovation and dedication since 2019
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Mission Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(0,0,0,0.1)_50%,_transparent_75%)] bg-[length:20px_20px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Our Mission
                </h2>
                <div className="space-y-6">
                  <p className="text-xl text-gray-600 leading-relaxed">
                    At PHC, we're dedicated to transforming spaces and creating lasting value through innovative construction solutions. Our commitment to excellence and sustainability drives everything we do.
                  </p>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    We believe in building not just structures, but relationships and trust with our clients. Every project is an opportunity to exceed expectations and create something extraordinary.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src="/images/about/mission.png"
                    alt="Our Mission"
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(0,0,0,0.1)_50%,_transparent_75%)] bg-[length:20px_20px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The fundamental principles that guide our every decision and action
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(0,0,0,0.1)_50%,_transparent_75%)] bg-[length:20px_20px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Us
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The practical advantages and unique benefits we bring to your project
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {strengths.map((strength, index) => (
                <motion.div
                  key={strength.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {strength.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {strength.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {strength.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-red relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.1)_50%,_transparent_75%)] bg-[length:20px_20px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Work Together?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Let's discuss how we can bring your vision to life
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-block bg-white text-primary-red px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
} 