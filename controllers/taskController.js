const { getTasks, saveTasks } = require("../models/tasksModel.js")


// Implementation Retrieve all tasks.
const getAllTasks = (req, res) => {
    const tasks = getTasks();
    res.json(tasks);
}

// Implementation GET /tasks/:id: Retrieve a specific task by its ID.
const getTaskById = (req, res) => {
    return res.status(200).json(req.task)
}

// Implementation POST /tasks: Create a new task with the required fields (title, description, completed).
const createTask = (req, res) => {

    const tasks = getTasks();
    const maxId = tasks.reduce((max, t) => Math.max(max, t.id), 0);

    const newTask = {
        id: maxId + 1,
        title: req.title,
        description: req.description,
        completed: req.completed
    };

    tasks.push(newTask);
    saveTasks(tasks);
    return res.status(201).json(newTask); 
}

// Implementation PUT /tasks/:id: Update an existing task by its ID.
const updateTask = (req, res) => {

    const { title, description, completed } = req.body

    if (completed !== undefined && typeof completed !== "boolean") {
        return res.status(400).json({
            message: "completed must be a boolean",
        });
    }

    if (title !== undefined) req.task.title = title;
    if (description !== undefined) req.task.description = description;
    if (completed !== undefined) req.task.completed = completed;

    saveTasks(req.tasks);

    return res.status(200).json({ message: "Updated Successful" });
}

// Implementation DELETE /tasks/:id: Delete a task by its ID.
const deleteTaskById = (req, res) => {

    const updatedTasks = req.tasks.filter(
        (t) => t.id !== req.taskID
    );

    saveTasks(updatedTasks);

    return res.status(200).json({
        message: "Deleted Successfully",
    });
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTaskById };