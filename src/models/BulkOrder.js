import mongoose from 'mongoose';

const BulkOrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    product: { type: String },
    quantity: { type: String },
    message: { type: String },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
    },
    adminThought: { type: String },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.BulkOrder || mongoose.model('BulkOrder', BulkOrderSchema);
