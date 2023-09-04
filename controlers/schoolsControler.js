import { db } from "../dbConnect.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';


export const addSchools = (req,res) =>{
    const token = req.cookies.accessToken;
    console.log(token);
    if(!token) return res.status(401).json("not logged in")

    jwt.verify(token, "secretKey", (err,student) =>{
        if (err) return res.status(403).json("token not vallied");
        const {school_name,faculty_id,profile_pic,description} =req.body

        const SchoolID = uuidv4();
        const values = [SchoolID,school_name,faculty_id,profile_pic,description]; 
        const q = "INSERT INTO `school_tb` (`SchoolID`,`name`,`faculty_id`,`profile_pic`,`description`) VALUES(?)";

        db.query(q , [values], (err,data) =>{
            if (err) return res.status(500).json(err);
            return res.status(200).json("school has been added");
        });
    })
}
export const getSchools = (req,res) =>{
    const {facultyId} = req.query
    if(!facultyId) return res.status(400).json("all fields are required");

    const q = "SELECT s.*, f.name,s.name FROM  school_tb AS s  join faculty_tb AS f  ON f.FacultyID = s.faculty_id  WHERE s.faculty_Id = ?"

    db.query(q, [facultyId], (err,data) =>{
        if (err) return res.status(500).json(err)
        return res.status(200).json(data);
    });
}

export const getFaculties = (req,res) =>{

    const {schholID} = req.query

    const q = "SELECT * from faculty_tb"

    db.query(q, (err,data) =>{
        if (err) return res.status(500).json(err)
        return res.status(200).json(data);
    });
}
export const getSingleschool = (req,res) =>{
    const {SchoolId} = req.query
    if(!SchoolId) return res.status(400).json("all fields are required");
   
    const q = "select * FROM school_tb WHERE SchoolID = ?";

    db.query(q, [SchoolId], (err,data) =>{
        if (err) return res.status(500).json(err)
        return res.status(200).json(data[0]);
    });
}
export const getCourses = (req,res) =>{
    const {SchoolId} = req.query
    if(!SchoolId) return res.status(400).json("all fields are required");
    console.log(SchoolId);
    const q = "SELECT * from cources_tb WHERE SchoolID = ?";

    db.query(q, [SchoolId], (err,data) =>{
        if (err) return res.status(500).json(err)
        return res.status(200).json(data);
    });
}
export const getCourse = (req,res) =>{
    const {CourseId} = req.query
    if(!CourseId) return res.status(400).json("all fields are required");
    console.log(CourseId);
    const q = "select * from cources_tb WHERE CourseID = ? ";

    db.query(q, [CourseId], (err,data) =>{
        if (err) return res.status(500).json(err)
        return res.status(200).json(data[0]);
    });
}
export const getLeaders = (req,res) =>{
    const {cm ,cl} = req.query
    if(!cm  || !cl) return res.status(400).json("all fields are required");
    
    console.log(cl)
    const values = [cl,cm]
    const q = "select s.regno ,s.fname, s.sname, s.profile_pic, l.position from students_tb as s join Leaders_tb AS l ON l.StudentRegno = s.regno WHERE regno IN (?) ";

    db.query(q, [values], (err,data) =>{
        if (err) return res.status(500).json(err)
        return res.status(200).json(data);
    })
}
export const getClassreps = (req,res) =>{
    const {year_1,year_2,year_3,year_4} = req.body
    if(!year_1) return res.status(400).json("all fields are required");
    
    console.log(year_4)
    const values = [year_1,year_2,year_3,year_4]
    const q = "select s.regno ,s.fname, s.sname, s.profile_pic from students_tb as s  WHERE s.regno IN (?) ";

    db.query(q, [values], (err,data) =>{
        if (err) return res.status(500).json(err)
        return res.status(200).json(data);
    })
}


export const deleteSchools = (req,res) =>{

}
