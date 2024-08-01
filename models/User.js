const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  documents: [{ name: String, reference: String }],
  last_connection: { type: Date }
});

module.exports = mongoose.model('User', userSchema);
