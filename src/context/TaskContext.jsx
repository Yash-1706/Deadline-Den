import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    // Load from localStorage on first load
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(stored);
    }, []);

    // Sync to localStorage on change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {
        setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
