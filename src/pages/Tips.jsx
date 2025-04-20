import { useState } from "react";
import { motion } from "framer-motion";
import { useTasks } from "../context/TaskContext";

const Tips = () => {
    const [tip, setTip] = useState("");
    const [loading, setLoading] = useState(false);
    const { tasks } = useTasks();

    const handleGetTip = async () => {
        setLoading(true);
        setTip("");

        const key = import.meta.env.VITE_GEMINI_API_KEY;

        // Add randomness to the prompt
        const variations = [
            "Make it calming and practical.",
            "Keep it soothing and focus-driven.",
            "Make it motivating and action-based.",
            "Tailor it to overwhelmed students.",
            "Make it gentle and time-based."
        ];
        const randomTone = variations[Math.floor(Math.random() * variations.length)];

        // Construct dynamic prompt
        const taskSummary = `I have ${tasks.length} tasks. ${
            tasks.filter(t => !t.completed).length
        } are incomplete. Types include: ${[...new Set(tasks.map(t => t.type))].join(", ")}.`;

        const dynamicPrompt = `${taskSummary} ${randomTone} Give me 1 short productivity tip under 25 words.`;

        try {
            const response = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" + key,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    { text: dynamicPrompt }
                                ]
                            }
                        ]
                    })
                }
            );

            const data = await response.json();
            const output = data.candidates?.[0]?.content?.parts?.[0]?.text;
            setTip(output || "🤔 No tip received. Try again?");
        } catch (error) {
            console.error("Gemini error:", error);
            setTip("😅 Failed to get suggestion. Check your API key or connection.");
        }

        setLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-[#fffef9] flex flex-col items-center justify-center px-4 py-10"
        >
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">🧠 Productivity Tips</h1>
            <p className="text-gray-600 text-center max-w-lg mb-6">
                Feeling stressed about deadlines? Tap the button below and let our AI drop some calming wisdom based on your tasks.
            </p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetTip}
                className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-xl transition mb-6"
            >
                {loading ? "Thinking..." : "💡 Get Suggestion"}
            </motion.button>

            {tip && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-gray-200 shadow-md rounded-2xl px-6 py-4 max-w-lg text-center text-gray-800"
                >
                    {tip}
                </motion.div>
            )}
        </motion.div>
    );
};

export default Tips;
