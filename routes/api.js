import express from "express"
const router = express.Router();

import * as TaskController from "../controllers/TaskController.js"
import * as UserController from "../controllers/UserController.js"

import DB_Connection from "../configs/db_config.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";


router.get("/", async(req, res)=>{
    res.render('guest_home');
});

// Users Routes -----------

router.post("/Registration", UserController.Registration);
router
router.post("/Login", UserController.Login);
router.get("/Login", UserController.Login);

// HomePage -----------
router.get("/Home", AuthMiddleware, (req, res)=>{
    res.render('home', {user: req.user});
});

router.get("/ProfileDetails", AuthMiddleware, UserController.ProfileDetails);
router.post("/UpdateProfile", AuthMiddleware, UserController.UpdateProfile);

router.post("/Logout", UserController.Logout); // logout

// user verifies email with OTP when logged in
router.post("/VerifyEmail", AuthMiddleware, UserController.VerifyEmail);

// user requests password reset when not logged in
router.post("/RequestPasswordReset", UserController.RequestPasswordReset);




// ------------- Task Routes -----------

router.post("/CreateTask", AuthMiddleware, TaskController.CreateTask);

router.route("/UpdateTask/:id")
    .get(AuthMiddleware, TaskController.UpdateTask)
    .post(AuthMiddleware, TaskController.UpdateTask);
router.get("/DeleteTask/:id", AuthMiddleware, TaskController.DeleteTask);

router.get("/AllTaskList", AuthMiddleware, TaskController.AllTaskList);
router.get("/TaskListByStatus/:status", AuthMiddleware, TaskController.TaskListByStatus);
router.get("/CountTask", AuthMiddleware, TaskController.CountTask);

router.get("/SortTaskByPriority/:status", AuthMiddleware, TaskController.SortTaskByPriority); // based on a status

export default router;