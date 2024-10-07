const express = require('express');
const {
  createProject,
  getAllProjects,
  getMyProjects,
  updateProjectStatus,
} = require('../controllers/projectController');
const protect = require('../middlewares/authMiddleware'); // Ensure only authenticated users can perform actions

const router = express.Router();

// POST /api/projects - Create a new project (protected, only for project owners)
router.post('/', protect, createProject);

// GET /api/projects - Get all open projects (accessible by anyone, for freelancers to view)
router.get('/', getAllProjects);

// GET /api/projects/my - Get projects created by the logged-in user (protected)
router.get('/my', protect, getMyProjects);

// PUT /api/projects/:projectId/status - Update the project status (protected, only for project owners)
router.put('/:projectId/status', protect, updateProjectStatus);

module.exports = router;
