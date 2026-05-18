CREATE DATABASE IF NOT EXISTS sala_de_cine;
USE sala_de_cine;

CREATE TABLE IF NOT EXISTS Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS Salas (
    id_sala INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    capacidad INT NOT NULL,
    tipo VARCHAR(50) DEFAULT 'Estándar', 
    precio_base DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS Peliculas (
    id_pelicula INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    sinopsis TEXT,
    duracion_minutos INT,
    clasificacion VARCHAR(10),
    poster_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Cartelera (
    id_funcion INT AUTO_INCREMENT PRIMARY KEY,
    id_pelicula INT,
    id_sala INT,
    fecha_hora DATETIME NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pelicula) REFERENCES Peliculas(id_pelicula) ON DELETE CASCADE,
    FOREIGN KEY (id_sala) REFERENCES Salas(id_sala) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Boletos (
    id_boleto INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_funcion INT,
    numero_butaca INT,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente) ON DELETE CASCADE,
    FOREIGN KEY (id_funcion) REFERENCES Cartelera(id_funcion) ON DELETE CASCADE
);

-- Insertar datos de prueba iniciales
INSERT INTO Salas (nombre, capacidad, tipo, precio_base) VALUES 
('Sala 1 2D', 50, 'Estándar', 35.00),
('Sala 2 3D', 40, '3D', 45.00),
('Sala VIP', 20, 'VIP', 60.00);

INSERT INTO Peliculas (titulo, sinopsis, duracion_minutos, clasificacion) VALUES
('Avengers: Secret Wars', 'Los Vengadores regresan...', 150, 'B15'),
('Toy Story 5', 'Los juguetes en una nueva aventura', 100, 'AA'),
('El Señor de los Anillos: La Guerra de los Rohirrim', 'Anime basado en ESDLA', 130, 'B');

INSERT INTO Cartelera (id_pelicula, id_sala, fecha_hora, precio) VALUES
(1, 1, '2026-05-20 18:00:00', 35.00),
(1, 2, '2026-05-20 20:30:00', 45.00),
(2, 1, '2026-05-21 16:00:00', 35.00),
(3, 1, '2026-05-21 14:00:00', 35.00);

