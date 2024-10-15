import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, default: ""},
        status: {type: String, default: "Pending"},
        priority: {type: String, required: true},
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;