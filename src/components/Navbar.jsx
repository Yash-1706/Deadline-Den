import { NavLink } from "react-router-dom";

const Navbar = () => {
    const linkClass = ({ isActive }) =>
        `px-4 py-2 rounded-xl transition ${
            isActive ? "bg-orange-400 text-white" : "text-gray-600 hover:bg-gray-100"
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-[#fffef9] border-b border-gray-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">📚 DeadlineDen</h1>
                <div className="flex gap-2 flex-wrap">
                    <NavLink to="/" className={linkClass}>🏠 Home</NavLink>
                    <NavLink to="/add" className={linkClass}>➕ Add Task</NavLink>
                    <NavLink to="/tips" className={linkClass}>🧠 Tips</NavLink>
                    <NavLink to="/about" className={linkClass}>ℹ About</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
