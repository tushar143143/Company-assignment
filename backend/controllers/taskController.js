const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
};

exports.createTask = async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
        id, 
        { title, completed }, 
        { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(updatedTask);
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
};
