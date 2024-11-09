window.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();
        location.reload();
    }
});

window.addEventListener('beforeunload', function (event) {
    // Aucun code à exécuter ici pour éviter un rafraîchissement indésirable
});
