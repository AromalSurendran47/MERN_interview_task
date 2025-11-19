const TodoModel = require('../models/todoModel');

class TodoController {
    // Create a new todo
    static async createTodo(req, res) {
        try {
            const { title, description } = req.body;
            
            if (!title) {
                return res.status(400).json({ message: "Title is required" });
            }

            await TodoModel.create(title, description);

            res.status(201).json({
                title,
                description,
                status: "Pending"
            });
        } catch (err) {
            console.error("Create error:", err);
            res.status(500).json({ error: "Failed to create todo" });
        }
    }

    // Get all todos with pagination and filtering
    static async getAllTodos(req, res) {
        try {
            const page = parseInt(req.query.page) ;
            const limit = parseInt(req.query.limit)  ;
            const status = req.query.status;

            const result = await TodoModel.getAll(page, limit, status);

            res.json(result);
        } catch (err) {
            console.error("List error:", err);
            res.status(500).json({ error: "Failed to fetch todos" });
        }
    }

    // Get a single todo by ID
    static async getTodoById(req, res) {
        try {
            const id = req.params.id;

            const todo = await TodoModel.getById(id);

            if (!todo) {
                return res.status(404).json({ message: "Todo not found" });
            }

            res.json(todo);
        } catch (err) {
            console.error("Get error:", err);
            res.status(500).json({ error: "Failed to fetch todo" });
        }
    }

    // Update a todo
    static async updateTodo(req, res) {
        try {
            const id = req.params.id;
            const { title, description, status } = req.body;

            const result = await TodoModel.update(id, title, description, status);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Todo not found" });
            }

            res.json({ id, title, description, status });
        } catch (err) {
            console.error("Update error:", err);
            res.status(500).json({ error: "Failed to update todo" });
        }
    }

    // Delete a todo
    static async deleteTodo(req, res) {
        try {
            const id = req.params.id;

            const result = await TodoModel.delete(id);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Todo not found" });
            }

            res.json({ message: "Todo deleted successfully" });
            console.log("Deleted todo with id:", id);
        } catch (err) {
            console.error("Delete error:", err);
            res.status(500).json({ error: "Failed to delete todo" });
        }
    }
}

module.exports = TodoController;
