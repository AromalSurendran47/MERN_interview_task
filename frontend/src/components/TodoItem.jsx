import React from 'react';
import './TodoItem.css';

const TodoItem = ({ 
  todo, 
  onEdit, 
  onDelete, 
  loading 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'In-Progress': return 'status-progress';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Pending': return 'Pending';
      case 'In-Progress': return 'In Progress';
      case 'Completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="todo-card">
      <div className="todo-header">
        <div className="todo-title-container">
          <h3 className="todo-title">{todo.title}</h3>
          <span className={`status-badge ${getStatusColor(todo.status)}`}>
            {getStatusText(todo.status)}
          </span>
        </div>
      </div>
      
      {todo.description && (
        <div className="todo-description-container">
          <p className="todo-description">{todo.description}</p>
        </div>
      )}
      
      <div className="todo-footer">
        <div className="todo-meta">
          <div className="meta-item">
            <span className="meta-icon">📅</span>
            <small>Created: {new Date(todo.createdAt).toLocaleDateString()}</small>
          </div>
          {todo.updatedAt !== todo.createdAt && (
            <div className="meta-item">
              <span className="meta-icon">🕒</span>
              <small>Updated: {new Date(todo.updatedAt).toLocaleDateString()}</small>
            </div>
          )}
        </div>
        
        <div className="todo-actions">
          <button 
            className="btn btn-sm btn-edit"
            onClick={() => onEdit(todo)}
            disabled={loading}
            title="Edit todo"
          >
            Edit
          </button>
          <button 
            className="btn btn-sm btn-delete"
            onClick={() => onDelete(todo.id)}
            disabled={loading}
            title="Delete todo"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
