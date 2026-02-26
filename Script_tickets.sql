DROP DATABASE IF EXISTS sistema_tickets_db;
CREATE DATABASE sistema_tickets_db;
USE sistema_tickets_db;

-- 1. TABLA USUARIOS 
CREATE TABLE usuarios (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    apellido VARCHAR(20),
    email VARCHAR(30),
    password VARCHAR(20)
);

-- 2. TABLA CLIENTES
CREATE TABLE clientes (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    apellido VARCHAR(10),
    cedula VARCHAR(11),
    fecha_nacimiento VARCHAR(20),
    ciudad VARCHAR(10),
    direccion VARCHAR(10), -- Máximo 10 caracteres permitidos
    telefono VARCHAR(20),
    email VARCHAR(20),
    dependencia VARCHAR(20)
);

-- 3. TABLA TÉCNICOS
CREATE TABLE tecnicos (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    apellido VARCHAR(10),
    cedula VARCHAR(11),
    fecha_nacimiento VARCHAR(20),
    ciudad VARCHAR(10),
    direccion VARCHAR(10), -- Máximo 10 caracteres permitidos
    telefono VARCHAR(20),
    email VARCHAR(20),
    genero VARCHAR(20)
);

-- 4. TABLA TICKETS
CREATE TABLE matriculas (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    codigo INT(11),
    descripcion VARCHAR(20),
    id_tecnico INT(11),
    id_cliente INT(11),
    FOREIGN KEY (id_tecnico) REFERENCES tecnicos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE
);

-- Usuarios
INSERT INTO usuarios (nombre, apellido, email, password) VALUES 
('Admin', 'Pruebas', 'admin@test.com', '1234'),
('Ariel', 'ESFOT', 'ariel@test.com', '1234');
