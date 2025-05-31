import React from 'react';
import { motion } from 'framer-motion';

export default function Section({ 
  children, 
  className = '', 
  background = 'white',
  padding = 'py-20',
  animate = true 
}) {
  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900',
    cream: 'bg-cream-white'
  };

  const baseClasses = `${padding} ${bgColors[background]}`;
  const finalClasses = `${baseClasses} ${className}`;

  if (animate) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={finalClasses}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </motion.section>
    );
  }

  return (
    <section className={finalClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
} 