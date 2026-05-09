import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
  dob: String,
  phone: String,
  nationality: String,
  passportNumber: String,
  notes: String
});

const bookingSchema = new mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },

  buyer: {
    firstName: String,
    lastName: String,
    email: String,
  },

  participants: [participantSchema],

  numberOfPeople: Number,
  travelDate: Date,

  totalAmount: Number,

  paymentStatus: {
    type: String,
    default: "pending"
  },

  bankSlip: {
    url: String,
    public_id: String
  }

}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);