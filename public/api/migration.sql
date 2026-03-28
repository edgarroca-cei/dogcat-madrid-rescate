-- Script de creación de tablas para Hostinger MySQL
-- Ejecutar este contenido en la pestaña "SQL" de phpMyAdmin

-- Tabla de Blog Posts
CREATE TABLE IF NOT EXISTS posts (
    id VARCHAR(50) PRIMARY KEY,
    title TEXT,
    slug VARCHAR(100),
    excerpt TEXT,
    content LONGTEXT,
    image TEXT,
    color VARCHAR(100),
    date VARCHAR(20),
    author VARCHAR(100),
    createdAt VARCHAR(50),
    isExternal TINYINT(1) DEFAULT 0,
    externalUrl TEXT DEFAULT NULL,
    sourceName VARCHAR(100) DEFAULT NULL,
    fontSize VARCHAR(50) DEFAULT 'normal'
);

-- Tabla de Contenido Variable (Textos de la web)
CREATE TABLE IF NOT EXISTS site_content (
    id VARCHAR(50) PRIMARY KEY,
    content LONGTEXT,
    updatedAt VARCHAR(50)
);

-- Tabla de Mapas Interactivos
CREATE TABLE IF NOT EXISTS mapas (
    id VARCHAR(50) PRIMARY KEY,
    title TEXT,
    mid TEXT,
    description TEXT,
    icon VARCHAR(50),
    `order` INT DEFAULT 0,
    createdAt VARCHAR(50)
);

-- Tabla de Ajustes (PayPal, Bizum, etc)
CREATE TABLE IF NOT EXISTS settings (
    id VARCHAR(50) PRIMARY KEY,
    paypalLink TEXT,
    bizumNumber VARCHAR(20),
    bizumConcept TEXT,
    updatedAt VARCHAR(50)
);

-- Insertar configuración inicial de donaciones si no existe
INSERT IGNORE INTO settings (id, paypalLink, bizumNumber, bizumConcept, updatedAt) 
VALUES ('donations', 'https://paypal.me/dogcatmadrid', '', 'Donativo DOGCAT', NOW());
