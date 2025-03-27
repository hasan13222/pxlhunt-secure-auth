import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';

// Role-based authentication middleware
export const checkRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
        }
        next();
    };
};
