import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useCountUp } from 'use-count-up';

const stats = [
  {
    label: 'Projects Completed',
    value: 250,
    suffix: '+',
    icon: '🏗️'
  },
  {
    label: 'Years Experience',
    value: 20,
    suffix: '+',
    icon: '⭐'
  },
  {
    label: 'Happy Clients',
    value: 500,
    suffix: '+',
    icon: '😊'
  },
  {
    label: 'Team Members',
    value: 50,
    suffix: '+',
    icon: '👥'
  }
];

const StatCard = ({ stat }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { value } = useCountUp({
    isCounting: inView,
    end: stat.value,
    duration: 2.5,
    easing: 'easeOutCubic'
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="text-4xl mb-4">{stat.icon}</div>
      <div className="text-4xl font-bold text-primary-red mb-2">
        {value}{stat.suffix}
      </div>
      <div className="text-gray-600">{stat.label}</div>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Building excellence through years of experience and dedication
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats; 