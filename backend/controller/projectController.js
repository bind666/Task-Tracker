import Project from "../model/Project.js";
import ApiResponse from "../utils/ApiResponse.js";
import createError from "http-errors";
import asyncHandler from "express-async-handler"

const createProject = asyncHandler(async (req, res, next) => {
    const { title } = req.body;

    if (!title) {
        return next(createError(422, "title required"))
    }

    try {
        const projectCount = await Project.countDocuments({ userId: req.user.id });
        if (projectCount >= 4) return next(createError(400, "Maximum 4 projects allowed."))

        const project = await Project.create({ userId: req.user.id, title });
        // res.status(201).json(project);
        res.status(201).json(new ApiResponse(project, "Project created successfully."))

    } catch {
        // res.status(500).json({ message: 'Error creating project' });
        return next(createError(500, "Error while creating project."))

    }

})

const getProject = asyncHandler(async (req, res, next) => {
    const projects = await Project.find({ userId: req.user.id });
    // res.json(projects);
    res.status(201).json(new ApiResponse(projects))

})

const updateProject = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
        return next(createError(422, "Title is required"));
    }

    const project = await Project.findOneAndUpdate(
        { _id: id, userId: req.user.id },
        { title },
        { new: true }
    );

    if (!project) {
        return next(createError(404, "Project not found"));
    }

    res.status(200).json(new ApiResponse(project, "Project updated successfully."));
});

const deleteProject = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const project = await Project.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!project) {
        return next(createError(404, "Project not found"));
    }

    res.status(200).json(new ApiResponse(null, "Project deleted successfully."));
});


export {
    createProject,
    getProject,
    updateProject,
    deleteProject,
};
