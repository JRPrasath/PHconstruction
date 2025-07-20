import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const services = [
  {
    title: "Architectural Design",
    description: "Creating innovative and sustainable architectural solutions.",
    icon: "📐",
    features: [
      "Custom designs",
      "3D visualization",
      "Sustainable planning",
      "Space optimization"
    ],
    image: "/images/services/architectural.png",
    category: "design",
    longDescription: "Our architectural design team brings creativity and technical expertise to every project, ensuring sustainable and innovative solutions that stand the test of time.",
    featured: true
  },
  {
    title: "Residential Construction",
    description: "Building your dream home with precision and quality craftsmanship.",
    icon: "🏠",
    features: [
      "Custom home building",
      "Quality materials",
      "Expert craftsmanship",
      "Timely delivery"
    ],
    image: "/images/services/residential.png",
    category: "construction",
    longDescription: "Transform your dream home into reality with our expert residential construction services. We combine innovative design with superior craftsmanship to create spaces that exceed expectations.",
    featured: true
  },
  {
    title: "Commercial Construction",
    description: "Delivering high-quality commercial spaces that drive business success.",
    icon: "🏢",
    features: [
      "Modern facilities",
      "Efficient layout",
      "Code compliance",
      "Project management"
    ],
    image: "/images/services/commercial.png",
    category: "construction",
    longDescription: "From office buildings to retail spaces, we deliver commercial construction projects that combine functionality with aesthetic excellence.",
    featured: true
  },
  {
    title: "All type of Renovation",
    description: "Transforming existing spaces into modern, functional environments.",
    icon: "🔨",
    features: [
      "Structural updates",
      "Modern amenities",
      "Quality finishes",
      "Value enhancement"
    ],
    image: "/images/services/renovation.png",
    category: "renovation",
    longDescription: "Breathe new life into your existing spaces with our comprehensive renovation services, combining modern aesthetics with structural integrity.",
    featured: true
  },
  {
    title: "Interior Design",
    description: "Creating beautiful and functional interior spaces.",
    icon: "🎨",
    features: [
      "Space planning",
      "Material selection",
      "Color schemes",
      "Furniture design"
    ],
    image: "/images/services/interior.png",
    category: "design",
    longDescription: "Our interior design services transform spaces into beautiful, functional environments that reflect your style and enhance your quality of life.",
    featured: false
  },
  {
    title: "Project Consulting",
    description: "Expert guidance throughout your construction journey.",
    icon: "📋",
    features: [
      "Project planning",
      "Cost estimation",
      "Quality control",
      "Timeline management"
    ],
    image: "/images/services/consulting.png",
    category: "consulting",
    longDescription: "Navigate your construction project with confidence through our expert consulting services, ensuring every aspect is meticulously planned and executed.",
    featured: false
  }
];

const categories = [
  { id: "all", name: "All Services" },
  { id: "construction", name: "Construction" },
  { id: "design", name: "Design" },
  { id: "renovation", name: "Renovation" },
  { id: "consulting", name: "Consulting" }
];

const ServiceCard = ({ service, index, onSelect }) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 }
    });
  }, [controls, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(service)}
    >
      <div className="flex flex-col md:flex-row">
        <motion.div 
          className="relative w-full md:w-1/3 aspect-w-16 aspect-h-9 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={service.image}
            alt={`${service.title} image`}
            className="object-cover w-full h-full"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        <div className="p-6 flex-1">
          <motion.div 
            className="flex items-center gap-4 mb-3"
            animate={{ x: isHovered ? 10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="text-3xl"
              animate={{ 
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? 5 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              {service.icon}
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900">
              {service.title}
            </h3>
          </motion.div>
          <motion.p 
            className="text-gray-600 mb-4 text-sm leading-relaxed"
            animate={{ opacity: isHovered ? 0.8 : 1 }}
          >
            {service.description}
          </motion.p>
          <motion.ul 
            className="grid grid-cols-2 gap-2 mb-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {service.features.map((feature, i) => (
              <motion.li 
                key={feature} 
                className="flex items-center text-gray-600 text-sm"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg
                  className="w-4 h-4 text-primary-red mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ 
                    scale: isHovered ? 1.2 : 1,
                    rotate: isHovered ? 360 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
                {feature}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div 
            className="inline-flex items-center text-primary-red font-semibold hover:text-red-700 transition-colors group text-sm"
            animate={{ x: isHovered ? 10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            Learn More
            <motion.svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceModal = ({ service, onClose }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <motion.div 
          className="relative aspect-w-16 aspect-h-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.img
            src={service.image}
            alt={`${service.title} image`}
            className="object-cover w-full h-full"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        </motion.div>
        <motion.div 
          className="p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="text-6xl mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.4
            }}
          >
            {service.icon}
          </motion.div>
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {service.title}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {service.longDescription}
          </motion.p>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
              <motion.ul 
                className="space-y-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {service.features.map((feature, index) => (
                  <motion.li 
                    key={feature} 
                    className="flex items-center text-gray-600"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.svg
                      className="w-5 h-5 text-primary-red mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <motion.div 
              className="bg-gray-50 rounded-xl p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                Contact us today to discuss your project and get a free consultation.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="inline-block bg-primary-red text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
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
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices = selectedCategory === "all"
    ? services
    : services.filter(service => service.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Services | PaperHouse Construction</title>
        <meta name="description" content="Discover the range of construction and renovation services offered by PaperHouse Construction." />
        <link rel="canonical" href="https://yourdomain.com/services" />
      </Helmet>
      <div className="min-h-screen bg-white">
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
                  Our Services
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Comprehensive construction solutions tailored to your needs
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Category Filter */}
        <motion.section 
          className="py-8 bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="flex flex-wrap justify-center gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary-red text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Services Grid */}
        <motion.section 
          className="py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-1 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {filteredServices.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index}
                  onSelect={setSelectedService}
                />
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Process Section */}
        <motion.section 
          className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Pattern */}
          <motion.div 
            className="absolute inset-0 opacity-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.05 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(0,0,0,0.1)_50%,_transparent_75%)] bg-[length:20px_20px]" />
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Our Process
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                A streamlined approach to bringing your vision to life
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <motion.div 
                    className="text-4xl mb-4"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {step.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-lg font-bold text-gray-900 mb-2"
                    whileHover={{ x: 5 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 text-sm leading-relaxed"
                    whileHover={{ x: 5 }}
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Pattern */}
          <motion.div 
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.1)_50%,_transparent_75%)] bg-[length:20px_20px]" />
          </motion.div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 
                className="text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Ready to Start Your Project?
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Let's discuss how we can help bring your vision to life with our expertise
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  to="/contact"
                  className="inline-block bg-primary-red text-white px-8 py-3 rounded-full font-semibold text-base hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started Today
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Service Modal */}
        <AnimatePresence>
          {selectedService && (
            <ServiceModal
              service={selectedService}
              onClose={() => setSelectedService(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
} 