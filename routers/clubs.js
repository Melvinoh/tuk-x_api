import { Router } from "express";
import { getClubs, getClubsID } from "../controlers/clubsControler.js";


const router = Router();

router.get("/getClubs", getClubs );
router.get("/getClubsID/:id", getClubsID );


export default router