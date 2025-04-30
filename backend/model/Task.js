import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed", "On Hold"],
        default: "Pending"
    },
    completedAt: Date
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
