import jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import User from './user.interface';

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  tokens: [{
    token: String,
  }],
});

userSchema.methods.generateAuthTokenAndSave = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY as string);
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

const User = mongoose.model<User & mongoose.Document>('User', userSchema);

export default User;
