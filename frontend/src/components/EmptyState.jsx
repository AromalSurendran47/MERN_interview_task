import React from 'react';
import './EmptyState.css';

const EmptyState = ({ statusFilter }) => {
  const getMessage = () => {
    if (statusFilter) {
      return {
        title: `No ${statusFilter.toLowerCase()} tasks found`,
        description: `Try selecting a different status filter or create a new task.`,
        icon: 'Search'
      };
    }
    return {
      title: 'No tasks yet!',
      description: 'Create your first task to get started on your productivity journey.',
      icon: 'Star'
    };
  };

  const { title, description, icon } = getMessage();

  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-description">{description}</p>
      <div className="empty-illustration">
        <div className="illustration-item">Task</div>
        <div className="illustration-item">Check</div>
        <div className="illustration-item">Rocket</div>
      </div>
    </div>
  );
};

export default EmptyState;
