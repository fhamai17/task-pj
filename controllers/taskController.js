const Task = require('../models/taskModel');
const { validationResult } = require('express-validator');
const moment = require('moment-timezone');

createTask = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: 'Validator Unprocessable Entity!',
            errors: errors.array()
        });
    }

    try {
        const { title, description, due_date, user_id, status, priority } = req.body;
        var ObjectId = (require('mongoose').Types.ObjectId);
        // Set time zone to Thailand
        const formatDate = moment(due_date, "DD/MM/YYYY").tz('Asia/Bangkok').set({ hour: 12, minute: 0, second: 0 }).toDate();
        const task = await Task.create({
            title,
            description,
            due_date : formatDate,
            user_id,
            status,
            priority,
            created_by :  new ObjectId(req.user.id),
            updated_by :  new ObjectId(req.user.id),
        })

        return res.json({
            success: true,
            message: 'Created task successfully.',
            data: task
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

updateTask = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: 'Validator Unprocessable Entity!',
            errors: errors.array()
        });
    }

    try {
        const id = req.params.id;
        const { title, description, due_date, status, priority, user_id } = req.body;
        const formatDate = moment(due_date, "DD/MM/YYYY").toDate();
        var ObjectId = (require('mongoose').Types.ObjectId);
       
        const task = await Task.findByIdAndUpdate(id, {
            title,
            description,
            due_date : formatDate,
            user_id : new ObjectId(user_id),
            status,
            priority,
            updated_by :  new ObjectId(req.user.id),
        });
        return res.json({ success: true, message: 'Updated task successfully.', data: task });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

deleteTask = async function (req, res) {

    try {
        const id = req.params.id;

        const task = await Task.findByIdAndDelete(id);
        return res.json({ success: true, message: 'Deleted task successfully.', data: task });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

getTask = async function (req, res) {
    try {
        _id = req.params.id;

        const task = await Task.findOne({ _id }).populate([{path : 'creator', select : 'name'},{path : 'editor', select : 'name'}]);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        return res.json({ success: true, message: 'Success.', data: task });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}


index = async function (req, res) {
    try {

        var ObjectId = (require('mongoose').Types.ObjectId);
        _id = new ObjectId(req.user.id);

        const tasks = await Task.find().populate({path : 'user', select : 'name'}).sort({created_at : -1});
        return res.json({ success: true, message: 'Success', data: tasks });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
module.exports = { index, createTask, getTask, updateTask, deleteTask }