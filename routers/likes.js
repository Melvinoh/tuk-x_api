
import {Router} from "express"
import { addLikes, getLikes, deleteLikes } from "../controlers/likesControler.js"



const router = Router();

router.post("/addLikes", addLikes)
router.get("/getLikes", getLikes)
router.delete("/deleteLikes", deleteLikes)

export default router

