import { Schema, model } from 'mongoose';

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
  verificationToken: {
    type: String,
  },
  verificationValid: {
    type: Date,
  },
});

export default model('user', UserSchema);
