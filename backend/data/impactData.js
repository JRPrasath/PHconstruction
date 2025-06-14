const { readData, writeData } = require('../utils/fileUtils');

// Default values from environment variables or fallback to defaults
const defaultData = {
  projectsCompleted: parseInt(process.env.DEFAULT_PROJECTS_COMPLETED) || 250,
  happyClients: parseInt(process.env.DEFAULT_HAPPY_CLIENTS) || 500,
  yearsExperience: parseInt(process.env.DEFAULT_YEARS_EXPERIENCE) || 20,
  ongoingProjects: parseInt(process.env.DEFAULT_ONGOING_PROJECTS) || 15,
  lastUpdated: new Date()
};

// In-memory cache
let impactData = null;

// Initialize data
const initializeData = async () => {
  try {
    // Try to read from file
    const fileData = await readData();
    if (fileData) {
      impactData = fileData;
    } else {
      // Use default data if file doesn't exist
      impactData = defaultData;
      await writeData(impactData);
    }
    console.log('Impact data initialized with:', impactData);
  } catch (error) {
    console.error('Error initializing impact data:', error);
    impactData = defaultData;
  }
};

// Function to get impact data
const getImpactData = async () => {
  if (!impactData) {
    await initializeData();
  }
  return { ...impactData };
};

// Function to update impact data
const updateImpactData = async (newData) => {
  try {
    console.log('Updating impact data with:', newData);
    
    if (!impactData) {
      console.log('No existing data, initializing...');
      await initializeData();
    }

    // Ensure all values are numbers and have fallbacks
    const updatedData = {
      ...impactData,
      projectsCompleted: Number(newData.projectsCompleted) || impactData.projectsCompleted,
      happyClients: Number(newData.happyClients) || impactData.happyClients,
      yearsExperience: Number(newData.yearsExperience) || impactData.yearsExperience,
      ongoingProjects: Number(newData.ongoingProjects) || impactData.ongoingProjects,
      lastUpdated: new Date()
    };

    console.log('Processed update data:', updatedData);

    // Save to file
    try {
      await writeData(updatedData);
      impactData = updatedData;
      console.log('Data saved successfully');
      return updatedData;
    } catch (error) {
      console.error('Error saving impact data:', error);
      throw new Error(`Failed to save impact data: ${error.message}`);
    }
  } catch (error) {
    console.error('Error in updateImpactData:', error);
    throw error;
  }
};

// Function to reset data to defaults
const resetImpactData = async () => {
  impactData = defaultData;
  try {
    await writeData(impactData);
  } catch (error) {
    console.error('Error resetting impact data:', error);
  }
  return { ...impactData };
};

// Initialize data when module is loaded
initializeData().catch(console.error);

module.exports = {
  getImpactData,
  updateImpactData,
  resetImpactData
}; 