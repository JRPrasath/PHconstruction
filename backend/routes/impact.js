const express = require('express');
const router = express.Router();
const { getImpactData, updateImpactData, resetImpactData } = require('../data/impactData');
const { getHistory, getBackups, restoreFromBackup, calculateStats } = require('../utils/dataHistory');
const auth = require('../middleware/auth');

// Get impact numbers
router.get('/', async (req, res) => {
  try {
    const impact = await getImpactData();
    res.json(impact);
  } catch (error) {
    console.error('Error fetching impact numbers:', error);
    res.status(500).json({ message: 'Error fetching impact numbers' });
  }
});

// Update impact numbers (admin only)
router.put('/', async (req, res) => {
  try {
    console.log('Received update request with body:', req.body);
    
    const { projectsCompleted, happyClients, yearsExperience, ongoingProjects } = req.body;
    
    // Log the extracted values
    console.log('Extracted values:', {
      projectsCompleted,
      happyClients,
      yearsExperience,
      ongoingProjects
    });
    
    // Validate input
    const validationErrors = [];
    if (projectsCompleted && (isNaN(projectsCompleted) || projectsCompleted < 0)) {
      validationErrors.push('Projects completed must be a positive number');
    }
    if (happyClients && (isNaN(happyClients) || happyClients < 0)) {
      validationErrors.push('Happy clients must be a positive number');
    }
    if (yearsExperience && (isNaN(yearsExperience) || yearsExperience < 0)) {
      validationErrors.push('Years experience must be a positive number');
    }
    if (ongoingProjects && (isNaN(ongoingProjects) || ongoingProjects < 0)) {
      validationErrors.push('Ongoing projects must be a positive number');
    }

    if (validationErrors.length > 0) {
      console.log('Validation errors:', validationErrors);
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    // Convert values to numbers
    const updateData = {
      projectsCompleted: Number(projectsCompleted),
      happyClients: Number(happyClients),
      yearsExperience: Number(yearsExperience),
      ongoingProjects: Number(ongoingProjects)
    };
    
    console.log('Sending update data:', updateData);
    
    const updatedData = await updateImpactData(updateData);
    console.log('Update successful, new data:', updatedData);
    
    res.json({ 
      message: 'Impact numbers updated successfully',
      data: updatedData
    });
  } catch (error) {
    console.error('Error updating impact numbers:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Error updating impact numbers',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Reset impact numbers to defaults (admin only)
router.post('/reset', auth, async (req, res) => {
  try {
    const resetData = await resetImpactData(req.user.id);
    res.json({
      message: 'Impact numbers reset to defaults successfully',
      data: resetData
    });
  } catch (error) {
    console.error('Error resetting impact numbers:', error);
    res.status(500).json({ message: 'Error resetting impact numbers' });
  }
});

// Get change history (admin only)
router.get('/history', auth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const history = await getHistory(limit);
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Error fetching history' });
  }
});

// Get available backups (admin only)
router.get('/backups', auth, async (req, res) => {
  try {
    const backups = await getBackups();
    res.json(backups);
  } catch (error) {
    console.error('Error fetching backups:', error);
    res.status(500).json({ message: 'Error fetching backups' });
  }
});

// Restore from backup (admin only)
router.post('/restore/:backupFile', auth, async (req, res) => {
  try {
    const { backupFile } = req.params;
    const backupData = await restoreFromBackup(backupFile);
    const updatedData = await updateImpactData(backupData, req.user.id);
    res.json({
      message: 'Backup restored successfully',
      data: updatedData
    });
  } catch (error) {
    console.error('Error restoring backup:', error);
    res.status(500).json({ message: 'Error restoring backup' });
  }
});

// Get statistics (admin only)
router.get('/stats', auth, async (req, res) => {
  try {
    const history = await getHistory();
    const stats = calculateStats(history);
    res.json(stats);
  } catch (error) {
    console.error('Error calculating statistics:', error);
    res.status(500).json({ message: 'Error calculating statistics' });
  }
});

module.exports = router; 