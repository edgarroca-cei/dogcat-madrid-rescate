-- Ejecutar este SQL en phpMyAdmin de Hostinger
-- Añade las columnas faltantes a la tabla posts

ALTER TABLE posts ADD COLUMN IF NOT EXISTS isExternal TINYINT(1) DEFAULT 0;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS externalUrl TEXT DEFAULT NULL;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS sourceName VARCHAR(100) DEFAULT NULL;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS fontSize VARCHAR(50) DEFAULT 'normal';

-- Si tu MySQL no soporta "IF NOT EXISTS", usa estas líneas alternativas:
-- ALTER TABLE posts ADD COLUMN isExternal TINYINT(1) DEFAULT 0;
-- ALTER TABLE posts ADD COLUMN externalUrl TEXT DEFAULT NULL;
-- ALTER TABLE posts ADD COLUMN sourceName VARCHAR(100) DEFAULT NULL;
-- ALTER TABLE posts ADD COLUMN fontSize VARCHAR(50) DEFAULT 'normal';
