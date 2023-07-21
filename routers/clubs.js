import { Router } from "express";
import { getClubs, getClubsID, clubRegistration,myClubs } from "../controlers/clubsControler.js";


const router = Router();

router.get("/getClubs", getClubs );
router.get("/getClubsID/:id", getClubsID );
router.post("/clubreg", clubRegistration );
router.post("/myclubs", myClubs);


export default router