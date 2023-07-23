import {Router} from "express"
import { getPosts,addPost,deletePost } from "../controlers/postsControler.js"
const router = Router();

router.post('/getPost', getPosts)
router.post('/addPost',addPost)
router.delete('/deletePost', deletePost);

export default router;
