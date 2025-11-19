import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ 
  todos, 
  onEdit, 
  onDelete, 
  loading 
}) => {
  if (todos.length === 0) {
    return null;
  }

  return (
    <div className="todos-grid">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default TodoList;
