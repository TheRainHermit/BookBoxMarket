//Conexión a base de datos SQLite
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE user (id INT, name TEXT)");

  const stmt = db.prepare("INSERT INTO user VALUES (?, ?)");
  stmt.run(1, 'Alice');
  stmt.run(2, 'Bob');
  stmt.finalize();

  db.each("SELECT id, name FROM user", (err, row) => {
    console.log(`User: ${row.id}, ${row.name}`);
  });
});

app.get('/users', (req, res) => {
  db.all("SELECT id, name FROM user", (err, rows) => {
    res.json(rows);
  });
});
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

//Lectura y guardado de información con Express.js y Bases de Datos
db.serialize(() => {
  db.run("CREATE TABLE user (id INT, name TEXT)");

  const stmt = db.prepare("INSERT INTO user VALUES (?, ?)");
  stmt.run(1, 'Alice');
  stmt.run(2, 'Bob');
  stmt.finalize();
});

app.get('/users', (req, res) => {
  db.all("SELECT id, name FROM user", (err, rows) => {
    if (err) {
      res.status(500).send('Error en la base de datos');
      return;
    }
    res.json(rows);
  });
});

app.post('/users', (req, res) => {
  const { id, name } = req.body;
  db.run("INSERT INTO user (id, name) VALUES (?, ?)", [id, name], function(err) {
    if (err) {
      res.status(500).send('Error en la base de datos');
      return;
    }
    res.status(201).send({ id, name });
  });
});

//const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


