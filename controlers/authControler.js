import { db } from "../dbConnect.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const signUp = (req , res) =>{
   // checkuser if exist 
    const {regno, fname, sname, email, password, username} = req.body
    if(!regno || !fname || !sname || !email || !password ||!username){
        return res.status(400).json('all field are required')
    }

    const q = "SELECT * FROM `students_tb` WHERE `regno` = ? ";
    db.query(q, [regno], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("user already exist");

        //hash password 
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        //creating user
        const q = "INSERT INTO `students_tb` (`regno`,`fname`, `sname`,`email`,`password`,`username`) VALUES (?)"

        const values = [regno, fname, sname, email, hashedPassword, username];
        db.query(q, [values], (err,data) =>{
            if (err) return res.status(500).json(err)
            return res.status(200).json("user created succefully")
        })
    })
}
export const login  = (req, res) =>{
    const q = "SELECT * FROM `students_tb` WHERE `username` = ?"
    const {username, regno} = req.body
    db.query(q , [username], (err, data) =>{
        if (err) return res.status(500).json(err);
        console.log(err)
        if (data.length === 0) return res.status(404).json("username not found")

        const checkPassword = bcrypt.compareSync(req.body.password , data[0].password);

        if (!checkPassword) return res.status(400).json("invalid username or password");
        
        const token = jwt.sign({id:data[0].regno}, "secretKey")
        
        const{password, ...others} = data[0]

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
