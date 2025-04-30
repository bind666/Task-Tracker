import Task from "../model/Task.js";
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import ApiResponse from "../utils/ApiResponse.js";

const createTask = asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;
    const { title, description, status } = req.body;

    if (!projectId) {
        return next(createError(422, "ProjectID required"));
    }

    if (!description || !title) {
        return next(createError(422, "Description and title are required"));
    }

    const task = await Task.create({
        projectId,
        title,
        description,
        status: status || "Pending",
    });

    res.status(201).json(new ApiResponse(task, "Task created successfully"));
});

const getTasks = asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;

    if (!projectId) {
        return next(createError(422, "Project ID is required"));
    }

    const tasks = await Task.find({ projectId });
    res.status(200).json(new ApiResponse(tasks));
});

const updateTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, "Id required"))
    }
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTask) return next(createError(404, "Task not found"));

    res.status(200).json(new ApiResponse(updatedTask, "Task updated successfully"));
});

const deleteTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, "Id required"))
    }
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) return next(createError(404, "Task not found"));

    res.status(200).json(new ApiResponse(null, "Task deleted successfully"));
});

export { createTask, getTasks, updateTask, deleteTask };
