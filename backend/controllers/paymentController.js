import Booking from "../models/Booking.js";

// ✅ BANK PAYMENT
export const bankPayment = async (req, res) => {
  try {
    const booking = await Booking.findById(req.body.bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentStatus = "pending";
    await booking.save();

    res.json({ message: "Bank payment initiated", booking });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};