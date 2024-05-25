import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

declare module 'express-serve-static-core' {
    interface Request {
        tokenPayload?: string | JwtPayload;
    }
}
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const userAccessToken = req.cookies.accessToken
    if (!userAccessToken) return res.sendStatus(401)
    let tokenPayload = {}
    try {
        tokenPayload = jwt.verify(userAccessToken, process.env.JWT_SECRET as string)
    } catch (err) {
        return res.sendStatus(403)
    }
    req.tokenPayload = tokenPayload
    next()

}