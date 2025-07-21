DROP DATABASE tienda_patito;
GO

USE patito_express; -- ¡¡¡CAMBIA 'PatitoDB' por el nombre REAL de tu base de datos!!!
GO

-- Crear base de datos
CREATE DATABASE patito_express;
GO

USE patito_express;
GO

IF DB_ID('patito_express') IS NULL
BEGIN
    CREATE DATABASE patito_express
    ON (FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\patito_express.mdf')
    FOR ATTACH;
END
ELSE
BEGIN
    PRINT 'La base ya existe. Usando...';
END

USE patito_express;
GO

-- Tabla: Cliente
CREATE TABLE clientes (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20)
);
GO

-- Tabla: EstatusPedido
CREATE TABLE estatus_pedido (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL
);
GO

-- Tabla: Producto
CREATE TABLE productos (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL
);
GO

-- Tabla: Pedido
CREATE TABLE pedidos (
    id INT PRIMARY KEY IDENTITY(1,1),
    fecha DATETIME NOT NULL,
    cliente_id INT NOT NULL,
    estatus_id INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (estatus_id) REFERENCES estatus_pedido(id)
);
GO

-- Tabla: DetallePedido
CREATE TABLE detalle_pedido (
    id INT PRIMARY KEY IDENTITY(1,1),
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);
GO

CREATE USER luciano FOR LOGIN luciano;
ALTER ROLE db_owner ADD MEMBER luciano;

CREATE LOGIN luciano WITH PASSWORD = 'lucho12345';

SELECT name FROM sys.sql_logins WHERE name = 'luciano';

