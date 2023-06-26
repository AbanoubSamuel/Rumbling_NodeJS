import { Document, Model, model, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    price: number;
    quantity: number;
    createdAt: Date;
}

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Product: Model<IProduct> = model<IProduct>('Product', productSchema);
