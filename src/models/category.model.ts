import { Schema, Document, model } from "mongoose";

export interface ICategory extends Document {
    name: string,
    discription?: string
}

const categorySchema: Schema<ICategory> = new Schema<ICategory>(
    {
        name: {
            type: String, 
            required: true,
            unique: true
        },
        discription: {
            type: String, 
            required: false,
            default: "No Description"
        }
    },
    {
        timestamps: true
    }
)

export default model<ICategory>('categories', categorySchema)
