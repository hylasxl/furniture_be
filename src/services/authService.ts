import accountModel, { IAuthProviders } from "../models/account.model";
import accountInfoModel from "../models/accountInfo.model";
import accountTypeModel from "../models/accountType.model";
import permissionAccountTypeModel from "../models/permissionAccountType.model";
import { configDotenv } from "dotenv";
import { RegisterData } from "../types/registerData.type";
import { ILoginData } from "../types/loginData.type";
import { splitFullName } from "../utils/function.utils";
import crypto from "crypto"
import jwt from "jsonwebtoken"
import { IToken } from "../models/account.model";
import { IGoogleData } from "../types/googleData.type";
import { ResponseData } from "../types/responseData.type";
configDotenv()

const algorithm = "aes-256-cbc"
const key = crypto.scryptSync(String(process.env.CRYPTO_PASSWORD), 'salt', 32)
const iv = Buffer.alloc(16, 0)

const encrypt = (password: string) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(String(password), 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
}

const decrypt = (encryptedPassword: string) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(String(encryptedPassword), 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}



export const RegisterAccount = async (data: RegisterData): Promise<ResponseData> => {

    const encrypted = encrypt(data.password)

    try {
        const accountTypeCustomerId = await accountTypeModel.findOne(
            {
                typeCode: "CUS"
            }
        ).select('_id').exec()

        const insertedAccount = await accountModel.insertMany([
            {
                password: encrypted,
                email: data.email,
                accountType: accountTypeCustomerId?._id || "66511d0c7c6db88cd97d0e8d",
                isActivated: true,
                registerType: "Normal"
            }
        ]
        )

        const insertedId = insertedAccount[0]._id
        const fullname = data.name
        const { firstName, lastName } = splitFullName(fullname)

        const insertedAccountInfo = await accountInfoModel.insertMany([
            {
                accountId: insertedId,
                firstName,
                lastName,
                // dateofBirth: "",
                // avatarURL: "",
                // gender: "",
                // address: "",
                phone: data.phone
            }
        ])
        return {
            RC: 1,
            RM: "Register Successfully",
            RD: {},
            statusCode: 200
        }
    } catch (err) {
        console.error('Error executing query:', err);
        return {
            RC: 0,
            RM: "Register Failed",
            RD: {},
            statusCode: 500
        }
    }
}

export const Login = async (data: ILoginData): Promise<ResponseData> => {
    try {
        const updateRefreshToken = await accountModel.findOneAndUpdate(
            {
                email: data.email
            },
            {
                $set:
                {
                    refreshToken: "",
                    loginType: "Normal",
                    accessToken: ""
                }
            },
            {
                new: true
            }
        ).exec()
        const foundUser = await accountModel.findOne(
            {
                email: data.email
            },
            {
                createdAt: 0,
                updatedAt: 0,
                __v: 0
            }
        ).exec()

        if (!foundUser) {
            return {
                RC: 0,
                RM: "User Not Found",
                RD: {},
                statusCode: 200
            }
        }

        const userData = await accountInfoModel.findOne(
            {
                accountId: foundUser._id
            },
            {
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
                _id: 0,
                accountId: 0
            }
        ).exec()

        const decryptedPassword: string = decrypt(String(foundUser?.password))
        console.log(decryptedPassword);
        
        if (decryptedPassword !== data.password) {
            return {
                RC: 0,
                RM: "Invalid credentials",
                statusCode: 200,
                RD: {}
            }
        }

        const permissions = await permissionAccountTypeModel.find({
            accountTypeId: foundUser.accountType
        }).exec()

        const returnedUserData = {
            ...foundUser.toObject(),
            ...userData?.toObject(),
            permissions
        }


        return {
            RC: 1,
            RM: "Login Successfully",
            RD: returnedUserData,
            statusCode: 200
        }
    } catch (err) {
        return {
            RC: 0,
            RM: "Login Failed",
            RD: {},
            statusCode: 500
        }
    }
}

export const GoogleLogin = async (data: IGoogleData): Promise<ResponseData> => {
    try {
        
        const requestToken = data.token
        const userData: any = data.user
        const uid = userData.uid
        const authGoogleProviders: IAuthProviders = {
            uid,
            authToken: requestToken,
            accessToken: userData.stsTokenManager.accessToken,
            refreshToken: userData.stsTokenManager.refreshToken
        }
        
        const matchedUid = await accountModel.findOne({ 'authProviders.google.uid': uid }).exec()
        if (!matchedUid) {
            
            const accountTypeCustomerId = await accountTypeModel.findOne(
                {
                    typeCode: "CUS"
                }
            ).select('_id').exec()

            const insertedAccount = await accountModel.insertMany({
                email: userData.email,
                accountType: accountTypeCustomerId?._id,
                isActivated: true,
                authProviders: {
                    google: authGoogleProviders
                },
                registerType: "Google",
                loginType: "Google"
            })

            console.log(insertedAccount);
            

            const insertedId = insertedAccount[0]._id
            const { firstName, lastName } = splitFullName(userData.displayName)
            const insertedAccountInfo = await accountInfoModel.insertMany({
                accountId: insertedId,
                firstName,
                lastName,
                avatarURL: userData.photoURL,
                phone: ""
            })
        } else {
            const updateRefreshToken = await accountModel.findOneAndUpdate(
                {
                    email: userData.email
                },
                {
                    $set:
                    {
                        refreshToken: "",
                        loginType: "Google",
                        accessToken: "",
                        authProviders: {
                            google: authGoogleProviders
                        }
                    }
                },
                {
                    new: true
                }
            ).exec()
        }

        const foundUser = await accountModel.findOne(
            {
                email: userData.email
            },
            {
                createdAt: 0,
                updatedAt: 0,
                __v: 0
            }
        ).exec()

        if (!foundUser) {
            return {
                RC: 0,
                RM: "User Not Found",
                RD: {},
                statusCode: 200
            }
        }

        const foundUserData = await accountInfoModel.findOne(
            {
                accountId: foundUser._id
            },
            {
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
                _id: 0,
                accountId: 0
            }
        ).exec()

        const permissions = await permissionAccountTypeModel.find({
            accountTypeId: foundUser.accountType
        }).exec()

        const returnedUserData = {
            ...foundUser.toObject(),
            ...foundUserData?.toObject(),
            permissions
        }

        return {
            RC: 1,
            RM: "Login with Google successfully",
            RD: returnedUserData,
            statusCode: 200
        }
    }
    catch (err) {
        console.log(err);

        return {
            RC: 0,
            RM: "Login Failed",
            RD: {},
            statusCode: 500
        }
    }
}
