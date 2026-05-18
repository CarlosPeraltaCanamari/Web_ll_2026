import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./conexion.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/peliculas", async (_req, res) => {
    try {
        const [rows] = await pool.query("SELECT id_pelicula, titulo FROM Peliculas ORDER BY titulo");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener películas" });
    }
});

app.get("/salas", async (_req, res) => {
    try {
        const [rows] = await pool.query("SELECT id_sala, nombre, capacidad FROM Salas ORDER BY id_sala");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener salas" });
    }
});

app.get("/funciones", async (req, res) => {
    const { id_pelicula, id_sala } = req.query;
    try {
        let sql = `
            SELECT c.id_funcion, c.id_pelicula, c.id_sala, c.fecha_hora, c.precio,
                   p.titulo, s.nombre AS sala
            FROM Cartelera c
            INNER JOIN Peliculas p ON p.id_pelicula = c.id_pelicula
            INNER JOIN Salas s ON s.id_sala = c.id_sala
            WHERE 1=1
        `;
        const params = [];

        if (id_pelicula) {
            sql += " AND c.id_pelicula = ?";
            params.push(Number(id_pelicula));
        }
        if (id_sala) {
            sql += " AND c.id_sala = ?";
            params.push(Number(id_sala));
        }

        sql += " ORDER BY c.fecha_hora";
        const [rows] = await pool.query(sql, params);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener funciones" });
    }
});

app.get("/butacas-disponibles", async (req, res) => {
    const idFuncion = Number(req.query.id_funcion);
    if (!idFuncion) {
        return res.status(400).json({ message: "id_funcion es requerido" });
    }

    try {
        const [funcionRows] = await pool.query(
            `
                SELECT c.id_funcion, s.capacidad
                FROM Cartelera c
                INNER JOIN Salas s ON s.id_sala = c.id_sala
                WHERE c.id_funcion = ?
            `,
            [idFuncion]
        );

        if (funcionRows.length === 0) {
            return res.status(404).json({ message: "Función no encontrada" });
        }

        const capacidad = Number(funcionRows[0].capacidad);
        const [ocupadasRows] = await pool.query(
            "SELECT numero_butaca FROM Boletos WHERE id_funcion = ?",
            [idFuncion]
        );

        const ocupadas = new Set(ocupadasRows.map((row) => Number(row.numero_butaca)));
        const disponibles = [];
        for (let i = 1; i <= capacidad; i += 1) {
            if (!ocupadas.has(i)) {
                disponibles.push(i);
            }
        }

        return res.json(disponibles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener butacas disponibles" });
    }
});

app.get("/clientes", async (_req, res) => {
    try {
        const [rows] = await pool.query("SELECT id_cliente, nombre, correo, telefono FROM Clientes ORDER BY id_cliente DESC");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener clientes" });
    }
});

app.post("/clientes", async (req, res) => {
    const { nombre, correo, telefono } = req.body;
    if (!nombre || !correo || !telefono) {
        return res.status(400).json({ message: "Nombre, correo y teléfono son requeridos" });
    }

    try {
        const [result] = await pool.query(
            "INSERT INTO Clientes (nombre, correo, telefono) VALUES (?, ?, ?)",
            [nombre, correo, telefono]
        );
        return res.status(201).json({ id_cliente: result.insertId, nombre, correo, telefono });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear cliente" });
    }
});

app.post("/compra-boletos", async (req, res) => {
    const { id_cliente, id_funcion, numero_butaca, precio } = req.body;

    if (!id_cliente || !id_funcion || !numero_butaca) {
        return res.status(400).json({ message: "id_cliente, id_funcion y numero_butaca son requeridos" });
    }

    try {
        const [funcionRows] = await pool.query(
            `
                SELECT c.id_funcion, c.precio, s.capacidad
                FROM Cartelera c
                INNER JOIN Salas s ON s.id_sala = c.id_sala
                WHERE c.id_funcion = ?
            `,
            [Number(id_funcion)]
        );

        if (funcionRows.length === 0) {
            return res.status(404).json({ message: "La función no existe" });
        }

        const capacidad = Number(funcionRows[0].capacidad);
        const butaca = Number(numero_butaca);
        if (butaca < 1 || butaca > capacidad) {
            return res.status(400).json({ message: "Número de butaca fuera de rango" });
        }

        const [clienteRows] = await pool.query(
            "SELECT id_cliente FROM Clientes WHERE id_cliente = ?",
            [Number(id_cliente)]
        );
        if (clienteRows.length === 0) {
            return res.status(404).json({ message: "El cliente no existe" });
        }

        const [ocupadaRows] = await pool.query(
            "SELECT id_boleto FROM Boletos WHERE id_funcion = ? AND numero_butaca = ?",
            [Number(id_funcion), butaca]
        );
        if (ocupadaRows.length > 0) {
            return res.status(409).json({ message: "La butaca ya está ocupada para esta función" });
        }

        const precioFinal = Number(precio ?? funcionRows[0].precio);
        await pool.query(
            "INSERT INTO Boletos (id_cliente, id_funcion, numero_butaca, precio) VALUES (?, ?, ?, ?)",
            [Number(id_cliente), Number(id_funcion), butaca, precioFinal]
        );

        return res.status(201).json({ message: "Boleto comprado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al comprar el boleto" });
    }
});

app.listen(Number(process.env.PORT), () => {
    console.log("Servidor corriendo en el puerto", process.env.PORT);
});
