import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ConnexionPage from "./Pages/ConnexionPage";
import HomePage from "./Pages/HomePage";
import InscriptionPage from "./Pages/InscriptionPage";
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
                    <Route path="/inscription" element={<InscriptionPage />} />
                    <Route path="/connexion" element={<ConnexionPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
