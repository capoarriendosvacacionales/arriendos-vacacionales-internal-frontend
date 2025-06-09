# Etapa de construcción
FROM node:24.1.0-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Copia el resto de los archivos, incluyendo .env.production
COPY . .

# Asegúrate de que Vite construye con el modo production
RUN npm run build -- --mode production

# Etapa de ejecución
FROM node:24.1.0-slim

RUN npm install -g serve

WORKDIR /app
COPY --from=builder /app/dist /app

EXPOSE 8080
CMD ["serve", "-s", "/app", "-l", "8080"]
