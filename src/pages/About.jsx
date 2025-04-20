import { motion } from "framer-motion";

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-[#fffef9] text-gray-800"
        >
            <h1 className="text-4xl font-bold mb-4">ℹ About DeadlineDen</h1>
            <p className="max-w-xl text-center text-lg leading-relaxed">
                DeadlineDen is a simple yet powerful productivity tool for students. Add your assignments, view upcoming deadlines, and get calming AI-powered tips when things get hectic. ✨<br /><br />
                Made with React, TailwindCSS, and Gemini AI — by Yash Gaikwad.
            </p>
        </motion.div>
    );
};

export default About;
