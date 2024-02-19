const form = document.getElementById('task-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;

    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al crear una nueva tarea');
        }
        console.log('Tarea creada exitosamente');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
