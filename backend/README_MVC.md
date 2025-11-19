


## Architecture Components

### 1. **Config** (`config/database.js`)
- Handles MySQL database connection
- Creates a connection pool for efficient database management
- Exports a promisified pool for async/await support

### 2. **Model** (`models/todoModel.js`)
- Contains all database operations
- Methods:
  - `create(title, description)` - Create a new todo
  - `getAll(page, limit, status)` - Get todos with pagination and filtering
  - `getById(id)` - Get a single todo by ID
  - `update(id, title, description, status)` - Update a todo
  - `delete(id)` - Delete a todo

### 3. **Controller** (`controllers/todoController.js`)
- Handles business logic and request/response processing
- Methods:
  - `createTodo(req, res)` - Handle create todo request
  - `getAllTodos(req, res)` - Handle get all todos request
  - `getTodoById(req, res)` - Handle get single todo request
  - `updateTodo(req, res)` - Handle update todo request
  - `deleteTodo(req, res)` - Handle delete todo request

### 4. **Routes** (`routes/todoRoutes.js`)
- Defines API endpoints and maps them to controller methods
- Endpoints:
  - `POST /create` - Create a new todo
  - `GET /get` - Get all todos (with pagination and filtering)
  - `GET /single_id/:id` - Get a single todo by ID
  - `PUT /update/:id` - Update a todo
  - `DELETE /delete_id/:id` - Delete a todo

### 5. **Entry Point** (`index.js`)
- Initializes Express application
- Configures middleware (CORS, body-parser)
- Registers routes
- Starts the server on port 3001

## Benefits of MVC Architecture

1. **Separation of Concerns**: Each component has a specific responsibility
2. **Maintainability**: Easier to update and maintain code
3. **Scalability**: Simple to add new features or endpoints
4. **Testability**: Components can be tested independently
5. **Code Reusability**: Models and controllers can be reused across different routes
6. **Organization**: Clear structure makes it easier for developers to understand the codebase

## Running the Application

```bash
cd backend
node index.js
```

The server will start on `http://localhost:3001`

## API Endpoints

All endpoints remain the same as before, ensuring compatibility with the frontend application.
