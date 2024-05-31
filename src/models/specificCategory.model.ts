import { Schema, Document, model } from "mongoose";
import { ICategory } from "./category.model";

export interface ISpecificCategory extends Document {
    name: string,
    description?: string,
    categoryId : ICategory['_id']
}

const categorySchema: Schema<ISpecificCategory> = new Schema<ISpecificCategory>(
    {
        name: {
            type: String, 
            required: true,
            unique: true
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'categories',
        },
        description: {
            type: String, 
            required: true,
            default: "No Description"
        }
    },
    {
        timestamps: true
    }
)

export default model<ISpecificCategory>('specificcategories', categorySchema)
