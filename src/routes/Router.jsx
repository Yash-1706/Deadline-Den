import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Add from "../pages/AddTask";
import Tips from "../pages/Tips";
import About from "../pages/About";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/about" element={<About />} />
        </Routes>
    );
};

export default AppRouter;
