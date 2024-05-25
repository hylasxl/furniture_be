import { Schema, Document, model, SchemaType } from "mongoose"
import { IProduct } from "./product.model"
import { IAccount } from "./account.model"


interface IProducts extends Document {
    productId: IProduct['_id'],
    quantity: number
}

export interface IOrder extends Document {
    accountId: IAccount['_id'],
    products: IProducts[],
    totalPrice: number,
    orderDate: Date,
    deliveryDate: Date,
    status: string
}

const productSchema: Schema<IProducts> = new Schema<IProducts>(
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

const orderSchema: Schema<IOrder> = new Schema<IOrder>(
    {
        accountId: {
            type: Schema.Types.ObjectId,
            ref: "accounts",
            required: true
        },
        products: [productSchema],
        totalPrice: {
            type: Number,
            required: true,
            default: 0, 
            min: 0
        },
        orderDate: {
            type: Date,
            required: true,
            default: new Date(),
            max: new Date()
        },
        deliveryDate: {
            type: Date,
            required: true,
            default: new Date(),
            min: new Date()
        },
        status:{
            type: String, 
            required: true,
            default: "Pending"
        }

    },
    {
        timestamps: true
    }
)

export default model<IOrder>('orders',orderSchema)