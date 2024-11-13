//API con métodos POST
const express = require('express');
const app = express();
app.use(express.json());
app.post('/datos', (req, res) => {
  const datos = req.body;
  res.send(`Datos recibidos: ${JSON.stringify(datos)}`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

