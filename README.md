# Todo List Application

A fully functional Todo List Application built with React frontend and Express.js backend, featuring complete CRUD operations, pagination, and status management.

## Features

### Core Functionality
-  **Create Todos**: Add new todos with title (mandatory) and description (optional)
-  **Edit/Update Todos**: Modify existing todos and update their status
-  **Delete Todos**: Remove todos from the list
-  **Status Management**: Track todos as Pending, In-Progress, or Completed

### Additional Features
-  **Pagination**: Efficiently manage large lists with page-based navigation
-  **Filtering**: Filter todos by status (All, Pending, In-Progress, Completed)
-  **Loading Indicators**: Visual feedback during API calls
-  **Responsive Design**: Works seamlessly on desktop and mobile devices
-  **Modal Forms**: Clean, user-friendly create and edit interfaces
## Tech Stack

### Frontend
- **React 19.2.0**: Modern React with hooks
- **Vite**: Fast development server and build tool
- **CSS3**: Custom styling with animations and responsive design

### Backend
- **Express.js**: Node.js web framework
- **MySQL**: Database for data persistence
- **CORS**: Cross-origin resource sharing enabled
- **Body-parser**: JSON request parsing

## API Endpoints

### Base URL: `http://localhost:3001`



### API Request Examples

#### Create Todo
```javascript
POST /create
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "Pending"
}
```

#### Get Todos with Pagination
```javascript
GET /get?page=1&limit=4&status=Pending
```

#### Update Todo
```javascript
PUT /update/1
{
  "title": "Updated todo title",
  "description": "Updated description",
  "status": "In-Progress"
}
```




## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- npm or yarn

### Database Setup
1. Create a MySQL database named `todo_app`
2. Create a `todos` table with the following structure:

```sql
CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('Pending', 'In-Progress', 'Completed') DEFAULT 'Pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update database credentials in `backend/index.js`:
   ```javascript
   const pool = mysql.createPool({
       connectionLimit: 10,
       host: 'localhost',
       user: 'your_mysql_username',
       password: 'your_mysql_password',
       database: 'todo_app'
   });
   ```

4. Start the backend server:
   ```bash
   node index.js
   ```
   The server will run on http://localhost:3001

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5173

## Development Scripts

### Frontend
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Backend
- `node index.js`: Start the Express server

## Production Deployment

### Frontend Build
```bash
cd frontend && npm run build
```
The built files will be in the `dist` directory.
