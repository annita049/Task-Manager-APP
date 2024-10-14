import express from "express"
const router = express.Router();

import * as TaskController from "../controllers/TaskController.js"
import * as UserController from "../controllers/UserController.js"

import DB_Connection from "../configs/db_config.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

// Users Routes -----------

router.post("/Registration", UserController.Registration);
router.post("/Login", UserController.Login);
router.get("/ProfileDetails", AuthMiddleware, UserController.ProfileDetails);
router.post("/UpdateProfile", AuthMiddleware, UserController.UpdateProfile);
// router.get("/VerifyEmail/:email", UserController.VerifyEmail);

// user verifies email with OTP when logged in
router.post("/VerifyEmail", AuthMiddleware, UserController.VerifyEmail);

// user requests password reset when not logged in
router.post("/RequestPasswordReset", UserController.RequestPasswordReset);

// ------------- Task Routes -----------

router.post("/CreateTask", AuthMiddleware, TaskController.CreateTask);
router.get("/UpdateTaskStatus", AuthMiddleware, TaskController.UpdateTaskStatus);
router.get("/TaskListByStatus", AuthMiddleware, TaskController.TaskListByStatus);
router.get("/DeleteTask", AuthMiddleware, TaskController.DeleteTask);
router.get("/CountTask", AuthMiddleware, TaskController.CountTask);

export default router;