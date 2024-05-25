import { Schema, Document, model } from "mongoose";
import { IAccountType } from "./accountType.model";

export interface IToken extends Document {
    token: string
}

interface IAuthProviders extends Document {
    accessToken?: IToken,
    refreshToken?: string // Modified to remove nested refreshToken
}

export interface IAccount extends Document {
    password?: string,
    email: string,
    accountType: IAccountType['_id'],
    isActivated: boolean,
    token?: string,
    refreshToken?: string,
    authProviders?: {
        google?: IAuthProviders,
        facebook?: IAuthProviders
    },
    registerType: string
}

const authProvidersSchema: Schema<IAuthProviders> = new Schema<IAuthProviders>(
    {
        accessToken: {
            type: String,
            required: false
        },
        // refreshToken field removed from here
    },
    {
        timestamps: true
    }
)

const accountSchema: Schema<IAccount> = new Schema<IAccount>(
    {
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        accountType: {
            type: Schema.Types.ObjectId,
            ref: "accounttypes",
            required: true
        },
        isActivated: {
            type: Boolean,
            required: true,
            default: true
        },
        token: {
            type: String
        },
        refreshToken: {
            type: String
        },
        authProviders: {
            google: authProvidersSchema,
            facebook: authProvidersSchema
        },
        registerType: {
            type: String,
            default: "Normal"
        }
    },
    {
        timestamps: true
    }
)

export default model<IAccount>('accounts', accountSchema)
