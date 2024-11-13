//API con CRUD básico
const express = require('express');
const app = express();
app.use(express.json());
let items = [];
app.post('/items', (req, res) => {
  const item = req.body;
  items.push(item);
  res.status(201).send(item);
});
app.get('/items', (req, res) => {
  res.send(items);
});
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  items = items.map(item => (item.id === id ? updatedItem : item));
  res.send(updatedItem);
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(item => item.id !== id);
  res.status(204).send();
});
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
