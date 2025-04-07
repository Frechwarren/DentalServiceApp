import { Phone } from "lucide-react";
import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
});

// Create the User model
const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
