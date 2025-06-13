const config = {
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://phc-construction.vercel.app'
    : 'http://localhost:5000',
  environment: process.env.NODE_ENV || 'development',
  contactEndpoint: '/api/contact',
  impactEndpoint: '/api/impact',
  // Add other configuration variables as needed
};

export default config; 