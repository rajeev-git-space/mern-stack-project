const express = require('express');
const {
  getAllUsers,
  getAllProjects,
  changeUserRole,
  deleteUser,
  updateProjectStatus,
} = require('../controllers/adminController');
const protect = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware'); // A middleware to check if the user is an admin

const router = express.Router();

// GET /api/admin/users - Get all users (admin only)
router.get('/users', protect, isAdmin, getAllUsers);

// GET /api/admin/projects - Get all projects (admin only)
router.get('/projects', protect, isAdmin, getAllProjects);

// PUT /api/admin/users/:userId/role/:newRole - Change user role (admin only)
router.put('/users/:userId/role/:newRole', protect, isAdmin, changeUserRole);

// DELETE /api/admin/users/:userId - Delete a user (admin only)
router.delete('/users/:userId', protect, isAdmin, deleteUser);

// PUT /api/admin/projects/:projectId/status/:newStatus - Update project status (admin only)
router.put('/projects/:projectId/status/:newStatus', protect, isAdmin, updateProjectStatus);

module.exports = router;
