import { db } from "../dbConnect.js"
import jwt from "jsonwebtoken"
import moment from "moment/moment.js";
import { v4 as uuidv4 } from 'uuid';

export const addComment = (req,res) =>{
    const token = req.cookies.accessToken;
    console.log(token);
    if(!token) return res.status(401).json("not logged in")
    jwt.verify(token, "secretKey", (err,student) =>{
        if (err) return res.status(403).json("token not vallied");

        const {postID, desc } = req.body

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
export const getComments = () =>{
    const {clubid} = req.body
    const q = "SELECT c.*,st.regno,fname,sname,profile_pic FROM `posts_tb` AS p JOIN `students_tb` AS st ON (st.regno = p.StudentID) WHERE p.postCatID = ? ORDER BY p.createdAt DESC"
    db.query(q, [clubid], (err,data) =>{
        if (err) return res.status(500).json(err)
        return res.status(200).json(data);
    });

}
export const deleteComments = () =>{




}

