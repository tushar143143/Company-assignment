import React, { useState, useEffect } from 'react';
import * as api from './api';
import Task from './components/Task';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const fetchTasks = async () => {
    const { data } = await api.getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTaskTitle.trim()) {
      await api.addTask(newTaskTitle);
      setNewTaskTitle('');
      fetchTasks();
    }
  };

  const handleUpdateTask = async (id, updates) => {
    await api.updateTask(id, updates);
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await api.deleteTask(id);
    fetchTasks();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>To-Do List</h1>
      <div>
        <input 
          type="text" 
          placeholder="Add a new task" 
          value={newTaskTitle} 
          onChange={(e) => setNewTaskTitle(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handleAddTask()} 
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        {tasks.map((task) => (
          <Task key={task._id} task={task} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
        ))}
      </div>
    </div>
  );
};

export default App;
