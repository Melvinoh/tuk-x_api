import express from "express"
import { signUp, login , logout } from "../controlers/authControler.js";

const router = express.Router();

router.post("/signUp", signUp )
router.get("/login", login )
router.get("/logout", logout )

export default router;
