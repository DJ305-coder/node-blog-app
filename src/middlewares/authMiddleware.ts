import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import Blacklist from '../models/blacklist';

dotenv.config();
export const isAuthenticated = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token missing.' });
    }
    const bearerToken = token.split(' ')[1];
    if (!bearerToken) {
        return res.status(401).json({ error: 'Access denied. Invalid token format.' });
    }
    const blacklistedToken = await Blacklist.findOne({ token: bearerToken });
    if (blacklistedToken) {
        return res.status(401).json({ error: 'Session expired, Please login again' });
    }
    try {
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET || 'secret-key');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token or token expired' });
    }
};
