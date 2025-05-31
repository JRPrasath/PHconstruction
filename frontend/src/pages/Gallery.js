import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "Modern Residential Villa",
    category: "Residential",
    image: "/images/gallery/residential-1.jpg",
    description: "A contemporary villa featuring sustainable design and luxury finishes."
  },
  {
    id: 2,
    title: "Commercial Office Complex",
    category: "Commercial",
    image: "/images/gallery/commercial-1.jpg",
    description: "State-of-the-art office building with innovative workspace solutions."
  },
  {
    id: 3,
    title: "Industrial Warehouse",
    category: "Industrial",
    image: "/images/gallery/industrial-1.jpg",
    description: "Efficient and modern warehouse facility with advanced logistics systems."
  },
  {
    id: 4,
    title: "Luxury Apartment Complex",
    category: "Residential",
    image: "/images/gallery/residential-2.jpg",
    description: "High-end apartment complex with premium amenities and stunning views."
  },
  {
    id: 5,
    title: "Shopping Mall",
    category: "Commercial",
    image: "/images/gallery/commercial-2.jpg",
    description: "Modern retail space with innovative design and customer experience."
  },
  {
    id: 6,
    title: "Manufacturing Plant",
    category: "Industrial",
    image: "/images/gallery/industrial-2.jpg",
    description: "Advanced manufacturing facility with cutting-edge technology."
  }
];

const categories = ["All", "Residential", "Commercial", "Industrial"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
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
              Our Portfolio
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our diverse range of successful projects
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                  selectedCategory === category
                    ? "bg-primary-red text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-red bg-red-50 rounded-full mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-xl max-w-4xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedProject(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="object-cover w-full h-full"
                />
          </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-red bg-red-50 rounded-full mb-3">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {selectedProject.description}
                </p>
        </div>
            </motion.div>
          </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
} 