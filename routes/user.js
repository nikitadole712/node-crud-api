const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserShema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

UserShema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject._id;
  delete userObject.__v;

  return userObject;
};

const user = mongoose.model('userData', UserShema);
module.exports = user;
