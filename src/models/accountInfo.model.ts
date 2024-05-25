import { Schema, Document, model } from "mongoose";
import { IAccount } from "./account.model";

interface IAccountInfo extends Document {
    accountId: IAccount['_id'];
    firstName: string;
    lastName: string;
    dateofBirth: Date;
    avatarURL?: string;
    gender: string;
    address: string;
    phone: string;
}

const accountInfoSchema: Schema<IAccountInfo> = new Schema<IAccountInfo>(
    {
        accountId: {
            type:   Schema.Types.ObjectId,
            ref: 'accounts',
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: false,
        },
        dateofBirth: {
            type: Date,
            max: new Date(),
        },
        avatarURL: {
            type: String,
            required: false,
        },
        gender: {
            type: String,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
            required: false,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
)
export default model<IAccountInfo>("accountinfos", accountInfoSchema);
