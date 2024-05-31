import { Schema, Document, model } from "mongoose";
import { IAccountType } from "./accountType.model";

export interface IToken extends Document {
    token: string
}

export interface IAuthProviders {
    uid: string,
    authToken: string,
    accessToken?: IToken,
    refreshToken?: string
}

export interface IAccount extends Document {
    password?: string,
    email: string,
    accountType: IAccountType['_id'],
    isActivated: boolean,
    accessToken?: string,
    refreshToken?: string,
    authProviders?: {
        google?: IAuthProviders,
    },
    registerType: string,
    loginType?: string
}

const authProvidersSchema: Schema<IAuthProviders> = new Schema<IAuthProviders>(
    {
        accessToken: {
            type: String,
            required: false
        },
        uid: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String,
            required: true
        },
        authToken: {
            type: String,
            required: true
        }
    },
)

const accountSchema: Schema<IAccount> = new Schema<IAccount>(
    {
        password: {
            type: String,
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
        accessToken: {
            type: String
        },
        refreshToken: {
            type: String
        },
        authProviders: {
            google: authProvidersSchema,
        },
        registerType: {
            type: String,
            default: "Normal"
        },
        loginType: {
            type: String,
            default: "Normal"
        }
    },
    {
        timestamps: true
    }
)

accountSchema.virtual('accountInfo', {
    ref: 'accountinfos', 
    localField: '_id', 
    foreignField: 'accountId', 
    justOne: true, 
});

accountSchema.set('toObject', { virtuals: true });
accountSchema.set('toJSON', { virtuals: true });

export default model<IAccount>('accounts', accountSchema)
