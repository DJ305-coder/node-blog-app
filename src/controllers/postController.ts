import { NextFunction, Request, Response } from "express";
import { createPostService, deletePostService, editPostService, updatePostService } from "../services/postService";
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
export const createPost = async (req:any, res:Response):Promise<any> => {
    try {
        const {title, description} = req.body;
        const image = req.file ? req.file.path : null;
        if (!image) {
            return res.status(400).json({ message: "No file uploaded" });
          }
        const userId = req.user._id;
        const post = await createPostService(userId, title, description, image);
        if(!post){
            return res.status(400).json({ message: 'Post not created' });
        }
        return res.status(201).json({ message: 'Post created successfully', post });
    } catch (error:any) {
        return res.status(500).json({ message: error.message });
    }
}


export const editPost = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params; 
        const post = await editPostService(id);
        if (!post) {
            return res.status(400).json({ message: 'Post not found' });
        }
        return res.status(200).json({ message: 'Post found successfully', post });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};


export const updatePost = async (req:any, res:Response):Promise<any> => {
    try {
        
        const {_id, title, description, image } = req.body;
        const post = await updatePostService(_id, title, description, image);
        if(!post){
            return res.status(400).json({ message: 'Post not found' });
        }
        return res.status(200).json({ message: 'Post edited successfully', post });
    } catch (error:any) {
        return res.status(500).json({ message: error.message });
    }
}

export const deletePost = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params; 
        const post = await deletePostService(id);
        if (!post) {
            return res.status(400).json({ message: 'Post not found' });
        }
        return res.status(200).json({ message: 'Post deleted successfully', post });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
