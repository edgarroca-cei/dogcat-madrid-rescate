# DOGCAT Madrid Rescate

Web de rescate animal en Madrid. Trabajamos en la gestión de colonias felinas a través del método CER, rescate de emergencias y concienciación sobre el bienestar animal.

## Desarrollo Local

1. Instala dependencias: `npm install`
2. Ejecuta servidor de desarrollo: `npm run dev:all` (Inicia Vite en el puerto 3000 y el servidor Express/SQLite en el 3001).

## Despliegue en Hostinger (PHP + MySQL)

Para que la web sea compatible con Hostinger, se ha migrado el backend de Node.js/SQLite a PHP/MySQL.

### Instrucciones de Despliegue

1. **Crear Base de Datos MySQL**: Crea una BD y un usuario en el panel de Hostinger.
2. **Configurar API**: Edita `api/config.php` y rellena las credenciales de tu base de datos.
3. **Subir archivos**: Sube el contenido de la carpeta `dist/`, la carpeta `api/`, la carpeta `uploads/` y el archivo `.htaccess` al `public_html` de tu hosting.
4. **Instalar Tablas**: Visita `https://tudominio.com/api/install.php` para crear automáticamente las tablas necesarias.
5. **Seguridad**: Elimina `api/install.php` una vez terminada la instalación de las tablas.

Para una guía más detallada, consulta el archivo `walkthrough.md` en la carpeta `.gemini/antigravity/brain/`.
