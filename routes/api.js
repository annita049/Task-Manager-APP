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
router.get("/VerifyEmail/:email", UserController.VerifyEmail);
router.post("/VerifyCode", UserController.VerifyCode);
router.post("/ResetPassword", UserController.ResetPassword);

// Task Routes -----------

router.post("/CreateTask", AuthMiddleware, TaskController.CreateTask);
router.get("/UpdateTaskStatus", AuthMiddleware, TaskController.UpdateTaskStatus);
router.get("/TaskListByStatus", AuthMiddleware, TaskController.TaskListByStatus);
router.get("/DeleteTask", AuthMiddleware, TaskController.DeleteTask);
router.get("/CountTask", AuthMiddleware, TaskController.CountTask);

export default router;