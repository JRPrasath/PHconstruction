const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const IMPACT_FILE = path.join(DATA_DIR, 'impact.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
};

// Read data from file
const readData = async () => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(IMPACT_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
};

// Write data to file
const writeData = async (data) => {
  await ensureDataDir();
  await fs.writeFile(IMPACT_FILE, JSON.stringify(data, null, 2));
};

module.exports = {
  readData,
  writeData
}; 