const mongoose = require('mongoose');

// Define Project Schema
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills_required: {
      type: [String],
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'completed'],
      default: 'open',
    },
    assigned_freelancers: [
      {
        freelancer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        status: {
          type: String,
          enum: ['pending', 'accepted', 'declined'],
          default: 'pending',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create the Project model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
