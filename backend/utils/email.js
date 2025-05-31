const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const sendContactEmail = async (contactData) => {
  const { name, email, phone, message } = contactData;

  // Email to admin
  const adminMailOptions = {
    from: process.env.EMAIL_FROM,
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
    from: process.env.EMAIL_FROM,
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
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      user: process.env.EMAIL_USER ? 'Configured' : 'Not configured'
    });

    // Send email to admin
    const adminResult = await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent successfully:', adminResult.messageId);
    
    // Send auto-reply to user
    const autoReplyResult = await transporter.sendMail(autoReplyOptions);
    console.log('Auto-reply email sent successfully:', autoReplyResult.messageId);
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });
    return false;
  }
};

module.exports = {
  sendContactEmail
}; 