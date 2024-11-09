import 'chart.js/auto';
import { useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";

function TaskStats() {
    const [taskStats, setTaskStats] = useState([]);

    const apiUrl = import.meta.env.VITE_REACT_API_URL || "https://infinitix-task-back-end.vercel.app" || "https://infinitix-task-back-end.onrender.com" || import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/api/tasks`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTaskStats(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                console.error('Erreur lors de la récupération des données:', err);
                setTaskStats([]);
            });
    }, []);

    const taskStatuses = Array.isArray(taskStats) ? taskStats.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
    }, {}) : {};

    const chartData = {
        labels: Object.keys(taskStatuses),
        datasets: [{
            data: Object.values(taskStatuses),
            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        }]
    };

    return (
        <div className="p-4 sm:p-6 flex flex-col items-center">
            <h1 className="text-xl sm:text-2xl bg-gradient-to-r from-sky-400 via-yellow-400 to-sky-500 bg-clip-text text-transparent font-bold mb-0 sm:mb-7 text-center">
                Statistiques des tâches
            </h1>
            <div className="flex flex-col sm:flex-row justify-center w-full space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-full sm:w-1/2 p-2 sm:p-4 flex justify-center">
                    <div className="w-3/4">
                        <h2 className="text-md sm:text-lg mb-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-sky-400 bg-clip-text text-transparent text-center sm:text-left">
                            Diagramme en Doughnut
                        </h2>
                        <Doughnut data={chartData} options={{
                            maintainAspectRatio: true,
                            responsive: true,
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'white',
                                    }
                                }
                            }
                        }} />
                    </div>
                </div>
                <div className="w-full sm:w-1/2 p-2 sm:p-4 mt-4 sm:mt-0 flex justify-center">
                    <div className="w-3/4">
                        <h2 className="text-md sm:text-lg mb-2 bg-gradient-to-r from-sky-500 via-pink-400 to-yellow-400 bg-clip-text text-transparent text-center sm:text-left">
                            Diagramme en Pie
                        </h2>
                        <Pie data={chartData} options={{
                            maintainAspectRatio: true,
                            responsive: true,
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'white',
                                    }
                                }
                            }
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskStats;
