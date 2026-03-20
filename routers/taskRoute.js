const express = require('express');
const route = express.Router();
const { getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTaskById } = require('../controllers/taskController');

const validateTaskId = require("../middlewares/validateTaskId");
const validateTask = require("../middlewares/validateTask");

route.use(express.urlencoded({ extended: true }));

//  Implement GET /tasks: Retrieve all tasks.
route.get('/', getAllTasks);

// Implement GET /tasks/:id: Retrieve a specific task by its ID.
route.get('/:taskID', validateTaskId, getTaskById);

// Implement POST /tasks: Create a new task with the required fields (title, description, completed).
route.post('/', validateTask, createTask);

// Implement PUT /tasks/:id: Update an existing task by its ID.
route.put('/:taskID', validateTaskId, updateTask);

// Implement DELETE /tasks/:id: Delete a task by its ID.
route.delete('/:taskID', validateTaskId, deleteTaskById);

module.exports = route;
