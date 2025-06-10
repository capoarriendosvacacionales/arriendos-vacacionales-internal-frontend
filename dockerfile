# Etapa de construcción
FROM node:24.1.0-slim AS builder

# Argumento para seleccionar el modo: "development" o "production"
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Instala dependencias
COPY package.json package-lock.json ./
RUN npm ci

# Copia todo el código, incluyendo .env.development y .env.production
COPY . .

# Ejecuta build de Vite pasando el modo
# Vite cargará automáticamente .env, .env.local, .env.<mode>, etc.
RUN npm run build -- --mode $NODE_ENV

# Etapa de ejecución: sirve los archivos estáticos con 'serve'
FROM node:24.1.0-slim

RUN npm install -g serve

WORKDIR /app
COPY --from=builder /app/dist /app

EXPOSE 8080
CMD ["serve", "-s", "/app", "-l", "8080"]
