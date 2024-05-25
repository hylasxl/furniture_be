import { Schema, Document, model } from "mongoose";

export interface IAccountType extends Document {
    typeCode: string,
    typeName: string
}

const accountTypeSchema: Schema<IAccountType> = new Schema<IAccountType>(
    {
        typeCode: {
            type: String,
            required: true,
            unique: true
        },
        typeName: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default model<IAccountType>('accounttypes', accountTypeSchema)
