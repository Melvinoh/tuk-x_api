import { db } from "../dbConnect.js"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';


export const addLikes= (req,res)  =>{
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json("not logged in")
    jwt.verify(token, "secretKey", (err,student) =>{
        if (err) return res.status(403).json("token not vallied");

        const {postID} = req.body
        if (!postID) {
            return res.status(400).json({message:"post id is required"})
        }
        const StudentID = student.id;
        const likesID = uuidv4();
    
        const values = [ likesID, StudentID, postID];   
        const q = "INSERT INTO `likes_tb` (`LikeID`,StudentID, `postID`) VALUES(?)";

        db.query(q , [values], (err,data) =>{
            if (err) return res.status(500).json(err);
            return res.status(200).json("you have liked the post");
        });
    })

}
export const getLikes= (req,res)  =>{
    
    const {postID} = req.query;
    console.log(postID);
    const q = "SELECT StudentID FROM likes_tb WHERE postID = ?"
    db.query(q, [postID], (err,data) =>{
        if (err) return res.status(500).json(err);
        console.log(data.length);
        return res.status(200).json(data.map(like  =>like.StudentID));
        
    });

}
export const deleteLikes= (req,res)  =>{
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json("not logged in")
    jwt.verify(token, "secretKey", (err,student) =>{
        if (err) return res.status(403).json("token not vallied");

        const {postID} = req.query;
        const StudentID = student.id;
        
        if (!postID) {
            return res.status(400).json({message:"post id is required"})
        }
        
       

        const q = "DELETE FROM likes_tb WHERE postID = ? AND StudentID = ?"
        db.query(q, [postID, StudentID], (err,data) =>{
            if (err) return res.status(500).json(err)
            return res.status(200).json(data);
        });
        
    })
   

}
     

