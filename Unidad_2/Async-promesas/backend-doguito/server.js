import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./conexion.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



//GET listar
app.get("/clientes", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM clientes");
        res.json(rows);
    } catch (error) {
        console.error("Error al listar clientes:", error);
        res.status(500).json({ error: "Error al listar clientes" });
    }
});

//GET por id
app.get("/clientes/:id", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM clientes WHERE id = ?", [req.params.id]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Cliente no encontrado" });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error("Error al obtener cliente:", error);
        res.status(500).json({ error: "Error al obtener cliente" });
    }
});

//POST crear
app.post("/clientes", async (req, res) => {
    try {
        const { id, nombre, email } = req.body;
        await pool.query("INSERT INTO clientes (id, nombre, email) VALUES (?, ?, ?)", [id, nombre, email]);
        res.status(201).json({ id, nombre, email });
    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).json({ error: "Error al crear cliente" });
    }
});

//PUT actualizar
app.put("/clientes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email } = req.body;
        await pool.query("UPDATE clientes SET nombre = ?, email = ? WHERE id = ?", [nombre, email, id]);
        res.status(200).json({ id, nombre, email });
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        res.status(500).json({ error: "Error al actualizar cliente" });
    }
});

//DELETE eliminar
app.delete("/clientes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM clientes WHERE id = ?", [id]);
        res.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        res.status(500).json({ error: "Error al eliminar cliente" });
    }
});


//GET listar productos
app.get("/productos", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM productos");
        res.json(rows);
    } catch (error) {
        console.error("Error al listar productos:", error);
        res.status(500).json({ error: "Error al listar productos" });
    }
});

//GET producto por id
app.get("/productos/:id", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [req.params.id]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error("Error al obtener producto:", error);
        res.status(500).json({ error: "Error al obtener producto" });
    }
});

//POST crear producto
app.post("/productos", async (req, res) => {
    try {
        const { id, nombre, precio, description } = req.body;
        await pool.query("INSERT INTO productos (id, nombre, precio, description) VALUES (?, ?, ?, ?)", [id, nombre, precio, description]);
        res.status(201).json({ id, nombre, precio, description });
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error al crear producto" });
    }
});

//PUT actualizar producto
app.put("/productos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, description } = req.body;
        await pool.query("UPDATE productos SET nombre = ?, precio = ?, description = ? WHERE id = ?", [nombre, precio, description, id]);
        res.status(200).json({ id, nombre, precio, description });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error al actualizar producto" });
    }
});

//DELETE eliminar producto
app.delete("/productos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM productos WHERE id = ?", [id]);
        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
});


//GET 
app.get("/mascotas", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM mascotas");
        res.json(rows);
    } catch (error) {
        console.error("Error al listar mascotas:", error);
        res.status(500).json({ error: "Error al listar mascotas" });
    }
});

//GET 
app.get("/mascotas/:id", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM mascotas WHERE id = ?", [req.params.id]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Mascota no encontrada" });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error("Error al obtener mascota:", error);
        res.status(500).json({ error: "Error al obtener mascota" });
    }
});

//POST crear mascota
app.post("/mascotas", async (req, res) => {
    try {
        const { id, nombre, tipo, raza, edad, dueno } = req.body;
        await pool.query("INSERT INTO mascotas (id, nombre, tipo, raza, edad, dueno) VALUES (?, ?, ?, ?, ?, ?)", [id, nombre, tipo, raza, edad, dueno]);
        res.status(201).json({ id, nombre, tipo, raza, edad, dueno });
    } catch (error) {
        console.error("Error al crear mascota:", error);
        res.status(500).json({ error: "Error al crear mascota" });
    }
});

//PUT actualizar mascota
app.put("/mascotas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, tipo, raza, edad, dueno } = req.body;
        await pool.query("UPDATE mascotas SET nombre = ?, tipo = ?, raza = ?, edad = ?, dueno = ? WHERE id = ?", [nombre, tipo, raza, edad, dueno, id]);
        res.status(200).json({ id, nombre, tipo, raza, edad, dueno });
    } catch (error) {
        console.error("Error al actualizar mascota:", error);
        res.status(500).json({ error: "Error al actualizar mascota" });
    }
});

//DELETE eliminar mascota
app.delete("/mascotas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM mascotas WHERE id = ?", [id]);
        res.status(200).json({ message: "Mascota eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar mascota:", error);
        res.status(500).json({ error: "Error al eliminar mascota" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});