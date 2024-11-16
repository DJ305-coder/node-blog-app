import mongoose, { Schema } from "mongoose";
import { IPost } from "../types/postTypes";

const postSchema = new Schema(
    {
        userId:{
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },  
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        likes: {
            type: [Array],
            required: false
        }
    },
    { timestamps: true }
)

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post