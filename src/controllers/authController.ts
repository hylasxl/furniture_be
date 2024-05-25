import { Request, Response } from "express"
import { RegisterAccount, Login } from "../services/authService";
import { RegisterData } from "../types/registerData.type";
import { ResponseData } from "../types/responseData.type";
import { ILoginData } from "../types/loginData.type";
import accountModel from "../models/account.model";
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv";

configDotenv()

export const registerAccount = async (req: Request, res: Response) => {
    const data: RegisterData = req.body
    const returnedData: ResponseData = await RegisterAccount(data)
    res.status(returnedData.statusCode).json({
        returnedData
    })
}

export const login = async (req: Request, res: Response) => {
    const data: ILoginData = req.body
    const returnedData: ResponseData = await Login(data)
    const accessToken = jwt.sign(returnedData.RD, String(process.env.JWT_SECRET), { expiresIn: '20m' })
    const newRefreshToken = jwt.sign(returnedData.RD, String(process.env.JWT_REFRESH_SECRET))
    console.log(returnedData.RD);
    const updateRefreshToken = await accountModel.findOneAndUpdate(
        {
            email: data.email
        },
        {
            $set:
            {
                refreshToken: newRefreshToken
            }
        },
        {
            new: true
        }
    ).exec()
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true })
    res.status(returnedData.statusCode).json({
        returnedData
    })
}

module.exports = {
    registerAccount,
    login
}