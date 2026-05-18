# Guía de Proyecto: Async y Promesas

Esta guía detalla los pasos necesarios para configurar y ejecutar el proyecto, incluyendo la conexión del backend con Express, la creación de la base de datos y los comandos necesarios utilizando `pnpm`.

## 🛠️ Requisitos Previos

- [Node.js](https://nodejs.org/) instalado.
- [pnpm](https://pnpm.io/es/installation) instalado (si no lo tienes, instálalo con `npm install -g pnpm`).
- Servidor de base de datos MySQL (por ejemplo, a través de XAMPP, WAMP o MySQL Server).

## 🚀 Instalación y Configuración del Backend (Express)

El backend de este proyecto se encuentra en la carpeta `backend-doguito`.

1. **Navegar a la carpeta del backend:**
   ```bash
   cd backend-doguito
   ```

2. **Instalar las dependencias:**
   Utiliza `pnpm` para instalar los paquetes definidos en el `package.json` (como Express, cors, mysql2, dotenv, etc.):
   ```bash
   pnpm install
   ```
   *Nota: Si necesitas instalar un paquete nuevo desde cero en el examen, usa: `pnpm add express mysql2 cors dotenv`*

3. **Configurar las variables de entorno:**
   Asegúrate de configurar el archivo `.env` en la carpeta `backend-doguito`. Este archivo almacena las credenciales de la base de datos de manera segura.
   
   *Ejemplo de archivo `.env`:*
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=doguito_db
   ```

##  Creación de la Base de Datos

Para que la aplicación funcione, es necesario levantar la estructura en tu servidor MySQL.

1. Abre tu gestor de base de datos (phpMyAdmin, DBeaver, MySQL Workbench, etc.).
2. Ejecuta el siguiente script SQL para crear la base de datos y las tablas base (puedes ajustar los campos según los requisitos de tu examen):

   ```sql
   -- Crear la base de datos
   CREATE DATABASE IF NOT EXISTS doguito_db;
   USE doguito_db;

   -- Crear tabla de clientes
   CREATE TABLE IF NOT EXISTS clientes (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nombre VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL UNIQUE
   );

   -- Crear tabla de mascotas (opcional según el caso práctico)
   CREATE TABLE IF NOT EXISTS mascotas (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nombre VARCHAR(100) NOT NULL,
       raza VARCHAR(50),
       cliente_id INT,
       FOREIGN KEY (cliente_id) REFERENCES clientes(id)
   );
   ```

## 🔌 Estructura de Conexión con Express (Ejemplo)

Para conectar tu API con la base de datos utilizando Promesas (como requiere la unidad), el archivo principal del servidor (ej. `index.js` o `server.js`) debe estructurarse usando `mysql2/promise` o la configuración equivalente de Sequelize.

Aquí tienes la plantilla base para levantar el servidor y conectar con MySQL usando `async/await`:

```javascript
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de la conexión a la Base de Datos
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Ejemplo de ruta GET usando Async / Await y Promesas
app.get('/api/clientes', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM clientes');
        await connection.end();
        
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
```

## ▶️ Ejecución del Proyecto

1. **Iniciar el Servidor Backend:**
   Estando en la terminal, dentro de la carpeta `backend-doguito`, ejecuta:
   ```bash
   pnpm start
   ```
   *(Asegúrate de que en tu `package.json` exista el script `"start": "node index.js"`. Si usas nodemon para el desarrollo, usa el comando correspondiente como `pnpm run dev`).*

2. **Iniciar el Frontend:**
   - Puedes abrir directamente los archivos `.html` (como `screens/registrar_cliente.html`) usando la extensión **Live Server** en VS Code.
   - En tus archivos de servicio del frontend (como `service/client-service.js`), verifica que los `fetch()` estén apuntando a la ruta de tu API local (ej: `http://localhost:3000/api/clientes`).

## 📌 Resumen Rápido de Comandos (Cheatsheet)

| Acción | Comando a utilizar |
| :--- | :--- |
| **Instalar todas las dependencias** | `pnpm install` |
| **Instalar un paquete específico** | `pnpm add <nombre_paquete>` |
| **Instalar paquete de desarrollo**| `pnpm add -D <nombre_paquete>` |
| **Iniciar la aplicación** | `pnpm start` |
| **Ejecutar script dev**| `pnpm run dev` |
| **Iniciar json-server (opcional)** | `npx json-server --watch db.json` |
| **Iniciar browser-sync (opcional)**| `npx browser-sync start --server --file . --host --port 5000` |
