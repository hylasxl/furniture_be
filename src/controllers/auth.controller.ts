import { Request, Response } from "express"
import { RegisterAccount, Login, GoogleLogin } from "../services/authService";
import { RegisterData } from "../types/registerData.type";
import { ResponseData } from "../types/responseData.type";
import { ILoginData } from "../types/loginData.type";
import { IGoogleData } from "../types/googleData.type";
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
    if (returnedData.RC !== 1) {
        return res.status(returnedData.statusCode).json({
            returnedData
        })
    }
    const accessToken = jwt.sign(returnedData.RD, String(process.env.JWT_SECRET), { expiresIn: '20m' })
    const refreshToken = jwt.sign(returnedData.RD, String(process.env.JWT_REFRESH_SECRET))
    const updateRefreshToken = await accountModel.findOneAndUpdate(
        {
            email: data.email
        },
        {
            $set:
            {
                refreshToken: refreshToken,
                accessToken: accessToken
            }
        },
        {
            new: true
        }
    ).exec()
    const modifiedReturnedData = {
        ...returnedData,
        RD: {
            ...returnedData.RD,
            refreshToken: refreshToken,
            accessToken: accessToken
        }
    };

    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true })
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
    return res.status(returnedData.statusCode).json({
        modifiedReturnedData
    })
}

export const googleLogin = async (req: Request, res: Response) => {
    const data: IGoogleData = req.body
    const returnedData: ResponseData = await GoogleLogin(data)
    if (returnedData.RC !== 1) {
        return res.status(returnedData.statusCode).json({
            returnedData
        })
    }
    const accessToken = jwt.sign(returnedData.RD, String(process.env.JWT_SECRET), { expiresIn: '20m' })
    const refreshToken = jwt.sign(returnedData.RD, String(process.env.JWT_REFRESH_SECRET))
    const updateRefreshToken = await accountModel.findOneAndUpdate(
        {
            email: data.user.email
        },
        {
            $set:
            {
                refreshToken: refreshToken,
                accessToken: accessToken
            }
        },
        {
            new: true
        }
    ).exec()
    const modifiedReturnedData = {
        ...returnedData,
        RD: {
            ...returnedData.RD,
            refreshToken: refreshToken,
            accessToken: accessToken
        }
    };
    
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true })
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
    return res.status(returnedData.statusCode).json({
        modifiedReturnedData
    })

}

