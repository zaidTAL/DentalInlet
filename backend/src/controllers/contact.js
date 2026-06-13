const sendEmail = require('../utils/sendEmail');

// @desc    Send contact email to doctor
// @route   POST /api/v1/contact
// @access  Public
exports.sendContactEmail = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email and message',
      });
    }

    const html = `
      <h1>New Contact Message</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    await sendEmail({
      email: process.env.DOCTOR_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      message: `New Contact Form Submission\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html,
    });

    res.status(200).json({
      success: true,
      data: 'Email sent',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Email could not be sent',
    });
  }
};
