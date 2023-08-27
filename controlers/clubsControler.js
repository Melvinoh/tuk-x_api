import { response } from "express";
import { db } from "../dbConnect.js";
import { v4 as uuidv4 } from 'uuid';

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
export const clubRegistration = (req,res) => {
    const {clubid , regno} = req.body;

    if(!clubid || !regno ){
        return res.status(400).json({message :"all inputs are required"})
    };

    const q = "SELECT * FROM `studentclubs` where StudentID = ? AND ClubID = ? "
    db.query(q,[regno,clubid],(err,data) =>{

        if(err) return res.status(500).json(err)

        if( data.length > 0 &&  data[0].ClubID === clubid){
            return res.status(409).json();
        }
        const stcl = uuidv4()
        const values = [stcl, regno, clubid]
        const q = " INSERT into studentclubs ( StudentClubID, StudentID, ClubID) values (?)"

        console.log(data.clubid);

      
        db.query(q, [values], (err,data)=>{
            if(err) return res.status(500).json(err);
                return res.status(200).json({message : "registration submmited awaiting for procesing"});
        })
       
        
    })
    
}
export const myClubs = (req, res) =>{ 

    const {regno} = req.body
    if(!regno){
        return res.status(400).json({message : "kindly login inorder to view your clubs"});
    }
    const q = "SELECT * FROM clubs_tb JOIN `studentclubs` ON clubs_tb.ClubsID = studentclubs.ClubID WHERE studentclubs.StudentID = ?";

     db.query(q , [regno], (err,data) =>{
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(200).json("you are not a member of any clubs yet kindly checkout the various options below")
        return res.status(200).json(data);

        
     })


        
}