# Etapa de construcción
FROM node:20-alpine AS build

WORKDIR /app

# Copia los archivos necesarios e instala dependencias
COPY package.json package-lock.json ./
RUN npm ci

# Copia el resto de los archivos y construye el proyecto
COPY . .
RUN npm run build

# Etapa de servidor con serve
FROM node:20-alpine

# Instala serve globalmente
RUN npm install -g serve

# Copia los archivos de construcción de Vue a la carpeta /app
COPY --from=build /app/dist /app

EXPOSE 8080

# Usa serve para servir el contenido en modo no SPA (-s está desactivado)
CMD ["serve", "/app", "-l", "8080"]
