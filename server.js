const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'task_manager'
});

// Conectar a la base de datos MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión establecida con la base de datos');
});

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, '/')));

// Configurar el analizador de solicitudes JSON
app.use(express.json());

// Ruta para manejar la creación de una nueva tarea
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const completed = false; // Por defecto, la tarea se crea como no completada

    const query = 'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)';
    connection.query(query, [title, description, completed], (err, result) => {
        if (err) {
            console.error('Error al insertar una nueva tarea: ' + err.stack);
            res.status(500).send('Error al insertar una nueva tarea en la base de datos');
            return;
        }
        res.status(201).send('Tarea creada exitosamente');
    });
});

// Ruta para marcar una tarea como completada
app.put('/tasks/:id/complete', (req, res) => {
    const taskId = req.params.id;
    const query = 'UPDATE tasks SET completed = true WHERE id = ?';
    connection.query(query, [taskId], (err, result) => {
        if (err) {
            console.error('Error al marcar la tarea como completada: ' + err.stack);
            res.status(500).send('Error al marcar la tarea como completada en la base de datos');
            return;
        }
        res.status(200).send('Tarea marcada como completada exitosamente');
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en ejecución en el puerto ${PORT}`));
