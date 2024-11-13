const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const url = 'mongodb://localhost:27017';
const dbName = 'test';
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  const db = client.db(dbName);
  const collection = db.collection('users');
  app.get('/users', async (req, res) => {
    try {
      const users = await collection.find({}).toArray();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en la base de datos');
    }
  });
  const port = 3000;
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
});
