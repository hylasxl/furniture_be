import { Schema, Document, model } from "mongoose";
import { IAccount } from "./account.model";
import { IProduct } from "./product.model";

interface ICartItems extends Document {
    productId: IProduct['_id'],
    quantity: number
}

interface ICart extends Document {
    accountId: IProduct['_id'],
    items: ICartItems[]
}

const cartItemsSchema: Schema<ICartItems> = new Schema<ICartItems>(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
)

const cartScheme: Schema<ICart> = new Schema<ICart>(
    {
        accountId: {
            type: Schema.Types.ObjectId,
            ref: "accounts",
            required: true
        },
        items: [cartItemsSchema]
    },
    {
        timestamps: true
    }
)

export default model<ICart>('carts', cartScheme)