import { Schema, Document, model } from "mongoose";
import { IAccount } from "./account.model";
import { IProduct } from "./product.model";


interface IReview extends Document {
    accountId: IAccount['_id'],
    productId: IProduct['_id'],
    rating: number,
    comment: string
}

const reviewSchema: Schema<IReview> = new Schema<IReview>(
    {
        accountId: {
            type: Schema.Types.ObjectId,
            ref: "accounts",
            required: true
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: true
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 5
        },
        comment: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default model<IReview>('reviews', reviewSchema)