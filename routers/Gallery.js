import { Router } from "express";
import { getClubsGallery, getGallery } from "../controlers/galleryControler.js";


const router = Router()

router.get("/clubsGallery", getClubsGallery)
router.get("/clubsGallery", getGallery)

export default router