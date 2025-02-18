import { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", description: "", status: "En cours" });
    const [selectedTask, setSelectedTask] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState("En cours");

    useEffect(() => {
        fetchTasks();
    }, []);

    const apiUrl = import.meta.env.VITE_REACT_API_URL || "https://infinitix-task-back-end.vercel.app" || "https://infinitix-task-back-end.onrender.com" || import.meta.env.VITE_REACT_APP_API_URL;

    /**const apiUrl = "http://localhost:5000";*/

    const fetchTasks = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/tasks`);
            if (!response.ok) throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            const data = await response.json();
            console.log('Données récupérées:', data);
            setTasks(data.tasks || data);
        } catch (error) {
            console.error("Erreur lors de la récupération des tâches:", error);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        console.log("Ajout de la tâche:", newTask);

        try {
            const response = await fetch(`${apiUrl}/api/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask)
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de l'ajout de la tâche: ${response.status}`);
            }

            setNewTask({ title: "", description: "", status: "En cours" });
            await fetchTasks();
        } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche:", error);
        }
    };

    const handleUpdateStatus = async (taskId) => {
        await fetch(`${apiUrl}/api/tasks/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: updatedStatus })
        });
        setSelectedTask(null);
        fetchTasks();
    };

    const handleDeleteTask = async (taskId) => {
        await fetch(`${apiUrl}/api/tasks/${taskId}`, {
            method: "DELETE"
        });
        fetchTasks();
    };

    return (
        <div className="p-7 bg-transparent">
            <h1 className="text-2xl mb-3 bg-gradient-to-r from-pink-400 via-yellow-500 to-sky-500 bg-clip-text text-transparent font-bold">
                Gestionnaire des tâches
            </h1>
            <form onSubmit={handleAddTask} className="mb-4 p-4 bg-gray-800 bg-opacity-50 rounded-lg flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Titre"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="border p-2 rounded-lg text-gray-100 bg-black"
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="border p-2 rounded-lg text-gray-100 bg-black"
                    required
                />
                <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                    className="border p-2 rounded-lg text-gray-100 bg-black"
                >
                    <option value="En cours">En cours</option>
                    <option value="Terminée">Terminée</option>
                    <option value="En attente">En attente</option>
                </select>
                <button
                    type="submit"
                    className="bg-sky-500 text-white p-2 mt-2 hover:bg-gradient-to-r hover:from-teal-500 hover:via-pink-500 hover:to-cyan-500 hover:text-black"
                >
                    Ajouter une tâche
                </button>
            </form>

            <ul className="p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                {Array.isArray(tasks) && tasks.map(task => (
                    <li key={task.id} className="mb-1 border-b pb-2 flex justify-between items-center text-gray-100">
                        <span>{task.title} - {task.description} - <strong>{task.status}</strong></span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setSelectedTask(task.id);
                                    setUpdatedStatus(task.status);
                                }}
                                className="text-yellow-500 p-1 hover:text-yellow-400 bg-transparent"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-red-500 p-1 hover:text-red-400 bg-transparent"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {selectedTask && (
                <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                    <h2 className="text-xl mb-2 text-white">Modifier le statut de la tâche</h2>
                    <select
                        value={updatedStatus}
                        onChange={(e) => setUpdatedStatus(e.target.value)}
                        className="border p-2 rounded-lg text-gray-100 mb-2"
                    >
                        <option value="En cours">En cours</option>
                        <option value="Terminée">Terminée</option>
                        <option value="En attente">En attente</option>
                    </select>
                    <button
                        onClick={() => handleUpdateStatus(selectedTask)}
                        className="text-green-500 p-2 hover:text-green-400"
                    >
                        <FaCheck />
                    </button>
                    <button
                        onClick={() => setSelectedTask(null)}
                        className="text-red-500 p-2 hover:text-red-400 ml-2"
                    >
                        <FaTimes />
                    </button>
                </div>
            )}
        </div>
    );
}

export default TaskManager;
