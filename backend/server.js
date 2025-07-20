require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const impactRoutes = require('./routes/impact');

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://jrprasath.github.io'
  ],
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
const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'EMAIL_TO', 'ADMIN_EMAIL'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please check your .env file configuration');
  process.exit(1);
}

// Create a transporter for sending emails with timeout settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 30000, // Increased to 30 seconds
  greetingTimeout: 30000,
  socketTimeout: 30000,
  debug: true, // Enable debug logging
  logger: true // Enable logger
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

// Verify email configuration with retry logic
const verifyEmailConfig = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await new Promise((resolve, reject) => {
transporter.verify(function(error, success) {
  if (error) {
            console.error(`Email verification attempt ${i + 1} failed:`, error);
            reject(error);
  } else {
    console.log('Email server is ready to send messages');
            resolve(success);
          }
        });
      });
      return true;
    } catch (error) {
      if (i === retries - 1) {
        console.error('All email verification attempts failed:', error);
        return false;
      }
      console.log(`Retrying email verification in 5 seconds... (Attempt ${i + 2}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

// Call verifyEmailConfig when server starts
verifyEmailConfig().then(success => {
  if (!success) {
    console.error('Warning: Email server verification failed. Email functionality may not work properly.');
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields'
    });
  }

  try {
    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
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

    // Send auto-reply to the user with retry logic
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
      try {
        await transporter.sendMail({
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
        break; // If successful, break the retry loop
      } catch (error) {
        retryCount++;
        if (retryCount === maxRetries) {
          console.error('Failed to send auto-reply after', maxRetries, 'attempts:', error);
          // Don't throw error here, as admin email was sent successfully
        } else {
          console.log(`Retry ${retryCount} for auto-reply email...`);
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
        }
      }
    }

    res.json({ 
      success: true, 
      message: 'Message sent successfully',
      autoReplySent: retryCount < maxRetries
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
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