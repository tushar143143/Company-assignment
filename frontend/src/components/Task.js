import React, { useState } from 'react';

const Task = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleUpdate = () => {
    onUpdate(task._id, { title: newTitle, completed: task.completed });
    setIsEditing(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onUpdate(task._id, { title: task.title, completed: !task.completed })} 
      />
      {isEditing ? (
        <input 
          type="text" 
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)} 
          onBlur={handleUpdate}
        />
      ) : (
        <span 
          style={{ textDecoration: task.completed ? 'line-through' : 'none', flex: 1, marginLeft: '10px' }} 
          onClick={() => setIsEditing(true)}
        >
          {task.title}
        </span>
      )}
      <button onClick={() => onDelete(task._id)} style={{ marginLeft: '10px' }}>Delete</button>
    </div>
  );
};

export default Task;
