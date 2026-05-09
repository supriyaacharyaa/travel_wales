import Booking from "../models/Booking.js";
import cloudinary from "../config/cloudinary.js";

/**
 * CREATE BOOKING
 */
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * UPLOAD BANK SLIP
 */
export const uploadSlip = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "payments" }
    );

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        bankSlip: {
          url: result.secure_url,
          public_id: result.public_id
        }
      },
      { new: true }
    );

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * VERIFY PAYMENT (ADMIN)
 */
export const verifyBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: "verified" },
      { new: true }
    );

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET ALL BOOKINGS (ADMIN)
 */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("trip");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * UPDATE PAYMENT STATUS (OPTIONAL ADMIN CONTROL)
 */
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: req.body.status },
      { new: true }
    );

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET BOOKED DATES (FOR CALENDAR)
 */
export const getBookedDates = async (req, res) => {
  try {
    const bookings = await Booking.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$travelDate"
            }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};