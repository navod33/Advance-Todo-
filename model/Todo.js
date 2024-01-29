const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');

const TODOSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },

  //Labels/Tags
});

module.exports = mongoose.model('Todo', TODOSchema);
