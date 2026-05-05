-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS web_2;
USE web_2;

-- Tabla clientes
CREATE TABLE IF NOT EXISTS clientes (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Tabla productos
CREATE TABLE IF NOT EXISTS productos (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio VARCHAR(20),
    description TEXT
);

-- Tabla mascotas
CREATE TABLE IF NOT EXISTS mascotas (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50),
    raza VARCHAR(50),
    edad VARCHAR(10),
    dueno VARCHAR(100)
);
