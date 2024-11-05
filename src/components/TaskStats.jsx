import 'chart.js/auto';
import { useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";

function TaskStats() {
    const [taskStats, setTaskStats] = useState([]);

    /**const apiUrl = import.meta.env.VITE_REACT_API_URL || "https://infinitix-task-back-end.vercel.app" || "https://infinitix-task-back-end.onrender.com" || import.meta.env.VITE_REACT_APP_API_URL;*/

    const apiUrl = "http://localhost:5000";

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
        <div className="p-10 flex flex-col items-center">
            <h1 className="text-2xl bg-gradient-to-r from-sky-400 via-yellow-400 to-sky-500 bg-clip-text text-transparent font-bold mb-6">
                Statistiques des tâches
            </h1>
            <div className="flex justify-center w-full">
                <div className="w-1/2 mx-4">
                    <h2 className="text-lg mb-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-sky-400 bg-clip-text text-transparent">Diagramme en Doughnut</h2>
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
                    }} height={200} />
                </div>
                <div className="w-1/2 mx-4">
                    <h2 className="text-lg mb-2 bg-gradient-to-r from-sky-500 via-pink-400 to-yellow-400 bg-clip-text text-transparent">Diagramme en Pie</h2>
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
                    }} height={200} />
                </div>
            </div>
        </div>
    );
}

export default TaskStats;
