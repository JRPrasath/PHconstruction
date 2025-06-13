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
let impactData = defaultData;

// Function to get impact data
const getImpactData = async () => {
  return { ...impactData };
};

// Function to update impact data
const updateImpactData = async (newData) => {
  try {
    console.log('Updating impact data with:', newData);

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
    impactData = updatedData;
    return updatedData;
  } catch (error) {
    console.error('Error in updateImpactData:', error);
    throw error;
  }
};

// Function to reset data to defaults
const resetImpactData = async () => {
  impactData = defaultData;
  return { ...impactData };
};

module.exports = {
  getImpactData,
  updateImpactData,
  resetImpactData
}; 