import e, { NextFunction, Request, Response } from 'express';
import { createUserService, getUserByEmailService, userLoginService, userVerifyService } from '../services/userService';
import { sendMail } from '../utils/mailer';
import { generateOtp } from '../utils/helpers';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Blacklist from '../models/blacklist';
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }
    const otp = parseInt(generateOtp(6), 10);
    const newUser = await createUserService(name, email, password, otp);
    await sendMail(email, 'Verify OTP', 'This is your otp : ' + otp)
    res.status(201).json(newUser);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      res.status(400).json({ message: 'All Fields are required' });
      return;
    }

    const result = await userVerifyService(email, otp);

    if (typeof result === 'string') {
      res.status(400).json({ message: result });
      return;
    } else {
      res.status(201).json({ message: 'User verified successfully' });
    }

  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    const result = await userLoginService(email, password);
    if (typeof result === 'string') {
      res.status(400).json({ message: result });
    } else {
     
      const secretKey = process.env.JWT_SECRET || 'secret-key'; 
      const payload = {
        _id: result._id,
        name: result.name,
        email: result.email,
      };

      const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
      
      const response = {
        token,
        name: result.name,
        email: result.email,
      };

      res.status(200).json({ message: 'User logged in successfully', response });
    }

  } catch (error:any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export const userDetails = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userEmail = req.user.email;
    if (!userEmail) {
      res.status(400).json({ message: 'User email not found in request.' });
      return;
    }
    const result = await getUserByEmailService(userEmail);
    if (typeof result === 'string') {
      res.status(400).json({ message: result });
    }
    const response = {
      _id: result._id,
      name: result.name,
      email: result.email,
    };
    res.status(200).json({
      message: 'User details retrieved successfully',
      user: response,
    });
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const userProfileUpdate = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const { name } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    );
    res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const userLogout = async (req: any, res: Response): Promise<any> => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token missing.' });
    }

    const bearerToken = token.split(' ')[1];

    if (!bearerToken) {
      return res.status(401).json({ error: 'Access denied. Invalid token format.' });
    }

    const blacklistedToken = new Blacklist({ token: bearerToken });
    await blacklistedToken.save();
    
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};