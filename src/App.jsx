import AppRouter from "./routes/Router";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="font-sans bg-[#fffef9] min-h-screen">
            <Navbar />
            <AppRouter />
        </div>
    );
}

export default App;
