import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    code: {
        type: Number,
    },
    image: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    count: {
        type: Number,
        default: 1,
    },
});

export default model('Product', productSchema);
