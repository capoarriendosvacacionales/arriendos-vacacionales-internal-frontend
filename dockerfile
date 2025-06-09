# Etapa de construcción
FROM node:24.1.0-slim AS builder

WORKDIR /app

# Copia los archivos necesarios e instala dependencias
COPY package.json package-lock.json ./
RUN npm ci

# Copia el resto de los archivos y construye el proyecto
COPY . .
RUN npm run build

# Etapa de servidor con serve
FROM node:24.1.0-slim

# Instala serve globalmente
RUN npm install -g serve

# Copia los archivos de construcción de Vue a la carpeta /app
COPY --from=builder /app/dist /app

EXPOSE 8080

# Usa serve para servir el contenido
CMD ["serve", "-s", "/app", "-l", "8080"]
