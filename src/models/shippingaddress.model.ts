import { Schema, Document, model } from "mongoose";
import { IAccount } from "./account.model";

export interface IShippingAddress extends Document{
    accountId: IAccount['_id'],
    street: string,
    city: string,
    state?: string,
    country: string,
    zipcode?: number
}

const shippingAddressSchema: Schema<IShippingAddress> = new Schema<IShippingAddress>(
    {
        accountId: {
            type: Schema.Types.ObjectId,
            ref: "accounts",
            required: true
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: true
        },
        zipcode: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
)

export default model<IShippingAddress>('shippingaddresses',shippingAddressSchema)