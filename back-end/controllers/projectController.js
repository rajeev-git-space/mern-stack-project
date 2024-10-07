const Project = require('../models/projectModel');

// Create a new project
const createProject = async (req, res) => {
  const { title, description, skills_required } = req.body;

  try {
    const project = new Project({
      title,
      description,
      skills_required,
      owner: req.user.userId, // The owner is the currently logged-in user
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all projects (for freelancers to view)
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: 'open' });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get projects owned by a specific user
const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.userId });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update project status
const updateProjectStatus = async (req, res) => {
  const { projectId } = req.params;
  const { status } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the user is the project owner
    if (project.owner.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized to update this project' });
    }

    project.status = status;
    await project.save();
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Apply for a project (Freelancer applies)
const applyForProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the freelancer has already applied
    const alreadyApplied = project.assigned_freelancers.find(
      (f) => f.freelancer.toString() === req.user.userId
    );
    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied for this project' });
    }

    // Add freelancer to the assigned_freelancers array with 'pending' status
    project.assigned_freelancers.push({
      freelancer: req.user.userId,
      status: 'pending',
    });

    await project.save();
    res.status(200).json({ message: 'Application submitted successfully', project });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Assign a freelancer to a project (Owner assigns a freelancer)
const assignFreelancer = async (req, res) => {
  const { projectId, freelancerId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the user making the request is the owner of the project
    if (project.owner.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized to assign freelancers' });
    }

    // Find the freelancer in the assigned_freelancers array
    const freelancerApplication = project.assigned_freelancers.find(
      (f) => f.freelancer.toString() === freelancerId
    );
    if (!freelancerApplication) {
      return res.status(404).json({ message: 'Freelancer has not applied for this project' });
    }

    // Update the freelancer's status to 'accepted'
    freelancerApplication.status = 'accepted';

    // Save the project with updated assignment status
    await project.save();
    res.status(200).json({ message: 'Freelancer assigned successfully', project });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getMyProjects,
  updateProjectStatus,
  applyForProject,       // New function for applying to a project
  assignFreelancer,      // New function for assigning a freelancer
};
