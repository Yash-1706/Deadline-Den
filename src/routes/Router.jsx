import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Tips from "../pages/Tips";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tips" element={<Tips />} />
                {/* More routes will be added here */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
