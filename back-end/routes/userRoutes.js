const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware'); // Import middleware

const router = express.Router();

// POST /api/users/register - Register a new user
router.post('/register', registerUser);

// POST /api/users/login - Login a user
router.post('/login', loginUser);

// Example: GET /api/users/me - Get user profile (protected route)
router.get('/me', protect, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

module.exports = router;
