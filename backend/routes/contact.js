const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const { sendContactEmail } = require('../utils/email');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        message: 'All fields are required',
        missing: {
          name: !name,
          email: !email,
          phone: !phone,
          message: !message
        }
      });
    }

    // Save to database
    const contact = new Contact({
      ...req.body,
      ipAddress: req.ip
    });
    await contact.save();

    // Send email notification
    const emailSent = await sendContactEmail(req.body);
    if (!emailSent) {
      console.error('Failed to send email notification');
      // Still return success to user but log the error
      return res.status(201).json({ 
        message: 'Message saved successfully but email notification failed',
        saved: true,
        emailSent: false
      });
    }

    res.status(201).json({ 
      message: 'Message sent successfully',
      saved: true,
      emailSent: true
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Error sending message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all messages (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};

    if (status) query.status = status;

    const messages = await Contact.find(query)
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Get single message (admin only)
router.get('/:id', auth, async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching message' });
  }
});

// Update message status (admin only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error updating message status' });
  }
});

// Delete message (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message' });
  }
});

module.exports = router; 