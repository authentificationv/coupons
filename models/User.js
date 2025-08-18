const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  civility: { type: String, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  birthday: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: Number },
  marital: { type: String, required: true },
  occupation: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },

  uniqueString: { type: String },
  isValid: { type: Boolean, default: true },

  profilePicture: { type: String, required: false },
  idCard: { type: String, required: false },
  solde: { type: Number, required: true },

  // isValid: {type: Boolean, default: false},
  isAdmin: { type: Boolean, default: false },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
