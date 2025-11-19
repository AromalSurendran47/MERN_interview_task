import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '../components/Header';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';

const API_URL = 'http://localhost:3001';

const TodoListPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTodos, setTotalTodos] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending'
  });

  const navigate = useNavigate();

  // Fetch todos with pagination and filtering
  const fetchTodos = async (page = 1, status = '') => {
    setLoading(true);
    try {
      const url = new URL(`${API_URL}/get`);
      url.searchParams.append('page', page);
      url.searchParams.append('limit', 6);
      if (status) url.searchParams.append('status', status);

      const response = await fetch(url);
      const data = await response.json();

      setTodos(data.data);
      setCurrentPage(data.pagination.page);
      setTotalPages(data.pagination.pages);
      setTotalTodos(data.pagination.total);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(currentPage, statusFilter);
  }, [currentPage, statusFilter]);

  // Delete todo
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/delete_id/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast.success('Todo deleted successfully');
        fetchTodos(currentPage, statusFilter);
      } else {
        toast.error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('Error deleting todo');
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const startEdit = (todo) => {
    navigate(`/edit/${todo.id}`);
  };

  // Event handlers for components
  const handleStatusFilterChange = (filter) => {
    setLoading(true);
    setCurrentPage(1);
    setTimeout(() => {
      setStatusFilter(filter);
    }, 2000);
  };

  const handleAddTodo = () => {
    navigate('/create');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <Header 
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        onAddTodo={handleAddTodo}
        loading={loading}
      />

      <main className="main-content">
        <div className="todo-manager-container">
          {loading && <Loading message="Loading your tasks..." />}

          {!loading && todos.length === 0 && (
            <EmptyState statusFilter={statusFilter} />
          )}

          {!loading && todos.length > 0 && (
            <TodoList 
              todos={todos}
              onEdit={startEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          )}

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            loading={loading}
            totalTodos={totalTodos}
          />
        </div>
      </main>
    </div>
  );
};

export default TodoListPage;
