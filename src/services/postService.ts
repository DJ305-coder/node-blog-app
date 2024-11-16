import Post from "../models/post";

export const createPostService = async (userId: string, title: string, description: string, image: string): Promise<any> => {
    try{
        const post = new Post({
            userId,
            title,
            description,
            image
        })
        const savedPost = await post.save();
        return savedPost;
    }catch(error: any){
        throw new Error(`Error creating post: ${error.message}`);
    }
}

export const editPostService = async (postId: string): Promise<any> => {
    try{
        const post = await Post.findById(postId);
        if(!post){
            throw new Error('Post not found');
        }
        return post;
    }catch(error: any){
        throw new Error(`Error editing post: ${error.message}`);
    }
}

export const updatePostService = async (postId: string, title: string, description: string, image: string): Promise<any> => {
    try{
        const post = await Post.findById(postId);
        if(!post){
            throw new Error('Post not found');
        }
        post.title = title;
        post.description = description;
        post.image = image;
        const updatedPost = await post.save();
        return updatedPost;
    }catch(error: any){
        throw new Error(`Error editing post: ${error.message}`);
    }
}


export const deletePostService = async (postId: string): Promise<any> => {
    try{
        const post = await Post.findByIdAndDelete(postId);
        if(!post){
            throw new Error('Post not found');
        }
        return post;
    }catch(error: any){
        throw new Error(`Error deleting post: ${error.message}`);
    }
}
