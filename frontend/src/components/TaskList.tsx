import React from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggleComplete }) => {
  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex justify-between items-center p-4 bg-white shadow mb-2 rounded">
          <div className={task.is_completed ? 'line-through' : ''}>{task.title}</div>
          <div>
            <button onClick={() => onToggleComplete(task.id)} className="mr-2 text-blue-600">
              {task.is_completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => onDelete(task.id)} className="text-red-600">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
