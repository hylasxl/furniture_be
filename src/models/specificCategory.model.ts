import { Schema, Document, model } from "mongoose";

export interface ISpecificCategory extends Document {
    name: string,
    discription?: string
}

const categorySchema: Schema<ISpecificCategory> = new Schema<ISpecificCategory>(
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

export default model<ISpecificCategory>('specificcategories', categorySchema)
