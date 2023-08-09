import { Router } from "express";
import { profileUpdate ,getProfile } from "../controlers/profileControler.js";

const router = Router()

router.put("/updateProfile", profileUpdate)
router.get("/getProfile",getProfile)


export default router;