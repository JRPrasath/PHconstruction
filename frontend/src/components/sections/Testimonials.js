import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Testimonial from '../ui/Testimonial';

const testimonials = [
  {
    quote: "The team at PHC has been instrumental in helping us achieve our health goals. Their personalized approach and expert guidance have made a significant difference in our lives.",
    author: "Sarah Johnson",
    role: "CEO",
    company: "Tech Solutions Inc.",
    image: process.env.PUBLIC_URL + "/images/testimonials/sarah.png",
    rating: 5
  },
  {
    quote: "I've been working with PHC for over a year now, and the results have been remarkable. Their comprehensive health programs and dedicated support have transformed my lifestyle.",
    author: "Michael Chen",
    role: "Fitness Enthusiast",
    image: process.env.PUBLIC_URL + "/images/testimonials/michael.png",
    rating: 5
  },
  {
    quote: "The wellness workshops organized by PHC have been eye-opening. The knowledge and practical tips they share have helped me make better health choices for my family.",
    author: "Emily Rodriguez",
    role: "Community Leader",
    company: "Healthy Living Initiative",
    image: process.env.PUBLIC_URL + "/images/testimonials/emily.png",
    rating: 5
  }
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 30 }
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: { duration: 0.3 }
  })
};

const AUTO_PLAY_INTERVAL = 6000;

const getCardState = (idx, page) => {
  if (idx === page) return 'active';
  if (idx === (page - 1 + testimonials.length) % testimonials.length) return 'prev';
  if (idx === (page + 1) % testimonials.length) return 'next';
  return 'hidden';
};

const cardVariants = {
  active: {
    scale: 1,
    opacity: 1,
    zIndex: 3,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 400, damping: 30 }
  },
  prev: {
    scale: 0.85,
    opacity: 0.5,
    zIndex: 2,
    filter: 'blur(2px)',
    x: -40,
    transition: { type: 'spring', stiffness: 400, damping: 30 }
  },
  next: {
    scale: 0.85,
    opacity: 0.5,
    zIndex: 2,
    filter: 'blur(2px)',
    x: 40,
    transition: { type: 'spring', stiffness: 400, damping: 30 }
  },
  hidden: {
    scale: 0.7,
    opacity: 0,
    zIndex: 1,
    filter: 'blur(4px)',
    x: 0,
    transition: { duration: 0.2 }
  }
};

const cubeVariants = {
  enter: (direction) => ({
    rotateY: direction > 0 ? -90 : 90,
    opacity: 0,
    scale: 0.92,
    filter: 'drop-shadow(0 8px 32px rgba(220,38,38,0.10))',
    zIndex: 1,
    transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] }
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1.04,
    filter: 'drop-shadow(0 16px 48px rgba(220,38,38,0.18)) brightness(1.08)',
    zIndex: 2,
    transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] }
  },
  exit: (direction) => ({
    rotateY: direction < 0 ? -90 : 90,
    opacity: 0,
    scale: 0.92,
    filter: 'drop-shadow(0 8px 32px rgba(220,38,38,0.10))',
    zIndex: 1,
    transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] }
  })
};

const Testimonials = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const timeoutRef = useRef(null);

  const paginate = (newDirection) => {
    setPage(([prevPage]) => {
      let nextPage = prevPage + newDirection;
      if (nextPage < 0) nextPage = testimonials.length - 1;
      if (nextPage >= testimonials.length) nextPage = 0;
      return [nextPage, newDirection];
    });
  };

  // Auto-play
  useEffect(() => {
    timeoutRef.current = setTimeout(() => paginate(1), AUTO_PLAY_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [page]);

  // Pause auto-play on hover
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    if (isHovered) clearTimeout(timeoutRef.current);
    else timeoutRef.current = setTimeout(() => paginate(1), AUTO_PLAY_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [isHovered, page]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) paginate(1);
    else if (info.offset.x > 100) paginate(-1);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their experience with PHC.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative max-w-xl mx-auto flex items-center justify-center h-[370px] md:h-[340px] perspective-[1800px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            aria-label="Previous"
            className="absolute left-0 z-20 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 top-1/2 -translate-y-1/2"
            onClick={() => paginate(-1)}
          >
            <svg className="w-6 h-6 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="w-full h-full relative flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={cubeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <Testimonial {...testimonials[page]} />
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            aria-label="Next"
            className="absolute right-0 z-20 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 top-1/2 -translate-y-1/2"
            onClick={() => paginate(1)}
          >
            <svg className="w-6 h-6 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === page ? 'bg-primary-red scale-125' : 'bg-gray-300'}`}
              onClick={() => setPage([idx, idx > page ? 1 : -1])}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="/contact"
            className="inline-block bg-primary-red text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
          >
            Join Our Community
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 