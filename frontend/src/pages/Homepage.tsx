import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Task } from '../types';

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('/api/tasks/');
    setTasks(response.data);
  };

  const addTask = async (title: string, description: string, dueDate: string) => {
    const response = await axios.post('/api/tasks/', { title, description, due_date: dueDate });
    setTasks([...tasks, response.data]);
  };

  const deleteTask = async (id: number) => {
    await axios.delete(`/api/tasks/${id}/`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      const response = await axios.patch(`/api/tasks/${id}/`, { is_completed: !task.is_completed });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onToggleComplete={toggleComplete} />
    </div>
  );
};

export default HomePage;
