import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, default: ""},
        status: {type: String,  enum: ['Pending', 'In Progress', 'Completed'], default: "Pending"},
        priority: {type: String, enum: ['High', 'Medium', 'Low'], default: "Medium"},
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;