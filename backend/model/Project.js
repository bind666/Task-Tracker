import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
export default Project;

