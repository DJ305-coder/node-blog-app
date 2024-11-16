import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { createPost, editPost, updatePost, deletePost } from "../controllers/postController";
import  upload  from "../config/multer";

const router = Router();

router.post('/post/create', upload.single('image'), isAuthenticated, createPost);
router.post('/post/update', isAuthenticated, updatePost);
router.get('/post/edit/:id', isAuthenticated, editPost);
router.get('/post/delete/:id', isAuthenticated, deletePost);


export default router