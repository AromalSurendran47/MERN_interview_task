const pool = require('../config/database');

class TodoModel {
    // Create a new todo
    static async create(title, description) {
        const sql = "INSERT INTO todos (title, description, status) VALUES (?, ?, 'Pending')";
        const result = await pool.query(sql, [title, description]);
        return result;
    }

    // Get all todos with pagination and filtering
    static async getAll(page, limit, status) {
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

        return {
            data: todoRows,
            pagination: { total, page, limit, pages }
        };
    }

    // Get a single todo by ID
    static async getById(id) {
        const sql = "SELECT * FROM todos WHERE id = ?";
        const result = await pool.query(sql, [id]);
        return result.length > 0 ? result[0] : null;
    }

    // Update a todo
    static async update(id, title, description, status) {
        const sql = `
            UPDATE todos 
            SET title = ?, description = ?, status = ?, updatedAt = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        const result = await pool.query(sql, [title, description, status, id]);
        return result;
    }

    // Delete a todo
    static async delete(id) {
        const sql = "DELETE FROM todos WHERE id = ?";
        const result = await pool.query(sql, [id]);
        return result;
    }
}

module.exports = TodoModel;
