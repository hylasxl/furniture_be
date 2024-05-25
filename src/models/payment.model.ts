import mongoose, { Document, Schema } from 'mongoose';
import { IAccount } from './account.model';
import { IOrder } from './order.model';

export interface IPayment extends Document {
    accountId: IAccount['_id'];
    orderId: IOrder['_id'];
    amount: number;
    paymentDate: Date;
    paymentMethod: string;
    status: string;
}

const paymentSchema: Schema<IPayment> = new Schema<IPayment>({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "orders",
        required: true
    }
    ,
    accountId: {
        type: Schema.Types.ObjectId,
        ref: "accounts",
        required: true
    }
    ,
    amount: {
        type: Number,
        required: true,
        min: 0
    }
    ,
    paymentDate: {
        type: Date,
        required: true
    }
    ,
    paymentMethod: {
        type: String,
        required: true
    }
    ,
    status: {
        type: String,
        required: true,
        default: "Pending"
    }
});

export default mongoose.model<IPayment>('payments', paymentSchema);
