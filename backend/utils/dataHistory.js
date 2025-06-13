const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const HISTORY_DIR = path.join(DATA_DIR, 'history');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');

// Ensure directories exist
const ensureDirectories = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(HISTORY_DIR, { recursive: true });
  await fs.mkdir(BACKUP_DIR, { recursive: true });
};

// Record a change in the history
const recordChange = async (oldData, newData, userId) => {
  await ensureDirectories();
  const timestamp = new Date().toISOString();
  const historyEntry = {
    timestamp,
    userId,
    changes: {
      old: oldData,
      new: newData
    }
  };
  
  const historyFile = path.join(HISTORY_DIR, `history_${timestamp.replace(/:/g, '-')}.json`);
  await fs.writeFile(historyFile, JSON.stringify(historyEntry, null, 2));
};

// Get change history
const getHistory = async (limit = 10) => {
  await ensureDirectories();
  const files = await fs.readdir(HISTORY_DIR);
  const historyFiles = files
    .filter(file => file.startsWith('history_'))
    .sort()
    .reverse()
    .slice(0, limit);
  
  const history = await Promise.all(
    historyFiles.map(async file => {
      const content = await fs.readFile(path.join(HISTORY_DIR, file), 'utf8');
      return JSON.parse(content);
    })
  );
  
  return history;
};

// Create a backup
const createBackup = async (data) => {
  await ensureDirectories();
  const timestamp = new Date().toISOString();
  const backupFile = path.join(BACKUP_DIR, `backup_${timestamp.replace(/:/g, '-')}.json`);
  await fs.writeFile(backupFile, JSON.stringify(data, null, 2));
};

// Get available backups
const getBackups = async () => {
  await ensureDirectories();
  const files = await fs.readdir(BACKUP_DIR);
  return files
    .filter(file => file.startsWith('backup_'))
    .sort()
    .reverse();
};

// Restore from backup
const restoreFromBackup = async (backupFile) => {
  const backupPath = path.join(BACKUP_DIR, backupFile);
  const content = await fs.readFile(backupPath, 'utf8');
  return JSON.parse(content);
};

// Calculate statistics
const calculateStats = (history) => {
  const stats = {
    totalChanges: history.length,
    changesByUser: {},
    averageChangeInterval: 0,
    mostChangedField: null
  };

  if (history.length === 0) return stats;

  // Calculate changes by user
  history.forEach(entry => {
    const userId = entry.userId;
    stats.changesByUser[userId] = (stats.changesByUser[userId] || 0) + 1;
  });

  // Calculate average change interval
  const intervals = [];
  for (let i = 1; i < history.length; i++) {
    const prev = new Date(history[i-1].timestamp);
    const curr = new Date(history[i].timestamp);
    intervals.push(curr - prev);
  }
  stats.averageChangeInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

  // Find most changed field
  const fieldChanges = {};
  history.forEach(entry => {
    Object.keys(entry.changes.new).forEach(field => {
      if (entry.changes.old[field] !== entry.changes.new[field]) {
        fieldChanges[field] = (fieldChanges[field] || 0) + 1;
      }
    });
  });
  
  stats.mostChangedField = Object.entries(fieldChanges)
    .sort(([,a], [,b]) => b - a)[0]?.[0];

  return stats;
};

module.exports = {
  recordChange,
  getHistory,
  createBackup,
  getBackups,
  restoreFromBackup,
  calculateStats
}; 