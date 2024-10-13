import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String},
        status: {type: String, required: true},
        priority: {type: String, required: true},
        user_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Tasks = mongoose.model('tasks','UserSchema');

export default Tasks;