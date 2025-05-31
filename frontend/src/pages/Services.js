import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import designImage from '../assets/images/design.jpg';

const services = [
  {
    title: "Residential Construction",
    description: "Custom homes and residential projects built to your specifications.",
    icon: "🏠",
    features: [
      "Custom home design",
      "Renovations",
      "Additions",
      "Interior remodeling"
    ],
    image: "/images/services/residential.jpg"
  },
  {
    title: "Commercial Projects",
    description: "Modern commercial spaces that drive business success.",
    icon: "🏢",
    features: [
      "Office buildings",
      "Retail spaces",
      "Restaurants",
      "Hotels"
    ],
    image: "/images/services/commercial.jpg"
  },
  {
    title: "Design Studio",
    description: "Creative design solutions to visualize your projects.",
    icon: "🎨",
    features: [
      "Architectural design",
      "Interior design",
      "3D rendering",
      "Space planning"
    ],
    image: designImage
  },
  {
    title: "Renovation & Remodeling",
    description: "Transform existing spaces into something extraordinary.",
    icon: "🔨",
    features: [
      "Structural renovations",
      "Interior updates",
      "Exterior improvements",
      "Historical restoration"
    ],
    image: "/images/services/renovation.jpg"
  }
];

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={service.image}
          alt={service.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <div className="text-4xl mb-4">{service.icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <ul className="space-y-2 mb-6">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 text-primary-red mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className="inline-flex items-center text-primary-red font-semibold hover:text-red-700 transition-colors"
        >
          Learn More
          <svg
            className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

const processSteps = [
  {
    title: "Consultation",
    description: "We discuss your needs and vision for the project.",
    icon: "🤝"
  },
  {
    title: "Planning",
    description: "Detailed planning and design development.",
    icon: "📋"
  },
  {
    title: "Execution",
    description: "Professional implementation of the project.",
    icon: "🏗️"
  },
  {
    title: "Completion",
    description: "Final inspection and handover.",
    icon: "✅"
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Our Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive construction solutions for every need
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How we bring your vision to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Let's discuss how we can help bring your vision to life
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