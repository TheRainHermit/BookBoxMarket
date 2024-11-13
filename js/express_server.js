const express = require('express');
const app = express();

//API básica con un Endpoint
app.get('/', (req, res) => {
  res.send('¡Hola, Expressu!');
});

//API con Rutas y Parámetros
app.get('/saludo/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    res.send(`¡Hola, ${nombre}!`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});