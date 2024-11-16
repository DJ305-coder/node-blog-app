import mongoose, { Schema } from 'mongoose';

const BlacklistSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Blacklist', BlacklistSchema);
