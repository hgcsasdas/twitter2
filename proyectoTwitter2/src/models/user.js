const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
  }
);

module.exports = mongoose.model('User', UserSchema);