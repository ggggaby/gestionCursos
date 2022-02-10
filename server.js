const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { nuevoCurso, verCursos, actualizarCurso, eliminarCurso } = require("./consultas");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/Apoyo/index.html')
});

app.post("/curso", async (req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion} = req.body;
    const respuesta = await nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion);
    res.send(respuesta)
});

app.get("/cursos", async (_, res) => {
    const respuesta = await verCursos();
    res.send(respuesta)
});

app.put("/curso", async (req, res) => {
    const { id, nombre, nivelTecnico, fechaInicio, duracion} = req.body;
    const respuesta = await actualizarCurso(id, nombre, nivelTecnico, fechaInicio, duracion);
    res.send(respuesta)
});

app.delete("/curso/:id", async (req, res) => {
    const { id } = req.params;
    const respuesta = await eliminarCurso(id);
    res.send(respuesta)
})

app.listen(3000, () => console.log("Servidor inicializado en el puerto 3000"))