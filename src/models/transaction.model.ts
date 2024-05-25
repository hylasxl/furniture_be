import { Schema, Document, model } from "mongoose";
import { IAccount } from "./account.model";
import { IPayment } from "./payment.model";

export interface ITransaction extends Document {
    accountId: IAccount['_id'];
    paymentId: IPayment['_id'];
    amount: number;
    date: Date;
}

const transactionSchema: Schema<ITransaction> = new Schema<ITransaction>({
    accountId: {
        type: Schema.Types.ObjectId,
        ref: "accounts",
        required: true
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: "payments",
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    }
});

export default model<ITransaction>('transactions', transactionSchema);
