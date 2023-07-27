import express from "express";
import userRoutes from "./routers/auth.js"
import clubRoutes from "./routers/clubs.js"
import postsRoutes from "./routers/post.js"
import uploadRoutes from "./routers/upload.js"

import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

//middlewares
app.use((req, res,next) =>{
   res.header("Access-Control-Allow-Credentials",true )
   next()
})
app.use( express.json());
app.use(cors({
   origin:"http://localhost:5173"
}));
app.use(cookieParser());


//routers
app.use("/api/auth", userRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/posts",postsRoutes );
app.use("/api/uploadFile", uploadRoutes);



app.listen("8800", ()=>{
   console.log("its working");
});


