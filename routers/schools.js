import { Router } from "express";
import { getSchools,addSchools,deleteSchools, getFaculties, getSingleschool, getCourses, getCourse, getLeaders, getClassreps } from "../controlers/schoolsControler.js";



const router = Router()

router.get('/getSchools', getSchools);
router.get('/getCourses', getCourses);
router.get('/getCourse', getCourse);
router.get('/getLeaders', getLeaders);
router.get('/getClassreps', getClassreps);
router.get('/getSingleschool', getSingleschool)
router.get('/getFaculties', getFaculties)
router.post('/addSchools', addSchools)
router.delete('/deleteSchools', deleteSchools)


export default router