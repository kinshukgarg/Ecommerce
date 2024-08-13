import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Name"],
    },
    photo: {
        type: String,
        required: [true, "Please upload a photo"],
    },
    price: {
        type: String,
        required: [true, "Please enter Price"],
    },
    stock: {
        type: String,
        required: [true, "Please enter Stock"],
    },
    category: {
        type: String,
        required: [true, "Please enter Category"],
        trim: true,
    },
}, {
    timestamps: true,
});
export const Product = mongoose.model("Product", schema);
