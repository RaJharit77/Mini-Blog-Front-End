window.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();
        location.reload();
    }
});

window.addEventListener('beforeunload', function (event) {
    location.reload();
});