import mongoose from 'mongoose';
import _ from 'lodash';
import bcryptjs from 'bcryptjs';

// membuat skema untuk user
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 8,
  },
  password: {
    type: String,
    minlength: 8,
  },
  age: {
    type: String,
    minLength: 2,
  },
});

// membuat konversi objek
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  return _.pick(userObject, ['id', 'email', 'age']);
};

// membuat hash dan salting password
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    const salt = await bcryptjs.genSalt(10);
    const pass = await bcryptjs.hash(user.password, salt);
    console.log(pass);
    user.password = pass;
    next();
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);

export default User;
