require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const impactRoutes = require('./routes/impact');

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['https://phc-construction.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  credentials: true,
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));

// Increase JSON payload limit and add timeout
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Add request timeout middleware
app.use((req, res, next) => {
  req.setTimeout(25000); // 25 second timeout
  res.setTimeout(25000);
  next();
});

// Validate environment variables
const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'EMAIL_TO'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please check your .env file configuration');
  process.exit(1);
}

// Create a transporter for sending emails with timeout
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
  socketTimeout: 10000
});

// Test endpoint to verify email configuration
app.get('/api/test-email', async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'Test Email from PHC Construction',
      html: `
        <h2>Test Email</h2>
        <p>If you're receiving this email, your email configuration is working correctly!</p>
        <p>Email settings:</p>
        <ul>
          <li>From: ${process.env.EMAIL_USER}</li>
          <li>To: ${process.env.EMAIL_TO}</li>
        </ul>
      `
    });
    res.json({ success: true, message: 'Test email sent successfully' });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send test email',
      error: error.message
    });
  }
});

// Verify email configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', {
    body: req.body,
    headers: req.headers
  });

  const { name, email, phone, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    console.log('Missing required fields:', { name, email, subject, message });
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields'
    });
  }

  // Log environment variables (without sensitive data)
  console.log('Email configuration:', {
    user: process.env.EMAIL_USER ? 'Configured' : 'Not configured',
    to: process.env.EMAIL_TO ? 'Configured' : 'Not configured',
    pass: process.env.EMAIL_PASS ? 'Configured' : 'Not configured'
  });

  try {
    // Send email to admin
    console.log('Attempting to send admin email...');
    const adminEmailResult = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    console.log('Admin email sent successfully:', adminEmailResult.messageId);

    // Send auto-reply to the user
    console.log('Attempting to send auto-reply email...');
    const autoReplyResult = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting PHC Construction',
      html: `
        <h2>Thank you for contacting PHC Construction</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <br>
        <p>Best regards,</p>
        <p>PHC Construction Team</p>
      `
    });
    console.log('Auto-reply email sent successfully:', autoReplyResult.messageId);

    console.log('All emails sent successfully');
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });
    
    // Check for specific error types
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email authentication failed. Please check your email configuration.',
        error: error.message
      });
    }
    
    if (error.code === 'ETIMEDOUT') {
      return res.status(500).json({
        success: false,
        message: 'Email server connection timed out. Please try again later.',
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: error.message
    });
  }
});

// Routes
app.use('/api/impact', impactRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 