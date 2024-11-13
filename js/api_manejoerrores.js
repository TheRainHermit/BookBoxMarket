//API con manejo de errores
const express = require('express');
const app = express();
app.use(express.json());
let items = [];
app.post('/items', (req, res) => {
  const item = req.body;
  if (!item.id || !item.name) {
    return res.status(400).send('El item debe tener un id y un nombre');
  }
  items.push(item);
  res.status(201).send(item);
});
app.get('/items', (req, res) => {
  res.send(items);
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = items.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).send('Item no encontrado');
  }
  items[index] = updatedItem;
  res.send(updatedItem);
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).send('Item no encontrado');
  }
  items.splice(index, 1);
  res.status(204).send();
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
