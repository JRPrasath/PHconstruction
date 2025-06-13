import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import config from '../../config';

const Stats = () => {
  const [stats, setStats] = useState({
    projectsCompleted: 0,
    ongoingProjects: 0,
    yearsExperience: 0,
    happyClients: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/impact`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching impact stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      title: 'Projects Completed',
      value: stats.projectsCompleted,
      icon: '🏗️',
      color: 'bg-blue-500'
    },
    {
      title: 'Ongoing Projects',
      value: stats.ongoingProjects,
      icon: '🚧',
      color: 'bg-green-500'
    },
    {
      title: 'Years Experience',
      value: stats.yearsExperience,
      icon: '⏳',
      color: 'bg-purple-500'
    },
    {
      title: 'Happy Clients',
      value: stats.happyClients,
      icon: '😊',
      color: 'bg-yellow-500'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Impact
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Making a difference through sustainable development and community empowerment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {stat.value}+
              </h3>
              <p className="text-gray-600">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats; 