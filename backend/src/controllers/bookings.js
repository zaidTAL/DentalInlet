const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');

// @desc    Create new booking
// @route   POST /api/v1/bookings
// @access  Public
exports.createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create(req.body);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const doctorMailOptions = {
      from: `"Dental Website" <${process.env.EMAIL_USER}>`,
      to: process.env.DOCTOR_EMAIL,
      subject: `New Appointment Request: ${booking.name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #0A84B1;">New Booking Received</h2>
          <p>A new appointment has been requested through the website.</p>
          <hr />
          <p><strong>Patient Name:</strong> ${booking.name}</p>
          <p><strong>Patient Email:</strong> ${booking.email}</p>
          <p><strong>Patient Phone:</strong> ${booking.phone}</p>
          <p><strong>Requested Service:</strong> ${booking.serviceName}</p>
          <p><strong>Preferred Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
          <p><strong>Preferred Time:</strong> ${booking.time}</p>
          <p><strong>Notes:</strong> ${booking.explanation || 'None'}</p>
        </div>
      `,
    };

    const patientMailOptions = {
      from: `"Dental Inlet" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: 'We have received your appointment request',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #0A84B1;">Hello ${booking.name},</h2>
          <p>Thank you for choosing Dental Inlet. We have received your request for <strong>${booking.serviceName}</strong> on <strong>${new Date(booking.date).toLocaleDateString()} at ${booking.time}</strong>.</p>
          <p>Our team will contact you shortly to confirm your visit.</p>
          <br />
          <p>Best regards,</p>
          <p>Dental Inlet Team</p>
        </div>
      `,
    };

    transporter.sendMail(doctorMailOptions).catch(err => console.error('Doctor Notification Error:', err.message));
    transporter.sendMail(patientMailOptions).catch(err => console.error('Patient Confirmation Error:', err.message));

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings
// @route   GET /api/v1/bookings
// @access  Private
exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort('-createdAt');
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status and send confirmation
// @route   PUT /api/v1/bookings/:id/status
// @access  Private
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, { status }, {
      new: true,
      runValidators: true
    });

    // If status is confirmed or completed, send email to patient
    if (status === 'confirmed' || status === 'completed') {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const confirmMailOptions = {
        from: `"Dental Inlet" <${process.env.EMAIL_USER}>`,
        to: booking.email,
        subject: status === 'confirmed' ? 'Your Appointment is Confirmed!' : 'Thank you for your visit',
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #0A84B1;">Hello ${booking.name},</h2>
            <p>${status === 'confirmed' 
              ? `Great news! Your appointment for <strong>${booking.serviceName}</strong> has been **confirmed** for <strong>${new Date(booking.date).toLocaleDateString()} at ${booking.time}</strong>.` 
              : `Thank you for choosing Dental Inlet. Your visit is now marked as <strong>completed</strong>. We hope you had a great experience!`}</p>
            <p>We look forward to seeing you!</p>
            <br />
            <p>Best regards,</p>
            <p>Dr. Ans Ahmad & Team</p>
          </div>
        `,
      };

      transporter.sendMail(confirmMailOptions).catch(err => console.error('Confirmation Email Error:', err.message));
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};
