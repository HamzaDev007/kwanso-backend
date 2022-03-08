import * as mongoose from 'mongoose';
import User from '../interfaces/user';


const userSchema = new mongoose.Schema(
 {
  email: String,
  password: {
   type: String,
   get: (): undefined => undefined
  },
 },
 {
  toJSON: {
   virtuals: true,
   getters: true,
  },
 },
);


const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);
export default userModel;