import React from 'react';
import './TodoForm.css';

const TodoForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  formData, 
  onFormDataChange, 
  loading,
  isEditing = false,
  editingTodo 
}) => {
  if (!isOpen) return null;

  const currentData = isEditing ? editingTodo : formData;
  const handleChange = (field, value) => {
    if (isEditing) {
      onFormDataChange(editingTodo.id, { ...editingTodo, [field]: value });
    } else {
      onFormDataChange({ ...formData, [field]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal todo-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditing ? 'Edit Todo' : 'Create New Todo'}
          </h2>
          <button className="modal-close" onClick={onClose}>Close</button>
        </div>
        
        <form onSubmit={handleSubmit} className="todo-form">
          <div className="form-group">
            <label className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              value={currentData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="What needs to be done?"
              className="form-input text-black"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Description
            </label>
            <textarea
              value={currentData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Add more details about this task..."
              className="form-textarea"
              rows="4"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              value={currentData.status || 'Pending'}
              onChange={(e) => handleChange('status', e.target.value)}
              className="form-select"
              disabled={loading}
            >
              <option value="Pending">Pending</option>
              <option value="In-Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              disabled={loading || !currentData.title?.trim()}
            >
              {loading ? (
                <span className="loading-text">Processing...</span>
              ) : (
                <span>{isEditing ? 'Update Todo' : 'Create Todo'}</span>
              )}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
