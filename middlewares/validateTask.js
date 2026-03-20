const { getTasks } = require("../models/tasksModel")

const validateTask = (req, res, next) => {

    const { title, description, completed } = req.body
    if (!title || !description || completed === undefined) {
        return res.status(400).json({
            message: 'Title, description and completed status are required'
        });
    }
    if (typeof completed !== "boolean") {
        return res.status(400).json({
            message: 'completed must be boolean'
        });
    }

    req.title = title;
    req.description = description;
    req.completed = completed;

    next();
}

module.exports = validateTask;