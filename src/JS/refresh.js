window.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();
        location.reload();
    }
});

window.addEventListener('beforeunload', function (event) {
    // Aucun code à exécuter ici pour éviter un rafraîchissement indésirable
});

document.addEventListener('DOMContentLoaded', function () {
    const refreshButton = document.getElementById('refresh-button');

    if (refreshButton) {
        refreshButton.addEventListener('click', function () {
            location.reload();
        });
    }
});