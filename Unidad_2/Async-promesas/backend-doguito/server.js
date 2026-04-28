import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./conexion.js";
import { a } from "framer-motion/client";

dotenv.config();

const app = express(); //Llamadas a express en variable
app.use(cors()); //Uso en cors
app.use(express.json()); //Uso de json

//GET listar
app.get("/clientes", async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM clientes");
        res.json(rows);
    } catch (error) {
        console.error("Error al listar clientes:", error);
        res.status(500).json({ error: "Error al listar clientes" });
    }
});

//Get por id
app.get("/clientes/:id", async (req, res) => {
    try{
        const {rows} = await pool.query("SELECT * FROM clientes WHERE id = ?", [req.params.id]);
        if(rows.length === 0){
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
    try{
        const {id, nombre, email} = req.body;
        await pool.query("INSERT INTO clientes (id, nombre, email) VALUES (?, ?, ?)", [id, nombre, email]);
        res.status(201).json({ id, nombre, email });
    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).json({ error: "Error al crear cliente" });
    }
});

//PUT actualizar
app.put("/clientes/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const {nombre, email} = req.body;
        await pool.query("UPDATE clientes SET nombre = ?, email = ? WHERE id = ?", [nombre, email, id]);
        res.status(200).json({ id, nombre, email });
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        res.status(500).json({ error: "Error al actualizar cliente" });
    }
});

//DELETE eliminar
app.delete("/clientes/:id", async (req, res) => {
    try{
        const {id} = req.params;
        await pool.query("DELETE FROM clientes WHERE id = ?", [id]);
        res.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        res.status(500).json({ error: "Error al eliminar cliente" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});