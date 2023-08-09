import { db } from "../dbConnect.js"
import  jwt from "jsonwebtoken"

export const profileUpdate = (req,res) =>{

    const token = req.cookies.accessToken

    if (!token) return res.status(401).json("user not logged in ")

    jwt.verify(token , "secretKey", (err,student) => {
        if (err) return res.status(403).json("invalid token")

        const regno = student.id;
        const {fname,sname,coverPic,profilePic,email,tel,zip,city,state,NOK,Id_no,password,username,portfolio,bio,social,skills} = req.body


        const q = [
            "UPDATE `studentsDetails_tb` SET `zip_code` = ?, `email` = ?,`phone` = ?,`id_no` = ?,`city` = ?,`county` = ?,`next_of_king` = ?,`portfolio_url` = ?,`bio` = ?  WHERE studentsRegno = ?",
            "UPDATE `students_tb` SET `fname` = ?,`sname` = ?,`email` = ?,`profile_pic` = ?,`cover_photo` = ?,`username` = ?  WHERE regno = ?",
        ]

        db.beginTransaction((err)=>{

            try {
                db.query(q[1] , [fname,sname,email,profilePic,coverPic,username,regno])
                db.query(q[0] , [zip,email,tel,Id_no,city,state,NOK,portfolio,bio,regno] , (err,data) =>{
                    if (data.affectedRows > 0 ) return   db.commit(()=>{
                        return res.status(200).json("update succefull")
                    });
                    return res.status(403).json("you can only update your profile");
                })
            } catch (err) {
                if(err){
                    db.rollback(()=>{
                        return res.status(500).json("could not commit transactions", err)
                    })
                }
            }
        })
      
    })
}

export const getProfile = (req,res) =>{
    const token = req.cookies.accessToken
    console.log(token)

    if (!token) return res.status(401).json("user not logged in ")

    jwt.verify(token, "secretKey", (err,student) =>{
        if(err) return res.status(403).json("invalid token")
        const regno = student.id
        const q = "select * from `students_tb` as st join `studentsDetails_tb` as sd on  st.regno = sd.studentsRegno where sd.studentsRegno = ?"
        db.query(q,[regno], (err,data)=>{
            if (err) return res.status(500).json(err)
            if (data.length === 0) return res.status(404).json("username not found");
            return res.status(200).json(data[0])
        })

    })
}
export const addProfile = () =>{
    
}