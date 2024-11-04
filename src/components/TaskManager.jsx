import { useEffect, useState } from "react";

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", description: "", status: "En cours" });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await fetch("http://localhost:5000/api/tasks");
        const data = await response.json();
        setTasks(data);
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        });
        setNewTask({ title: "", description: "", status: "En cours" });
        fetchTasks();
    };

    return (
        <div className="p-3 bg-gray-800 bg-opacity-50 rounded-lg">
            <h1 className="text-2xl mb-4 bg-gradient-to-r from-pink-400 via-yellow-500 to-sky-500 bg-clip-text text-transparent font-bold">Gestionnaire des tâches</h1>
            <form onSubmit={handleAddTask} className="mb-4 flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Titre"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="border p-2 rounded-lg bg-black text-gray-100"
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="border p-2 rounded-lg bg-black text-gray-100"
                    required
                />
                <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                    className="border p-2 rounded-lg bg-black text-gray-100"
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
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className="mb-2 border-b pb-2">
                        <span>{task.title} - {task.description} - <strong>{task.status}</strong></span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskManager;
