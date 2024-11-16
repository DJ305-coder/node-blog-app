import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/userTypes';


const userSchema: Schema<IUser> = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isVerified: {
        type: Boolean,
        default:false
      },
      otp : {
        type: Number,
      }

    },
    { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
  