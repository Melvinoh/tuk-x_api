import { response } from "express";
import { db } from "../dbConnect.js";

export const getClubs = (req, res) =>{

    const q = "SELECT * FROM clubs_tb LIMIT 10";

    db.query(q , (err,data) =>{
        if(err) return res.status(500).json(err);
        console.log(err);
        if (data.length === 0) return res.status(404).json("clubs not found")
        return res.status(200).json(data)
    })
    
}
export const getClubsID = (req, res) =>{
    const {id} = req.params;
    const q = "SELECT * FROM clubs_tb WHERE `ClubsID` = ?";

    db.query(q ,[id], (err,data) =>{
        if(err) return res.status(500).json(err);
        if(data[0].length === 0 ) return res.status(500).json(err)
        return res.status(200).json(data[0])
    })

}