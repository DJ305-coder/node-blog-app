import User from "../models/user";
import bcrypt from "bcrypt";
import { IUser } from '../types/userTypes';

export const createUserService = async (name: string, email: string, password: string, otp: number): Promise<IUser> => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      otp
    });
    const savedUser = await user.save();
    return savedUser;
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const userVerifyService = async (email: string, otp: number): Promise<any> => {
  try {
    const user = await User.findOne({ email, otp });
    if (user) {
      user.isVerified = true;
      await user.save();
      return user;
    } else {
      return 'User not found';
    }
  } catch (error: any) {
    throw new Error(`Error verifying user: ${error.message}`);
  }
}

export const userLoginService = async (email: string, password: string): Promise<any> => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return 'User not found';
    }
    if (!user.isVerified) {
      return 'User is not verified';
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return 'Invalid password';
    }
    return user;
  } catch (error: any) {
    return `Error logging in: ${error.message}`;
  }
}

export const getUserByEmailService = async (email: string): Promise<any> => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return 'User not found';
    }
    return user;
  } catch (error: any) {
    return `Error logging in: ${error.message}`;
  }
}