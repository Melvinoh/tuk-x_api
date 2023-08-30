import { db } from "../dbConnect.js"
import jwt from "jsonwebtoken"
import moment from "moment/moment.js";
import { v4 as uuidv4 } from 'uuid';

export const addComment = (req,res) =>{
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json("not logged in")
    jwt.verify(token, "secretKey", (err,student) =>{
        if (err) return res.status(403).json("token not vallied");

        const {postID, desc } = req.body
        if (!desc) {
            return res.status(400).json({message:"all fields are required"})
        }
        const studentRegno = student.id;
        const commentsID = uuidv4();
        const createdAt =  moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        
        const values = [ commentsID, desc , createdAt, studentRegno, postID];

    
       
        const q = "INSERT INTO `comments_tb` (`CommentsID`, `description`,`createdAt`,`studentRegno`, `postID`) VALUES(?)";

        db.query(q , [values], (err,data) =>{
            if (err) return res.status(500).json(err);
            return res.status(200).json("comment has been added");
        });
    })



}
export const getComments = (req,res) =>{

    const {postID} = req.query;
    const q = "SELECT c.description,c.postID, c.createdAt,st.regno,fname,sname,profile_pic FROM `comments_tb` AS c JOIN `students_tb` AS st ON (st.regno = c.studentRegno) WHERE c.postID = ? ORDER BY c.createdAt DESC"
    db.query(q, [postID], (err,data) =>{
        if (err) return res.status(500).json(err)
        return res.status(200).json(data);
    });

}
export const deleteComments = () =>{




}

