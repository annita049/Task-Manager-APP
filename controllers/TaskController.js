import TaskModel from '../models/TaskModel.js';
import mongoose from 'mongoose';

export const CreateTask = async (req, res) => {
    // res.json({status: "succes"});
    try {
        const { title, description, status, priority } = req.body;
        const user_id = req.user.user_id;
        
        const task = new TaskModel({
            title,
            description,
            status: status || 'Pending', 
            priority,
            user_id
        });

        await task.save();
        res.redirect('/Home');
        // res.status(201).json({status: 'success', message: 'Task created successfully', task});
    }
    catch (e) {
        // res.status(500).json({status: 'fail', message: e.toString()});
        res.status(500).send("Server Error");
    }
};

export const AllTaskList = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const all_task = await TaskModel.find({user_id});

        // console.log(all_task);

        if (all_task.length === 0) {
            return res.status(404).json({status:'fail', message: 'No Task found!' });
        }

        // res.render('all_tasks', {tasks: all_task});
        res.status(200).json({status:'success', message: 'All Tasks you have created', tasks: all_task});
    }
    catch (e) {
        res.status(500).json({status:'fail', message: e.toString()});
    }
};



export const GetTaskbyID = async (req, res)=> {
    try {
        const task_id = req.params.id;
        const user_id = req.user.user_id;
        console.log(task_id, user_id);
        const task = await TaskModel.findOne({_id: task_id, user_id});

        if (!mongoose.Types.ObjectId.isValid(task_id)) {
            console.log(":(((");
            return res.status(400).json({ status: 'fail', message: 'Invalid task ID format' });
        }
        if (!task) {
            return res.status(404).json({status: 'fail', message: 'Task not found or unauthorized'});
        }
        
        console.log("task is valid");

        res.json({status: 'success', task});
    }
    catch(e){
        console.log("hoy na bhai.");
        res.status(500).json({status: 'fail', message: e.toString()});
    }
}

export const UpdateTask = async (req, res)=> {
    try {
        const task_id = req.params.id; 
        const user_id = req.user.user_id;

        const updatedData = req.body;
        const updatedTask = await TaskModel.findOneAndUpdate(
            {_id: task_id, user_id},
            updatedData,
            {new: true}
        );

        console.log();
        if (!updatedTask) {
            return res.status(404).json({status: "fail", message: 'Task not found or unauthorized'});
        }
        console.log("update hoise");
        // res.render('home', {status: 'success', message: 'Task Successfully Updated'});
        res.redirect('/Home');
        // res.json({status: "success", message: 'Task updated!'});
    }
    catch (e) {
        res.status(500).json({status: "fail", message: e.toString()});
    }
}

export const DeleteTask = async (req, res)=> {
    try {
        const task_id = req.params.id;
        const user_id = req.user.user_id;

        const task = await TaskModel.findOneAndDelete({_id: task_id, user_id});

        if (!task) {
            return res.status(404).json({status: 'fail', message: 'Task not found or unauthorized' });
        }
        res.json({status: 'success', message: 'Task Deleted successfully'});
    }
    catch (e) {
        res.status(500).json({status: 'fail', message: e.toString()});
    }
}

export const TaskListByStatus = async (req, res)=> {
    try {
        const status = req.params.status;
        const user_id = req.user.user_id;

        const tasks = await TaskModel.find({user_id, status});

        console.log(status);

        if (status === 'Completed') {
            console.log("hi");
            res.render('completed_tasks', {tasks});
            // res.json(tasks);
        }
        else if (status === 'Pending') {
            res.render('pending_tasks', {tasks});
        }
        else if (status === 'In Progress') {
            res.render('inprogress_tasks', {tasks});
        }
        else {
            res.status(400).json({status: 'fail', message: 'Invalid status' });
        }
        // res.json({status: 'success', tasks});
    }
    catch (e) {
        res.status(500).json({status: 'fail', message: e.toString()});
    }
}

export const CountTask = async (req, res)=> {
    try {
        const user_id = req.user.user_id;

        const TotalTasks = await TaskModel.countDocuments({user_id});
        const CompletedTasks = await TaskModel.countDocuments({user_id, status: 'Completed'});
        const PendingTasks = await TaskModel.countDocuments({user_id, status: 'Pending'});
        const InProgressTasks = await TaskModel.countDocuments({user_id, status: 'In Progress'});

        res.json({
            status: 'success',
            TotalTasks,
            CompletedTasks,
            PendingTasks,
            InProgressTasks
        });
    }
    catch (e) {
        res.status(500).json({status: 'fail', message: e.toString()});
    }
}

// sorts by priority (High to Low) on a particular task status

export const SortTaskByPriority = async (req, res)=> {
    try {
        const user_id = req.user.user_id;
        const status = req.params.status;
        // console.log(`ID: ${user_id}, Status: ${status}`);

        const SortedTasks =  await TaskModel.aggregate([
            {
                $match: { user_id: new mongoose.Types.ObjectId(user_id), status },
            },
            {
                $addFields: {
                    sortPriority: {
                        $switch: {
                            branches: [
                                { 'case': { $eq: ["$priority", "High"] }, then: 1 },
                                { 'case': { $eq: ["$priority", "Medium"] }, then: 2 },
                                { 'case': { $eq: ["$priority", "Low"] }, then: 3 }
                            ],
                            'default': 4
                        }
                    }
                }
            },
            {
                $sort: {sortPriority: 1}
            }
        ]);

        res.status(200).json({
            status: 'success',
            message: `Tasks are sorted by priority (High to Low) based on ${status} Tasks`,
            SortedTasks
        });
    }
    catch (e) {
        res.status(500).json({ status: 'fail', message: e.toString() });
    }
}
