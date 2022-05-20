const express = require("express");
const bodyParser = require("body-parser");
const mySql = require("mysql");
const app = express();

app.use(bodyParser.json());

const conn = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "abc123.",
  database: "node_restapi",
});

conn.connect((err) => {
  if (err) throw err;

  console.log("Conexión establecida con App...");
});

// OBTENER TODOS LOS DATOS
app.get("/api/personas", (req, res) => {
  let personas = "SELECT * FROM personas";

  let query = conn.query(personas, (err, results) => {
    if (err) throw err;

    res.send(apiResponse(results));
  });
});

// OBTENER UNA DATO
app.get("/api/personas/:id", (req, res) => {
  let persona = `SELECT * FROM personas WHERE id = ${req.params.id}`;

  let query = conn.query(persona, (err, results) => {
    if (err) throw err;

    res.send(apiResponse(results));
  });
});

// CREAR UN NUEVO DATO
app.post("/api/personas", (req, res) => {
  let data = {
    nombre: req.body.nombre,
    edad: req.body.edad,
    domicilio: req.body.domicilio,
    ocupacion: req.body.ocupacion,
  };

  let nuevaPersona = "INSERT INTO personas SET ?";

  let query = conn.query(nuevaPersona, data, (err, results) => {
    if (err) throw err;

    res.send(apiResponse(results));
  });
});

// ACTUALIZAR UN DATO
app.put("/api/personas/:id", (req, res) => {
  let actualizarPersona = `UPDATE personas SET 
  nombre = "${req.body.nombre}", 
  edad = "${req.body.nombre}", 
  domicilio = "${req.body.domicilio}", 
  ocupacion = "${req.body.ocupacion}" 
  WHERE id = ${req.params.id}`;

  let query = conn.query(actualizarPersona, (err, results) => {
    if (err) throw err;

    res.send(apiResponse(results));
  });
});

// ELIMINAR UN DATO
app.delete("/api/personas/:id", (req, res) => {
  let eliminarPersona = `DELETE FROM personas WHERE id = ${req.params.id}`;

  let query = conn.query(eliminarPersona, (err, results) => {
    if (err) throw err;

    res.send(apiResponse(results));
  });
});

function apiResponse(results) {
  return JSON.stringify({ status: 200, error: null, response: results });
}

app.listen(3000, () => {
  console.log("Servidor iniciado en puerto 3000...");
});
