import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Connexion from "./Pages/Connexion";
import HomePage from "./Pages/HomePage";
import Inscription from "./Pages/Inscription";
import Navbar from "./Pages/NavBar";
import TaskManagerPage from "./Pages/TaskManagerPage";
import TaskStatsPage from "./Pages/TaskStatsPage";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="flex justify-center items-center p-0 gap-0 min-h-screen text-center">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tasks" element={<TaskManagerPage />} />
                    <Route path="/tasks/stats" element={<TaskStatsPage />} />
                    <Route path="/inscription" element={<Inscription />} />
                    <Route path="/connexion" element={<Connexion />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
