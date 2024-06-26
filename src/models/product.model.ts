import { Schema, Document, model, SchemaTypes } from "mongoose";
import { ISpecificCategory } from "./specificCategory.model";

export interface IProductSize {
    width: number,
    length: number,
    height: number
}

export interface IProduct extends Document {
    name: string,
    specificCategoryId: ISpecificCategory['_id'],
    originalPrice: number,
    currentPrice?: number,
    description?: string,
    thumbnailURL?: string,
    stock: number,
    producer?: string,
    color?: string,
    size: IProductSize,
    warrantyDuration?: number
}


const productSizeSchema: Schema<IProductSize> = new Schema<IProductSize>({
    width: {
        type: Number
    },
    length: {
        type: Number
    },
    height: {
        type: Number
    }
})

const productSchema: Schema<IProduct> = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        specificCategoryId: {
            type: Schema.Types.ObjectId,
            ref: "specificcategories",
            required: true
        },
        originalPrice: {
            type: Number,
            required: true,
            min: 0
        },
        currentPrice: {
            type: Number,
            required: true,
            min: 0
        },
        description: {
            type: String,
            required: false,
            default: "No Description"
        },
        thumbnailURL: {
            type: String,
            required: false,
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        },
        producer: {
            type: String,
            default: "Nội thất Viva"
        },
        color: {
            type: String,
        },
        size: productSizeSchema,
        warrantyDuration: {
            type: Number,
            default: 0,
            min: 0
        }

    },
    {
        timestamps: true
    }
)

export default model<IProduct>('products', productSchema)