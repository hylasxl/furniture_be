import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module 'express-serve-static-core' {
    interface Request {
        tokenPayload?: JwtPayload | string;
    }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const userAccessToken = req.cookies.accessToken;
    if (!userAccessToken) {
        return res.sendStatus(401); 
    }

    try {
        const tokenPayload = jwt.verify(userAccessToken, process.env.JWT_SECRET as string);
        req.tokenPayload = tokenPayload; 
        next(); 
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.sendStatus(403);
        }
        
        return res.sendStatus(500); 
    }
};
