import mysql from "mysql"

export const db = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"Muturi",
        database:"satukdb",
        multipleStatements:true
    }
);
if (db) {
    console.log("db connectd")
}else {
    console.log("db not connected")
};