import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define a separate schema for product items
const ProductItemSchema = new Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true }
});

const orderSchema = new Schema({
    email: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    add: { type: String, required: true },
    apar: { type: String },
    city: { type: String, required: true },
    pcode: { type: String },
    ph: { type: String, required: true },
    products: {
        type: [ProductItemSchema],
        required: true,
        validate: {
            validator: function(products) {
                return products && products.length > 0;
            },
            message: 'At least one product is required in the order'
        }
    },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Clean up any previous models to avoid overwrite warnings
mongoose.models = {};

export default mongoose.models.Order || mongoose.model("Order", orderSchema);