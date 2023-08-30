import { db } from "../dbConnect.js"
import jwt from "jsonwebtoken"
import moment from "moment/moment.js";
import { v4 as uuidv4 } from 'uuid';

export const addPost = (req, res) =>{
    const token = req.cookies.accessToken;
    console.log(token);
    if(!token) return res.status(401).json("not logged in")
    jwt.verify(token, "secretKey", (err,student) =>{
        if (err) return res.status(403).json("token not vallied");

        const {desc, clubid, img } = req.body
        console.log(img)
        if(!clubid) return res.status(409).json("posting failed please try again");
        const StudentID = student.id;
        const PostID = uuidv4();
        const createdAt =  moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        
        const values = [PostID, clubid, StudentID, desc, createdAt,img];
        console.log(PostID);
        console.log(StudentID);
       
        const q = "INSERT INTO `posts_tb` (`PostID`,`postCatID`,`StudentID`,`desc`,`createdAt`,`post_img`) VALUES(?)";

        db.query(q , [values], (err,data) =>{
            if (err) return res.status(500).json(err);
            return res.status(200).json("post has been created");
        });
    })

}

export const getPosts = (req, res) =>{
    const token = req.cookies.accessToken;
   
    const {clubid} = req.body
    const q = "SELECT p.*,st.regno,fname,sname,profile_pic FROM `posts_tb` AS p JOIN `students_tb` AS st ON (st.regno = p.StudentID) WHERE p.postCatID = ? ORDER BY p.createdAt DESC"
    db.query(q, [clubid], (err,data) =>{
        if (err) return res.status(500).json(err)
        return res.status(200).json(data);
    });

}

export const deletePost = (req,res) =>{
    const token = req.cookies.accessToken;
    console.log(token);
    if(!token) return res.status(401).json("not logged in")
    jwt.verify(token, "secretKey", (err,student) =>{
        if (err) return res.status(403).json("token not vallied");

        const {postID } = req.query;
      
        if(!postID) return res.status(409).json("deleting failed please try again");

        const StudentID = student.id;
        console.log(StudentID);
        const q = "DELETE FROM posts_tb WHERE `PostID` = ? AND `StudentID` = ?";

        db.query(q , [postID,StudentID ], (err,data) =>{
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.status(200).json("post has been deleted");
            return res.status(403).json("you can delete only your post");
        });

    })
}