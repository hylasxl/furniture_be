import { Schema, Document,model } from "mongoose";

export interface IDiscount extends Document{
    code: string,
    description: string,
    discountAmount: number,
    expiryDate: Date,
    status: string,
}

const discountSchema:Schema<IDiscount> = new Schema<IDiscount>(
    {
        code: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
            default: "No Description"
        },
        discountAmount:{
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 100
        },
        expiryDate:{
            type: Date,
            required: true,
            min: new Date()
        },
        status:{
            type: String,
            required: true,
            default: "Valid"
        }
    },
    {
        timestamps: true
    }
)

export default model<IDiscount>('discounts',discountSchema)