import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = () => axios.get(API_URL);
export const addTask = (title) => axios.post(API_URL, { title });
export const updateTask = (id, updates) => axios.put(`${API_URL}/${id}`, updates);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
