import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

const starVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: i * 0.08, type: 'spring', stiffness: 300 }
  })
};

const Testimonial = ({ 
  quote, 
  author, 
  role, 
  company,
  image,
  rating = 5,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, boxShadow: '0 0 0 0 rgba(0,0,0,0)', borderColor: '#fff' }}
      animate={{ opacity: 1, boxShadow: '0 8px 32px rgba(220,38,38,0.10)', borderColor: '#ef4444' }}
      exit={{ opacity: 0, boxShadow: '0 0 0 0 rgba(0,0,0,0)', borderColor: '#fff' }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, delay }}
      whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(220,38,38,0.18)', borderColor: '#b91c1c' }}
      className="transition-transform border-2 border-transparent rounded-2xl bg-white"
    >
      <Card variant="testimonial">
        {/* Quote Icon */}
        <div className="absolute -top-4 -left-4 text-4xl text-primary-red/20 select-none pointer-events-none">
          "
        </div>

        {/* Rating Stars */}
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <motion.svg
              key={i}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={starVariants}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
        </div>

        {/* Quote Text */}
        <div className="relative mb-6">
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[2.5rem] text-primary-red/10 select-none pointer-events-none leading-none font-serif">“</span>
          <p className="relative z-10 text-base md:text-lg font-medium italic bg-gradient-to-r from-primary-red via-gray-900 to-primary-red bg-clip-text text-transparent drop-shadow-md text-center px-2">
            {quote}
          </p>
        </div>

        {/* Author Info */}
        <div className="flex items-center">
          {image && (
            <motion.img
              src={image}
              alt={author}
              className="w-12 h-12 rounded-full mr-4 object-cover shadow-lg border-2 border-primary-red/30"
              initial={{ scale: 0.7, opacity: 0, boxShadow: '0 0 0 0 #ef4444' }}
              animate={{ scale: 1, opacity: 1, boxShadow: '0 0 0 4px #ef444444' }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.3 }}
            />
          )}
          <div>
            <h4 className="font-semibold text-gray-900">{author}</h4>
            <p className="text-sm text-gray-600">
              {role}
              {company && ` at ${company}`}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Testimonial; 