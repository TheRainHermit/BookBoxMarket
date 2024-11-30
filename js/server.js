const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("css"));
app.use(express.static("js"));
app.use(express.static("images"));
app.use(express.static("views"));
app.set("view engine", "ejs");

// Configuración de la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookboxmarket",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos MySQL");
});

// Ruta para la página de inicio
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/registro", (req, res) => {
  res.render("registro");
});

app.get("/login", (req, res) => {
  res.render("login");
});

  /*if (!nombre && !apellido && !email && !password && !confirmpassword && !telefono
      && !direccion && !ciudad && !pais && !fecha_nto) {
    return res
        .status(403)
        .render("registro", { error: "Los campos son requeridos." });
  }
  if (confirmpassword !== password) {
    return res
        .status(403)
        .render("registro", { error: "Las contraseñas no coinciden." });
  }
  // Check if user already exists
  try{
    const existingUser = "SELECT * FROM users WHERE email ="+req.body.email;
    if (existingUser) {
      return res
          .status(409)
          .render("registro", { error: "El usuario ya existe." });
  }
  }
  catch(err){
    return res
          .status(500)
          .render("registro", { error: err.message });
  }
  */
 //confirmpassword,

// Ruta para el registro de usuarios
app.post("/register", (req, res) => {
  const {
    nombre,
    apellido,
    email,
    password,
    telefono,
    direccion,
    ciudad,
    pais,
    codigo_postal,
    fecha_nto,
    preferencias_literarias,
  } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    const sql =
      "INSERT INTO users (nombre, apellido, email, password, telefono," +
      "direccion, ciudad, pais, codigo_postal, fecha_nto, preferencias_literarias)" +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        nombre,
        apellido,
        email,
        hash,
        telefono,
        direccion,
        ciudad,
        pais,
        codigo_postal,
        fecha_nto,
        preferencias_literarias,        
      ],
      (err, result) => {
        if (err) throw err;
        res.redirect("/");
      }
    );
  });
});

// Ruta para el logueo de usuarios
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  //const session = false;
  console.log(req.body);
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      console.log(results);
      const user = results[0];
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result) {
          res.redirect("/");
          //res.send("Inicio de sesión exitoso");
          console.log("Inicio de sesión exitoso");
          console.log(user.nombre+" "+user.apellido);
          const nombre = user.nombre;
          const apellido = user.apellido;
          //req.session.nombre = req.body.sesion;
          //req.session.save();

          //export { nombre, apellido };
          //const sesion = sessionStorage.setItem();
          //console.log(sesion);
          //const nombre_usuario = document.getElementById("sesion").innerHTML;
          //sesion.innerHTML = user.nombre+" "+user.apellido;
          //$('#sesion').html("user.nombre"+" "+"+user.apellido");
          
        } else {
          res.send("E-mail o contraseña incorrectos");
          res.redirect("/");
        }
      });
    } else {
      console.log(results);
      res.send("E-mail o contraseña incorrectos");
      res.redirect("/");
    }
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Ruta para el registro de usuarios
app.post("/donacionlibro", (req, res) => {
  const {
    libro_id,
    usuario_id,
    fecha_donacion,
    estado_donacion,
  } = req.body;
    const sql =
      "INSERT INTO donaciones (libro_id, usuario_id, fecha_donacion, estado_donacion)"+
      "VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [
        libro_id,
        usuario_id,
        fecha_donacion,
        estado_donacion,      
      ],
      (err, result) => {
        if (err) throw err;
        res.redirect("/");
      }
    );
  });

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
