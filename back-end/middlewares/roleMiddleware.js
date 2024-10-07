const User = require('../models/userModel');

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied, admin only' });
  }
  next();
};

module.exports = { isAdmin };
