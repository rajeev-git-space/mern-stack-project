const Performance = require('../models/performanceModel');
const Project = require('../models/projectModel');

// Create a performance record when a freelancer is assigned to a project
const createPerformanceRecord = async (req, res) => {
  const { projectId, freelancerId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Ensure that the freelancer has been assigned to the project
    const isFreelancerAssigned = project.assigned_freelancers.find(
      (f) => f.freelancer.toString() === freelancerId && f.status === 'accepted'
    );
    if (!isFreelancerAssigned) {
      return res.status(400).json({ message: 'Freelancer is not assigned to this project' });
    }

    // Create a performance record for the freelancer
    const performance = new Performance({
      project: projectId,
      freelancer: freelancerId,
    });

    await performance.save();
    res.status(201).json(performance);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update freelancer's performance (rating and feedback)
const updatePerformance = async (req, res) => {
  const { performanceId } = req.params;
  const { rating, feedback } = req.body;

  try {
    const performance = await Performance.findById(performanceId);
    if (!performance) {
      return res.status(404).json({ message: 'Performance record not found' });
    }

    // Update rating and feedback
    performance.rating = rating;
    performance.feedback = feedback;
    performance.status = 'completed';

    await performance.save();
    res.status(200).json(performance);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get performance records for a specific freelancer
const getFreelancerPerformance = async (req, res) => {
  const { freelancerId } = req.params;

  try {
    const performanceRecords = await Performance.find({ freelancer: freelancerId });
    res.status(200).json(performanceRecords);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createPerformanceRecord,
  updatePerformance,
  getFreelancerPerformance,
};
