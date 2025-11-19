import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage';
import CreateTodoPage from './pages/CreateTodoPage';
import EditTodoPage from './pages/EditTodoPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/create" element={<CreateTodoPage />} />
          <Route path="/edit/:id" element={<EditTodoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
