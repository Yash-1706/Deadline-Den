import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { motion } from "framer-motion";

const Add = () => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("Assignment");
    const [dueDate, setDueDate] = useState("");

    const { addTask } = useTasks();
    const navigate = useNavigate();

    const handleAddTask = () => {
        if (!title || !dueDate) {
            alert("Please fill in all fields.");
            return;
        }

        // Using context to add task
        addTask({ title, type, dueDate });

        // Reset form fields
        setTitle("");
        setType("Assignment");
        setDueDate("");

        alert("✅ Task added!");
        navigate("/"); // Redirect to home
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-[#fffef9] flex flex-col items-center justify-center px-4 py-10"
        >
            <h1 className="text-3xl font-bold text-gray-800 mb-6">➕ Add a New Task</h1>

            <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4">
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                />

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                >
                    <option>Assignment</option>
                    <option>Exam</option>
                    <option>Project</option>
                </select>

                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddTask}
                    className="bg-orange-400 hover:bg-orange-500 text-white font-semibold w-full py-2 rounded-lg"
                >
                    Add Task
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Add;
