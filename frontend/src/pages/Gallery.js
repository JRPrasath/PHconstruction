import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet';

// Enhanced gallery data with more details
const galleryData = [
  {
    id: 1,
    title: "Modern Residential Complex",
    category: "residential",
    image: process.env.PUBLIC_URL + "/images/gallery/residential-1.jpg",
    description: "A contemporary residential complex featuring sustainable design and modern amenities.",
    location: "Downtown Area",
    year: "2023",
    size: "50,000 sq ft",
    features: ["Solar Panels", "Smart Home", "Green Spaces"],
    client: "Urban Living Corp"
  },
  {
    id: 2,
    title: "Commercial Office Building",
    category: "commercial",
    image: process.env.PUBLIC_URL + "/images/gallery/commercial-1.jpg",
    description: "State-of-the-art office building with innovative workspace solutions.",
    location: "Business District",
    year: "2023",
    size: "75,000 sq ft",
    features: ["LEED Certified", "Open Workspace", "Rooftop Garden"],
    client: "Tech Solutions Inc"
  },
  {
    id: 3,
    title: "Luxury Villa Project",
    category: "residential",
    image: process.env.PUBLIC_URL + "/images/gallery/residential-2.jpg",
    description: "Elegant villa design combining luxury and comfort.",
    location: "Uptown",
    year: "2022",
    size: "8,000 sq ft",
    features: ["Private Pool", "Smart Security", "Wine Cellar"],
    client: "Private Client"
  },
  {
    id: 4,
    title: "Shopping Mall Renovation",
    category: "commercial",
    image: process.env.PUBLIC_URL + "/images/gallery/commercial-2.jpg",
    description: "Complete renovation of a shopping mall with modern retail spaces.",
    location: "City Center",
    year: "2022",
    size: "200,000 sq ft",
    features: ["Modern Facade", "Food Court", "Entertainment Zone"],
    client: "Retail Group"
  },
  {
    id: 5,
    title: "Smart Home Project",
    category: "residential",
    image: process.env.PUBLIC_URL + "/images/gallery/residential-3.jpg",
    description: "Integration of smart technology in residential construction.",
    location: "Suburban Area",
    year: "2023",
    size: "4,500 sq ft",
    features: ["IoT Integration", "Energy Efficient", "Home Automation"],
    client: "Smart Living Inc"
  },
  {
    id: 6,
    title: "Modern Apartment Complex",
    category: "residential",
    image: process.env.PUBLIC_URL + "/images/gallery/residential-4.jpg",
    description: "Contemporary apartment complex with premium amenities.",
    location: "City Center",
    year: "2023",
    size: "120,000 sq ft",
    features: ["Fitness Center", "Rooftop Garden", "Smart Security"],
    client: "Urban Development Corp"
  },
  {
    id: 7,
    title: "Corporate Office Park",
    category: "commercial",
    image: process.env.PUBLIC_URL + "/images/gallery/commercial-3.jpg",
    description: "Multi-building office park with sustainable design.",
    location: "Business District",
    year: "2023",
    size: "300,000 sq ft",
    features: ["LEED Platinum", "Green Spaces", "EV Charging"],
    client: "Global Tech Corp"
  },
  {
    id: 8,
    title: "Luxury Condominium",
    category: "residential",
    image: process.env.PUBLIC_URL + "/images/gallery/residential-5.jpg",
    description: "High-end condominium with panoramic views.",
    location: "Waterfront",
    year: "2023",
    size: "90,000 sq ft",
    features: ["Ocean Views", "Private Beach", "Concierge Service"],
    client: "Luxury Living Group"
  },
  {
    id: 9,
    title: "Retail Plaza",
    category: "commercial",
    image: process.env.PUBLIC_URL + "/images/gallery/commercial-4.jpg",
    description: "Modern retail plaza with mixed-use spaces.",
    location: "Shopping District",
    year: "2023",
    size: "150,000 sq ft",
    features: ["Mixed-Use", "Public Plaza", "Smart Parking"],
    client: "Retail Ventures"
  }
];

const categories = [
  { id: 'all', name: 'All Projects', icon: '🏗️' },
  { id: 'residential', name: 'Residential', icon: '🏠' },
  { id: 'commercial', name: 'Commercial', icon: '🏢' }
];

const GalleryItem = ({ item }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={item.image}
          alt={item.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <span className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.description}</p>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleItems] = useState(galleryData.length);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const filteredItems = galleryData
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Gallery | PaperHouse Construction</title>
        <meta name="description" content="View our gallery of completed construction and renovation projects." />
        <link rel="canonical" href="https://jrprasath.github.io/PHconstruction/gallery" />
        <meta property="og:url" content="https://jrprasath.github.io/PHconstruction/gallery" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
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
                  Our Gallery
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of successful construction projects
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Gallery Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-primary-red text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* Gallery Grid - Switched to standard grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {filteredItems.slice(0, visibleItems).map(item => (
                  <GalleryItem
                    key={item.id}
                    item={item}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* No Results Message */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Gallery; 