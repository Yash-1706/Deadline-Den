import { useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
    const [taskInput, setTaskInput] = useState("")
    const [tasks, setTasks] = useState([])

    const handleAddTask = () => {
        if (taskInput.trim() === "") return;

        const newTask = {
            id: Date.now(),
            title: taskInput,
            createdAt: new Date(),
            status: "pending", //can be updated later to "completed" or "urgent", etc..
        }

        setTasks([...tasks, newTask])
        setTaskInput("")
    }

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
                    placeholder="e.g., Add a new assignment..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
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

            {/* Task List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="mt-8 w-full max-w-xl"
            >
                {tasks.length === 0 ? (
                    <p className="text-center text-gray-500">No tasks added yet 💤</p>
                ) : (
                    <ul className="space-y-4">
                        {tasks.map((task) => (
                            <motion.li
                                key={task.id}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow flex justify-between items-center"
                            >
                                <span className="text-gray-800">{task.title}</span>
                                <span className="text-xs text-gray-400">
                  {new Date(task.createdAt).toLocaleString()}
                </span>
                            </motion.li>
                        ))}
                    </ul>
                )}
            </motion.div>

            {/* Suggestion Buttons */}
            {/*<motion.div*/}
            {/*    initial={{ opacity: 0, y: 20 }}*/}
            {/*    animate={{ opacity: 1, y: 0 }}*/}
            {/*    transition={{ delay: 1.1 }}*/}
            {/*    className="flex gap-4 mt-6 flex-wrap justify-center"*/}
            {/*>*/}
            {/*    {["📝 Tips", "🧠 AI Suggestion", "📅 Planner View"].map((text, index) => (*/}
            {/*        <motion.button*/}
            {/*            whileHover={{ scale: 1.05 }}*/}
            {/*            whileTap={{ scale: 0.95 }}*/}
            {/*            key={index}*/}
            {/*            className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 hover:bg-gray-200"*/}
            {/*        >*/}
            {/*            {text}*/}
            {/*        </motion.button>*/}
            {/*    ))}*/}
            {/*</motion.div>*/}
        </motion.div>
    );
};

export default Home;
