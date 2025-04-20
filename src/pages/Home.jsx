import { useState } from "react";
import { motion } from "framer-motion";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard"; // Importing TaskCard

const Home = () => {
    const { tasks, updateTask, toggleComplete } = useTasks();
    const [filterType, setFilterType] = useState("all");

    const filteredTasks = tasks.filter(
        (task) => filterType === "all" || task.type.toLowerCase() === filterType
    );

    const handleEdit = (task) => {
        const newTitle = prompt("Edit task title:", task.title);
        if (newTitle && newTitle !== task.title) {
            updateTask(task.id, { title: newTitle });
        }
    };

    const allDone = tasks.length > 0 && tasks.every(t => t.completed);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
                🎯 Stay Ahead with DeadlineDen
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-lg text-gray-600 text-center mb-8 max-w-xl"
            >
                {allDone
                    ? "✅ You’ve completed all tasks. Go reward yourself! 🍦"
                    : "Plan wisely. The panic meter watches all... 👀"}
            </motion.p>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-2 mb-4 mt-4 flex-wrap">
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

            {/* No tasks message */}
            {filteredTasks.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mt-16 text-gray-500"
                >
                    <p className="text-xl">📭 No tasks yet!</p>
                    <p className="text-sm mt-2">Click ➕ Add Task to get started.</p>
                </motion.div>
            ) : (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="w-full max-w-xl space-y-4"
                >
                    {filteredTasks.map((task) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TaskCard
                                task={task}
                                toggleComplete={toggleComplete}
                                handleEdit={handleEdit}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default Home;
