import { db } from "../dbConnect.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';


export const signUp = (req , res) =>{
    try {

         // checkuser if exist 
        const {regno, fname, sname, email, password, username} = req.body
        if(!regno || !fname || !sname || !email || !password ||!username){
            return res.status(400).json('all field are required')
        }
        const q = "SELECT * FROM `students_tb` WHERE `regno` = ? ";
        const q1 = "INSERT INTO `studentsDetails_tb` (`studentsDetID` , `studentsRegno`) VALUES(?,?)";

        const studentsDetID = uuidv4()
        db.query(q, [regno], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length) return res.status(409).json("user already exist");

            //hash password 
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            //creating user
            const q = "INSERT INTO `students_tb` (`regno`,`fname`, `sname`,`email`,`password`,`username`) VALUES (?)"

            const values = [regno, fname, sname, email, hashedPassword, username];

            db.query(q, [values])
            db.query(q1, [studentsDetID,regno])
            return res.status(200).json("account creation succefull")
        })
       
    } catch (error) {
        if (error) return res.status(500).json(error)
        db.rollback()
    }
  

       
}


export const login  = (req, res) =>{
    const {username, password} = req.body
    if(!username || !password){
        return res.status(400).json('all field are required')
    }
    const q = "SELECT * FROM `students_tb` WHERE `username` = ?"
   
    db.query(q ,[username], (err, data) =>{
        if (err) return res.status(500).json(err);
        console.log(err);
        if (data.length === 0) return res.status(404).json("username not found");

        const checkPassword = bcrypt.compareSync(req.body.password , data[0].password);

        if (!checkPassword) return res.status(400).json("invalid username or password");
        
        const token = jwt.sign({id:data[0].regno}, "secretKey");
        
        const{password, ...others} = data[0];

        return res.cookie("accessToken", token, {
            httpOnly:true
        }).status(200).json(others)
    })

}

export const logout = (req, res) =>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("user has been logged out!")
}


