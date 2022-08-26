import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const shopingCartSchema = new Schema({
    products: {
        type: Array,
        default:[]
    }
},{
    timestamps: true,
});

export default model('ShoppingCart', shopingCartSchema);
