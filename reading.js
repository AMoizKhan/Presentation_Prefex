const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  data: {
    type: [Number],
    required: true,
  },
  name: {
    type: String,
  },
  color: {
    type: String,
  },
});


module.exports = Reading;
