import {Router} from "express"
import { upload, fileUpload } from "../controlers/uploadContoler.js"

const router = Router()

router.post("/upload", upload ,fileUpload);

export default router