
Esto debe ir en el .env
```bash
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD= Tu contraseña del Workbench
DB_NAME=sistema_tickets_db

---
Scripts SQL
```bash
CREATE DATABASE sistema_tickets_db;
USE sistema_tickets_db;

ALTER TABLE usuarios 
ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

INSERT INTO usuarios (nombre, apellido, email, password) VALUES 
('Admin', 'Pruebas', 'admin@test.com', '1234'),
('Ariel', 'ESFOT', 'ariel@test.com', '1234');


