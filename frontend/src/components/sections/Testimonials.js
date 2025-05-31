import React from 'react';
import { motion } from 'framer-motion';
import Testimonial from '../ui/Testimonial';

const testimonials = [
  {
    quote: "The team at PHC has been instrumental in helping us achieve our health goals. Their personalized approach and expert guidance have made a significant difference in our lives.",
    author: "Sarah Johnson",
    role: "CEO",
    company: "Tech Solutions Inc.",
    image: "/images/testimonials/sarah.jpg",
    rating: 5
  },
  {
    quote: "I've been working with PHC for over a year now, and the results have been remarkable. Their comprehensive health programs and dedicated support have transformed my lifestyle.",
    author: "Michael Chen",
    role: "Fitness Enthusiast",
    image: "/images/testimonials/michael.jpg",
    rating: 5
  },
  {
    quote: "The wellness workshops organized by PHC have been eye-opening. The knowledge and practical tips they share have helped me make better health choices for my family.",
    author: "Emily Rodriguez",
    role: "Community Leader",
    company: "Healthy Living Initiative",
    image: "/images/testimonials/emily.jpg",
    rating: 5
  }
];

const Testimonials = () => {
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              {...testimonial}
              delay={index * 0.2}
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