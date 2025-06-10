# Etapa de construcción
FROM node:24.1.0-slim AS builder

WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package.json package-lock.json ./

# Para el build de Vite necesitamos devDependencies (vite, plugins, etc.).
# Aseguramos que NODE_ENV=development para instalar devDependencies.
ENV NODE_ENV=development
RUN npm ci

# Copiamos el resto del código, incluidos .env.development y .env.production
COPY . .

# Argumento para indicar el modo de Vite: "development" o "production"
ARG BUILD_MODE=production
# Si quieres que Vite lea .env.<mode>, es decir .env.production o .env.development
# Invocamos el build con el modo indicado.
RUN npm run build -- --mode $BUILD_MODE

# Etapa de ejecución: sirve los archivos estáticos con 'serve'
FROM node:24.1.0-slim

RUN npm install -g serve

WORKDIR /app
# Copiamos sólo la carpeta dist generada
COPY --from=builder /app/dist /app

EXPOSE 8080
CMD ["serve", "-s", "/app", "-l", "8080"]
