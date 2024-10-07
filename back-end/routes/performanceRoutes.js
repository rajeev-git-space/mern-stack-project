const express = require('express');
const {
  createPerformanceRecord,
  updatePerformance,
  getFreelancerPerformance,
} = require('../controllers/performanceController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/performance/:projectId/:freelancerId - Create performance record (only after assigning a freelancer)
router.post('/:projectId/:freelancerId', protect, createPerformanceRecord);

// PUT /api/performance/:performanceId - Update freelancer performance (project owners)
router.put('/:performanceId', protect, updatePerformance);

// GET /api/performance/freelancer/:freelancerId - View performance records for a freelancer (admin or freelancer)
router.get('/freelancer/:freelancerId', protect, getFreelancerPerformance);

module.exports = router;
