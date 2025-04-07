import mongoose from "mongoose";

// Define the booking schema
const bookingSchema = new mongoose.Schema({
  dentist: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    image: { type: String, required: false },
    rating: { type: Number, required: false },
    experience: { type: String, required: false },
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  formData: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: String, required: false },
    reason: { type: String, required: false },
    notes: { type: String, required: false },
  },
  status: { type: String, required: true },
  type: { type: String, required: true },
  email: { type: String, required: true },
  userId: {
    type: String,
    required: false,
  },
});

const Bookings =
  mongoose.models.Bookings || mongoose.model("Bookings", bookingSchema);

export default Bookings;
