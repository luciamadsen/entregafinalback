const User = require('../models/User');
const logger = require('../utils/logger');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email role');
    res.status(200).json(users);
  } catch (error) {
    logger.error('Error fetching users', error);
    res.status(500).send('Server error');
  }
};

exports.deleteInactiveUsers = async (req, res) => {
  try {
    const now = new Date();
    const users = await User.find();
    users.forEach(async user => {
      if ((now - new Date(user.last_connection)) > 2 * 24 * 60 * 60 * 1000) { // 2 días
        // Enviar correo de eliminación (lógica no incluida)
        await User.findByIdAndDelete(user._id);
      }
    });
    res.status(200).send('Inactive users deleted');
  } catch (error) {
    logger.error('Error deleting inactive users', error);
    res.status(500).send('Server error');
  }
};
