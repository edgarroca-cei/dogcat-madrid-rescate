# Usar una imagen de Node moderna que tenga GLIBC actualizado
FROM node:20-bookworm-slim

# Instalar dependencias necesarias para compilar módulos nativos si fuera necesario
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (esto compilará sqlite3 y oxide para el OS correcto)
RUN npm install

# Copiar el resto del código
COPY . .

# Construir el frontend (Vite)
RUN npm run build

# Exponer el puerto del servidor (Render lo detectará)
EXPOSE 3001

# Comando para iniciar el servidor de Node
CMD ["npm", "run", "server"]
