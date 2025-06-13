import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import config from '../../config';

const StatCard = ({ stat }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const controls = useAnimation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
      const targetValue = stat.value;
      let currentValue = 0;
      const duration = 2000;
      const steps = 60;
      const increment = targetValue / steps;
      const interval = duration / steps;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(currentValue));
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [inView, stat.value, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="text-4xl mb-4">{stat.icon}</div>
      <div className="text-4xl font-bold text-primary-red mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-gray-600">{stat.label}</div>
    </motion.div>
  );
};

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/impact`);
        const data = response.data;
        console.log('API Response:', data); // Debug log
        
        const formattedStats = [
          {
            label: 'Projects Completed',
            value: Number(data.projectsCompleted) || 250,
            suffix: '+',
            icon: '🏗️'
          },
          {
            label: 'Ongoing Projects',
            value: Number(data.ongoingProjects) || 15,
            suffix: '+',
            icon: '🚧'
          },
          {
            label: 'Years Experience',
            value: Number(data.yearsExperience) || 20,
            suffix: '+',
            icon: '⏳'
          },
          {
            label: 'Happy Clients',
            value: Number(data.happyClients) || 500,
            suffix: '+',
            icon: '😊'
          }
        ];
        
        console.log('Formatted Stats:', formattedStats); // Debug log
        setStats(formattedStats);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Use default values if API fails
        const defaultStats = [
          {
            label: 'Projects Completed',
            value: 250,
            suffix: '+',
            icon: '🏗️'
          },
          {
            label: 'Ongoing Projects',
            value: 15,
            suffix: '+',
            icon: '🚧'
          },
          {
            label: 'Years Experience',
            value: 20,
            suffix: '+',
            icon: '⏳'
          },
          {
            label: 'Happy Clients',
            value: 500,
            suffix: '+',
            icon: '😊'
          }
        ];
        setStats(defaultStats);
        setError('Using default statistics');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
          <div className="text-center text-white">Loading statistics...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        {error && (
          <div className="text-center text-yellow-400 mb-8">
            {error}
          </div>
        )}
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
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-4xl font-bold text-white mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats; 