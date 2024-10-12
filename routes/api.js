import express from "express"
const router = express.Router();

import * as TaskController from "../controllers/TaskController.js"
import * as UserController from "../controllers/UserController.js"

import DB_Connection from "../configs/db_config.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

// Users Routes

router.post("/Registration", UserController.Registration);
router.post("/Login", UserController.Login);
router.get("/ProfileDetails", AuthMiddleware, UserController.ProfileDetails);
router.post("/UpdateProfile", AuthMiddleware, UserController.UpdateProfile);
router.post("/VerifyEmail", UserController.VerifyEmail);
router.post("/VerifyCode", UserController.VerifyCode);
router.post("/ResetPassword", UserController.ResetPassword);

// Task Routes

router.post("/CreateTask",TaskController.CreateTask);
router.get("/UpdateTaskStatus",TaskController.UpdateTaskStatus);
router.get("/TaskListByStatus", TaskController.TaskListByStatus);
router.get("/DeleteTask",TaskController.DeleteTask);
router.get("/CountTask",TaskController.CountTask);

export default router;