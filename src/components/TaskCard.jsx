import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { motion } from "framer-motion";

// Panic level for progress bar
const getPanicLevel = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const total = 7; // max urgency window

    const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    const clamped = Math.max(0, Math.min(total, diff));
    const percent = ((total - clamped) / total) * 100;

    let color = "bg-green-400";
    if (clamped <= 6) color = "bg-yellow-400";
    if (clamped <= 2) color = "bg-red-500";

    return { percent, color };
};

const TaskCard = ({ task, toggleComplete, handleEdit }) => {
    const { updateTask, deleteTask } = useTasks();
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        title: task.title,
        type: task.type,
        dueDate: task.dueDate,
    });
    const [error, setError] = useState("");

    const handleSave = () => {
        if (!form.title || !form.dueDate) {
            setError("Title and Due Date are required.");
            return;
        }
        setError("");
        updateTask(task.id, { ...form });
        setIsEditing(false);
    };

    const panic = getPanicLevel(task.dueDate);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-2xl p-4 shadow-md transition ${
                task.completed ? "opacity-60 line-through" : ""
            }`}
        >
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task.id)}
                        className="h-5 w-5 accent-orange-400 mt-1"
                    />

                    {isEditing ? (
                        <div className="space-y-2">
                            <input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                            <select
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            >
                                <option>Assignment</option>
                                <option>Exam</option>
                                <option>Project</option>
                            </select>
                            <input
                                type="date"
                                value={form.dueDate}
                                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-lg font-bold">{task.title}</h2>
                            <p className="text-sm text-gray-500">
                                {task.type} — Due: {task.dueDate}
                            </p>
                            {/* Panic Meter Bar */}
                            <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-500 ${panic.color}`}
                                    style={{ width: `${panic.percent}%` }}
                                ></div>
                            </div>
                            {/* Panic Meter Percentage */}
                            <p className="text-xs text-gray-500 mt-1">
                                Panic Meter: {Math.round(panic.percent)}%
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex gap-2 mt-2 sm:mt-0">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setForm({
                                        title: task.title,
                                        type: task.type,
                                        dueDate: task.dueDate,
                                    });
                                    setError("");
                                }}
                                className="bg-gray-300 text-black px-3 py-1 rounded-lg text-sm"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                        >
                            Edit
                        </button>
                    )}
                    <button
                        onClick={() => deleteTask(task.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default TaskCard;
