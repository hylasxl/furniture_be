import { Schema, Document, model } from "mongoose"
import { IAccountType } from "./accountType.model"
import { IPermission } from "./permission.model"

interface IPermissionAccountType extends Document {
    permissionId: IPermission['_id'],
    accountTypeId: IAccountType['_id']
}

const permissionAccountTypeSchema: Schema<IPermissionAccountType> = new Schema<IPermissionAccountType>(
    {
        permissionId: {
            type: Schema.Types.ObjectId,
            ref: "permissions",
            required: true
        },
        accountTypeId: {
            type: Schema.Types.ObjectId,
            ref: "accounttypes",
            required: true
        }
    },
    {
        timestamps: true
    }
)

permissionAccountTypeSchema.index(
    {
        permissionId: 1,
        accountTypeId: 1
    },
    {
        unique: true
    }
)

export default model<IPermissionAccountType>('permissionaccounttypes',permissionAccountTypeSchema)