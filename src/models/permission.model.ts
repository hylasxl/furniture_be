import { Schema, Document, model } from "mongoose";

export interface IPermission extends Document{
    requestURL: string,
    isActivated: boolean,
    description?: string,
}

const permissionSchema: Schema<IPermission> = new Schema<IPermission>(
    {
        requestURL: {
            type: String,
            unique: true,
            required: true
        },
        isActivated: {
            type: Boolean,
            required: true,
            default: true
        },
        description:{
            type: String,
            required: false,
            default: "No Description"
        }
    },
    {
        timestamps: true
    }
)

export default model<IPermission>('permissions', permissionSchema)
