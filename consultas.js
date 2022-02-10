const { query } = require("express");
const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "",
    database: "cursos",
    port: 5432,
});

async function nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion) {
    try {
        const consulta = {
            text: `INSERT INTO cursos (nombre, nivel, fecha, duracion) values ($1, $2, $3, $4) RETURNING *`,
            values: [nombre, nivelTecnico, fechaInicio, duracion],
        }
        const result = await pool.query(consulta);

        return result.rows;
    } catch (e) {
        return e;
    }
}

async function verCursos() {
    try {
        const consulta = {
            text: `SELECT * FROM cursos;`,
            values: [],
        }
        const result = await pool.query(consulta)
        return result.rows;
    } catch (e) {
        return e
    }
}

async function actualizarCurso(id, nombre, nivelTecnico, fechaInicio, duracion) {
    try {
        const consulta = {
            text: `UPDATE cursos SET nombre = $2, nivel = $3, fecha = $4, duracion = $5 WHERE id = $1 RETURNING *`,
            values: [id, nombre, nivelTecnico, fechaInicio, duracion],
        }
        const result = await pool.query(consulta)
        return result.rows
    } catch (e) {
        return e;
    }
}

async function eliminarCurso(id) {
    try {
        const consulta = {
            text:`DELETE FROM cursos WHERE id = $1`,
            values: [id],
        }
        const result = await pool.query(consulta)
        return result.rows;
    } catch (e) {
        return e;
    }
}
module.exports = { nuevoCurso, verCursos, actualizarCurso, eliminarCurso }