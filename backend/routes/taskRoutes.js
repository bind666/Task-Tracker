import express from "express";
import { auth } from "../middleware/auth.js";
import {
    createTask,
    deleteTask,
    getTasks,
    updateTask,
} from "../controller/taskController.js";

const taskRouter = express.Router();

taskRouter.route("/create/:projectId").post(auth, createTask); // 👈 updated
taskRouter.route("/:projectId").get(auth, getTasks);
taskRouter.route("/:id").put(auth, updateTask);
taskRouter.route("/:id").delete(auth, deleteTask);

export { taskRouter };
