import express from "express";
import Project from "../model/Project.js";
import { auth } from "../middleware/auth.js";
import {
    createProject,
    getProject,
    updateProject,
    deleteProject,
} from "../controller/projectController.js";

const projectRouter = express.Router();

projectRouter.route("/create").post(auth, createProject);
projectRouter.route("/get").get(auth, getProject);
projectRouter.route("/:id").put(auth, updateProject);     
projectRouter.route("/:id").delete(auth, deleteProject); 

export { projectRouter };
