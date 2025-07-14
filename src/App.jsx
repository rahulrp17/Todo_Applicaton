import React, { useEffect, useState } from 'react';
import { motion as  Motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Navbar from './Navbar';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (input.trim() === '') return;

    if (editId !== null) {
      setTasks(tasks.map(task =>
        task.id === editId ? { ...task, text: input } : task
      ));
      localStorage.setItem('tasks', JSON.stringify(tasks));
      setEditId(null);
    } else {
      const newTask = { id: Date.now(), text: input };
      setTasks([...tasks, newTask]);
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    }
    setInput('');
  };

  const handleEdit = (id) => {
    const task = tasks.find(t => t.id === id);
    setInput(task.text);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  return (
    <>
    <Navbar />
    <div className="app-container bg-purple-400  shadow-xl position-relative   ">
      <h2 className='text-2xl font-bold '>📝 Animated Todo</h2>
      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
          className='bg-amber-50 outline-blue-400 border-none'
          
        />
        <button onClick={handleAdd}>{editId ? 'Update' : 'Add'}</button>
      </div>

      <ul className="task-list ">
        <AnimatePresence>
          {tasks.map(task => (
            <Motion.li
              key={task.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <span className='block'>{task.text}</span>
              <div className='btn'>
                <button className="inline-block" onClick={() => handleEdit(task.id)}>✏️</button>
                <button onClick={() => handleDelete(task.id)}>🗑️</button>
              </div>
            </Motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
    </>
  );
};

export default App;



