import React from 'react';
import './Header.css';

const Header = ({ 
  statusFilter, 
  onStatusFilterChange, 
  onAddTodo, 
  loading 
}) => {
  return (
    <header className="app-header">
      <h1 className="app-title">Todo Manager</h1>
      <div className="header-controls">
        <div className="filter-container">
          <select 
            value={statusFilter} 
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="filter-select"
            disabled={loading}
          >
            <option value="">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="In-Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button 
          className="btn btn-primary add-todo-btn"
          onClick={onAddTodo}
          disabled={loading}
        >
          <span className="btn-icon">+</span>
          Add Todo
        </button>
      </div>
    </header>
  );
};

export default Header;
