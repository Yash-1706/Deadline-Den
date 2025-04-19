import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PanicMeter from "../components/PanicMeter.jsx";

const Home = () => {
    const [taskInput, setTaskInput] = useState("");
    const [tasks, setTasks] = useState( () => {
        const saved = localStorage.getItem("deadlineDenTasks");
        return saved ? JSON.parse(saved) : [];
    });
    const [dueDate, setDueDate] = useState("");
    const [taskType, setTaskType] = useState("assignment");
    const [filterType, setFilterType] = useState("all");

    useEffect( () => {
        localStorage.setItem("deadlineDenTasks", JSON.stringify(tasks));
    }, [tasks])

    const handleAddTask = () => {
        if (taskInput.trim() === "" || dueDate === "") return;

        const newTask = {
            id: Date.now(),
            title: taskInput,
            dueDate,
            type: taskType,
            createdAt: new Date(),
        };

        setTasks([...tasks, newTask]);
        setTaskInput("");
        setDueDate("");
        setTaskType("assignment");
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-[#fffef9] flex flex-col items-center justify-center p-6"
        >
            {/* Header */}
            <motion.h1
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4"
            >
                DeadlineDen: Academic Planner
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-lg text-gray-600 text-center mb-8 max-w-xl"
            >
                Stay ahead of your academic deadlines with a clear plan and a panic meter 🤯✨
            </motion.p>

            {/* Input Card */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full max-w-xl"
            >
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="e.g., Submit physics assignment"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <select
                    value={taskType}
                    onChange={(e) => setTaskType(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base mt-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                    <option value="assignment">📄 Assignment</option>
                    <option value="exam">📝 Exam</option>
                    <option value="project">🛠️ Project</option>
                </select>
                <div className="flex justify-end mt-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddTask}
                        className="bg-orange-400 text-white px-6 py-2 rounded-xl hover:bg-orange-500 transition"
                    >
                        Add Task
                    </motion.button>
                </div>
            </motion.div>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-2 mb-4 mt-8 flex-wrap">
                {["all", "assignment", "exam", "project"].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-4 py-2 rounded-xl text-sm ${
                            filterType === type
                                ? "bg-orange-400 text-white"
                                : "bg-gray-100 text-gray-700 border border-gray-300"
                        }`}
                    >
                        {type === "all"
                            ? "📋 All"
                            : type === "assignment"
                                ? "📄 Assignment"
                                : type === "exam"
                                    ? "📝 Exam"
                                    : "🛠️ Project"}
                    </button>
                ))}
            </div>

            {/* Task List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="w-full max-w-xl"
            >
                {tasks.filter((task) => filterType === "all" || task.type === filterType).length === 0 ? (
                    <p className="text-center text-gray-500">No tasks found for this filter 💤</p>
                ) : (
                    <ul className="space-y-4">
                        {tasks
                            .filter((task) => filterType === "all" || task.type === filterType)
                            .map((task) => (
                                <motion.li
                                    key={task.id}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-800 font-medium">
                                            {task.title}{" "}
                                            <span className="ml-2 text-sm text-gray-500">
                                                ({task.type})
                                            </span>
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            Due: {new Date(task.dueDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <PanicMeter dueDate={task.dueDate} />
                                </motion.li>
                            ))}
                    </ul>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Home;
