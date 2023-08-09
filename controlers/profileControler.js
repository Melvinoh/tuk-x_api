import { db } from "../dbConnect.js"

export const profileUpdate = (req,res) =>{

    const token = req.cookies.accessToken

    if (!token) return res.status(401).json("user not logged in ")

    jwt.verify(token , "secretKey", (err,student) => {
        if (err) return res.status(403).json("invalid token")

        const regno = student.id;
        const {fname,sname,coverPic,profilePic,email,tel,zip,city,state,NOK,Id_no,password,username,portfolio,bio,social,skills} = req.body

        const studentsDetId = uuidv4();

        const q = [
            "UPDATE `studentsDetails_tb` SET `studentsDetID` = ? `zip_code` = ?, `email` = ?,`phone` = ?,`id_no` = ?,`city` = ?,`county` = ?,`next_of_king` = ?,`portfolio_url` = ?,`bio` = ?  WHERE studentsRegno = ?",
            "UPDATE `students_tb` SET `fname` = ?,`sname` = ?,`email` = ?,`profile_pic` = ?,`cover_photo` = ?,`username` = ?  WHERE regno = ?",
        ]

        db.beginTransaction((err)=>{

            if (err) return res.status(500).json(err)

            db.query(q[1] , [fname,sname,email,profilePic,coverPic,username,regno] , (err,data) =>{
                if (err) {
                    db.rollback(()=>{
                        return res.status(500).json("server error could not update details")
                    })
                }
                if (data.affectedRows > 0 ) return res.status(200).json("update succefull");
                return res.status(403).json("you can only update your profile");
            })

            db.query(q[0] , [studentsDetId,zip,email,tel,Id_no,city,state,NOK,portfolio,bio,regno] , (err,data) =>{
                if (err) {
                    db.rollback(()=>{
                        return res.status(500).json("server error could not update details")
                    })
                }
                if (data.affectedRows > 0 ) return res.status(200).json("update succefull");
                return res.status(403).json("you can only update your profile");
            })

            db.commit((err)=>{
                if(err){
                    db.rollback(()=>{
                        return res.status(500).json("could not commit transactions", err)
                    })
                }
                return res.status(200).json("update succefull")
            })

        })
      
    })
}

export const getProfile = () =>{


}
export const addProfile = () =>{
    
}