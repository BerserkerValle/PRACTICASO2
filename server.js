const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = 3000;


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Habilitar CORS para permitir peticiones desde el frontend
app.use(cors());
app.use(express.json());

// Servir la carpeta actual como contenido estático (para index.html)
app.use(express.static(__dirname));

// Endpoint GET que devuelve la lista de estudiantes
app.get('/api/estudiantes', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, nombre, carrera FROM estudiantes');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al consultar a la base de datos:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener estudiantes' });
    }
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`🌐 Puedes ver la aplicación en http://localhost:${PORT}/index.html`);
});