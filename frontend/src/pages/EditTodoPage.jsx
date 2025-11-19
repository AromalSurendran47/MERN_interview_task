import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const API_URL = 'http://localhost:3001';

const EditTodoPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending'
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`${API_URL}/single_id/${id}`);
        if (response.ok) {
          const todo = await response.json();
          setFormData({
            title: todo.title,
            description: todo.description || '',
            status: todo.status
          });
        } else {
          toast.error('Todo not found');
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching todo:', error);
        toast.error('Error loading todo');
        navigate('/');
      } finally {
        setFetching(false);
      }
    };

    fetchTodo();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Todo updated successfully!');
        navigate('/');
      } else {
        toast.error('Failed to update todo');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Error updating todo');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  if (fetching) {
    return (
      <div className="app">
        <div className="main-content">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading todo...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="main-content">
        <div className="edit-page">
          <h1>Edit Todo</h1>
          <form onSubmit={handleSubmit} className="todo-form">
            <div className="form-group">
              <label className="form-label ">
                Title <span className="required">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="What needs to be done?"
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                value={formData.description}
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
                value={formData.status}
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
                className="btn btn-primary"
                disabled={loading || !formData.title.trim()}
              >
                {loading ? 'Updating...' : 'Update Todo'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate('/')}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTodoPage;
