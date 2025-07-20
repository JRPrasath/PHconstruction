const config = {
  apiUrl: process.env.NODE_ENV === 'production' ? 'https://phdesignhouse.netlify.app/.netlify/functions' : 'http://localhost:5000',
  environment: process.env.NODE_ENV || 'development',
  contactEndpoint: '/contact',
  impactEndpoint: '/impact',
  // Add other configuration variables as needed
};

export default config; 