let currentVersion = null;

const apiUrl = import.meta.env.VITE_REACT_API_URL || "https://infinitix-task-back-end.vercel.app" || "https://infinitix-task-back-end.onrender.com" || import.meta.env.VITE_REACT_APP_API_URL;

async function checkForUpdates() {
    try {
        const response = await fetch(`${apiUrl}/api/version`);
        const data = await response.json();

        if (!currentVersion) {
            currentVersion = data.version;
        } else if (data.version !== currentVersion) {
            const metaRefresh = document.createElement('meta');
            metaRefresh.httpEquiv = "refresh";
            metaRefresh.content = "5";
            document.head.appendChild(metaRefresh);
        }
    } catch (error) {
        console.error("Erreur lors de la vérification de la version :", error);
    }
}

setInterval(checkForUpdates, 30000);
