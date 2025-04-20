import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    // Load tasks from localStorage on first render
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) setTasks(savedTasks);
    }, []);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Add new task
    const addTask = (task) => {
        setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
    };

    // Delete task
    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    // Update task
    const updateTask = (id, updatedTask) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
        );
    };

    // Toggle task completion
    const toggleComplete = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask, toggleComplete }}>
            {children}
        </TaskContext.Provider>
    );
};
