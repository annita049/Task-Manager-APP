import express from "express"
const router = express.Router();

import * as TaskController from "../controllers/TaskController.js"
import * as UserController from "../controllers/UserController.js"

import DB_Connection from "../configs/db_config.js";

// Users

router.post("/Registration", UserController.Registration);
router.post("/Login", UserController.Login);
router.get("/ProfileDetails", UserController.ProfileDetails);
router.post("/UpdateProfile", UserController.UpdateProfile);
router.post("/VerifyEmail", UserController.VerifyEmail);
router.post("/VerifyCode", UserController.VerifyCode);
router.post("/ResetPassword", UserController.ResetPassword);

// Task

router.post("/CreateTask",TaskController.CreateTask);
router.get("/UpdateTaskStatus",TaskController.UpdateTaskStatus);
router.get("/TaskListByStatus", TaskController.TaskListByStatus);
router.get("/DeleteTask",TaskController.DeleteTask);
router.get("/CountTask",TaskController.CountTask);

export default router;