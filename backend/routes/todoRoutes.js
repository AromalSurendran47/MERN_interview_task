const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todoController');

// Create a new todo
router.post('/create', TodoController.createTodo);

// Get all 
router.get('/get', TodoController.getAllTodos);

// Get a single todo by ID
router.get('/single_id/:id', TodoController.getTodoById);

// Update a todo
router.put('/update/:id', TodoController.updateTodo);

// Delete a todo
router.delete('/delete_id/:id', TodoController.deleteTodo);

module.exports = router;
