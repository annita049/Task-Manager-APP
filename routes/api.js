import express from "express"
const router = express.Router();

import * as TaskController from "../controllers/TaskController.js"
import * as UserController from "../controllers/UserController.js"

import DB_Connection from "../configs/db_config.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

// HomePage -----------

router.get("/Home", AuthMiddleware, async (req, res) => {
    console.log(req.cookies.Token);
    console.log(req.user);
    res.render('home');
});


// Users Routes -----------


router.get("/Register", async (req, res) => {
    res.render('register');
});

router.post("/Register", UserController.Registration);

router.get("/Login", UserController.getLoginPage);
router.post("/Login", UserController.HandleLogin);


router.get("/ProfileDetails", AuthMiddleware, UserController.ProfileDetails);
router.post("/UpdateProfile", AuthMiddleware, UserController.UpdateProfile);

router.post("/Logout", UserController.Logout); // logout

// user verifies email with OTP when logged in
router.post("/VerifyEmail", AuthMiddleware, UserController.VerifyEmail);

// user requests password reset when not logged in
router.post("/RequestPasswordReset", UserController.RequestPasswordReset);


// ------------- Task Routes -----------

router.post("/CreateTask", AuthMiddleware, TaskController.CreateTask);

router.get("/UpdateTask/:id", AuthMiddleware, TaskController.GetTaskbyID);
router.post("/UpdateTask/:id", AuthMiddleware, TaskController.UpdateTask);

router.get("/DeleteTask/:id", AuthMiddleware, TaskController.DeleteTask);

router.get("/AllTaskList", AuthMiddleware, TaskController.AllTaskList);
// router.get("/TaskListByStatus/:status", AuthMiddleware, TaskController.TaskListByStatus);

router.get("/Task/:status", AuthMiddleware, TaskController.TaskListByStatus);

router.get("/CountTask", AuthMiddleware, TaskController.CountTask);

router.get("/Tasks/:status/sorted", AuthMiddleware, TaskController.SortTaskByPriority); // based on a status

router.post("/Task/:status/search", AuthMiddleware, TaskController.SearchInStatus);

router.get('/Logout', (req, res) => {
    res.clearCookie('Token');
    res.redirect('/login');
});


export default router;