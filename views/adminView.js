const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const logger = require('../utils/logger');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.render('admin/users', { users });
  } catch (error) {
    logger.error('Error fetching users', error);
    res.status(500).send('Server error');
  }
});

router.post('/users/:id/role', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.role = req.body.role;
    await user.save();
    res.redirect('/admin/users');
  } catch (error) {
    logger.error('Error updating user role', error);
    res.status(500).send('Server error');
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/admin/users');
  } catch (error) {
    logger.error('Error deleting user', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
