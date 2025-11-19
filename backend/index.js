const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// mysql connection 
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Admin123',
    database: 'todo_app'
});

// Promisify pool query
const util = require('util');
pool.query = util.promisify(pool.query);



//create  the api 

app.post('/create', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) return res.status(400).json({ message: "Title is required" });

        const sql = "INSERT INTO todos (title, description, status) VALUES (?, ?, 'Pending')";
        const result = await pool.query(sql, [title, description]);

        res.status(201).json({
            title,
            description,
            status: "Pending"
        });
    } catch (err) {
        console.error("Create error:", err);
        res.status(500).json({ error: "Failed to create todo" });
    }
});

// get all the api with pagination and filtering

app.get('/get', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;
        const status = req.query.status;

        const offset = (page - 1) * limit;

        let whereClause = "";
        let params = [];

        if (status) {
            whereClause = "WHERE status = ?";
            params.push(status);
        }

        // Get total count
        const countSql = `SELECT COUNT(*) AS total FROM todos ${whereClause}`;
        const countResult = await pool.query(countSql, params);
        const total = countResult[0].total;
        const pages = Math.ceil(total / limit);

        // Get paginated results
        const listSql = `SELECT * FROM todos ${whereClause} ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        const todoRows = await pool.query(listSql, [...params, limit, offset]);

        res.json({
            data: todoRows,
            pagination: { total, page, limit, pages }
        });
    } catch (err) {
        console.error("List error:", err);
        res.status(500).json({ error: "Failed to fetch todos" });
    }
});

// fetch single api fetch by id

app.get('/single_id/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const sql = "SELECT * FROM todos WHERE id = ?";
        const result = await pool.query(sql, [id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(result[0]);
    } catch (err) {
        console.error("Get error:", err);
        res.status(500).json({ error: "Failed to fetch todo" });
    }
});


// update the api


app.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, status } = req.body;

        const sql = `
            UPDATE todos 
            SET title = ?, description = ?, status = ?, updatedAt = CURRENT_TIMESTAMP
            WHERE id = ?
        `;

        const result = await pool.query(sql, [title, description, status, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ id, title, description, status });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ error: "Failed to update todo" });
    }
});


app.delete('/delete_id/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const sql = "DELETE FROM todos WHERE id = ?";
        const result = await pool.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo deleted successfully" });
        console.log("Deleted todo with id:", id);
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ error: "Failed to delete todo" });
    }
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

