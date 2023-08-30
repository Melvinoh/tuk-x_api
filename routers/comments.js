import { Router } from "express";

import { addComment, getComments,deleteComments } from "../controlers/commentsController.js";

const router = Router();

router.post("/addComment" , addComment);
router.get("/getComment",getComments);
router.delete("/delete/comments" , deleteComments);

export default router