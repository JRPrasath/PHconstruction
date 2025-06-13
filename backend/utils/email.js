const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  pool: true,
  maxConnections: 1,
  maxMessages: 3,
  rateDelta: 1000,
  rateLimit: 3,
  socketTimeout: 10000, // 10 seconds
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000, // 10 seconds
  debug: true
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email configuration error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });
  } else {
    console.log('Email server is ready to send messages');
  }
});

const sendEmailWithRetry = async (mailOptions, maxRetries = 3) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempting to send email (attempt ${attempt}/${maxRetries})...`);
      const result = await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully on attempt ${attempt}:`, result.messageId);
      return result;
    } catch (error) {
      lastError = error;
      console.error(`Failed to send email on attempt ${attempt}:`, error.message);
      
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000); // Exponential backoff
        console.log(`Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
};

const sendContactEmail = async (contactData) => {
  const { name, email, phone, message } = contactData;

  // Email to admin
  const adminMailOptions = {
    from: `"PaperHouse Construction" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: 'New Contact Form Submission - PaperHouse Construction',
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr>
      <p><small>This email was sent from the PaperHouse Construction website contact form.</small></p>
    `
  };

  // Auto-reply email to user
  const autoReplyOptions = {
    from: `"PaperHouse Construction" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Thank you for contacting PaperHouse Construction!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Thank you for reaching out to PaperHouse Construction!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you shortly.</p>
        <p>Here's a summary of your message:</p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>Your Message:</strong></p>
          <p>${message}</p>
        </div>
        <p>If you have any additional questions or information to provide, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The PaperHouse Construction Team</p>
        <hr style="margin: 20px 0;">
        <p style="color: #6b7280; font-size: 12px;">This is an automated response. Please do not reply to this email.</p>
      </div>
    `
  };

  try {
    // Log email configuration (without sensitive data)
    console.log('Attempting to send emails with configuration:', {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      user: process.env.EMAIL_USER ? 'Configured' : 'Not configured'
    });

    // Send email to admin with retry
    const adminResult = await sendEmailWithRetry(adminMailOptions);
    console.log('Admin email sent successfully:', adminResult.messageId);
    
    // Send auto-reply to user with retry
    const autoReplyResult = await sendEmailWithRetry(autoReplyOptions);
    console.log('Auto-reply email sent successfully:', autoReplyResult.messageId);
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });
    return false;
  }
};

module.exports = {
  sendContactEmail
}; 