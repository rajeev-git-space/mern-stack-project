const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    role: {
      type: String,
      enum: ['freelancer', 'project_owner', 'admin'],
      required: true,
    },
    skills: {
      type: [String], // An array of strings representing skills
      default: [],
    },
    profile_info: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
);

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
