const User = require('../models/userModel');
const Project = require('../models/projectModel');

// View all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// View all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('owner', 'name email');
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Change user role
const changeUserRole = async (req, res) => {
  const { userId, newRole } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user role
    user.role = newRole;
    await user.save();
    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update project status
const updateProjectStatus = async (req, res) => {
  const { projectId, newStatus } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.status = newStatus;
    await project.save();
    res.status(200).json({ message: 'Project status updated successfully', project });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getAllProjects,
  changeUserRole,
  deleteUser,
  updateProjectStatus,
};
