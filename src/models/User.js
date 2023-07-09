const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    category: {
      type: String,
      default: 'general',
    },
    sources: {
      type: [String],
      default: [],
    },
    articles: {
      type: [
        {
          id: String,
          read: {
            type: Boolean,
            default: false,
          },
          favorite: {
            type: Boolean,
            default: false,
          },
        },
      ],
      default: [],
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
