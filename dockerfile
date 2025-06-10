# Dockerfile (ubicado en internal-frontend/Dockerfile)
# Stage "deps": instala dependencias incluidas devDependencies
FROM node:24.1.0-slim AS deps
WORKDIR /app
# Copiamos package.json para que npm ci instale devDependencies
COPY package.json package-lock.json ./
RUN npm ci

# Stage "dev": para desarrollo, arranca vite dev y monta código
FROM node:24.1.0-slim AS dev
WORKDIR /app
# Copiamos todo y reutilizamos node_modules de deps
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
# Exponemos el puerto que usa vite dev (por defecto 5173 o el que configures; ajusta si es distinto)
EXPOSE 8080
# Comando por defecto para dev; lee .env.development vía env_file en docker-compose
CMD ["npm", "run", "dev"]

# Stage "build": para producción, hace build estático
FROM node:24.1.0-slim AS builder
WORKDIR /app
# Instala deps incluidas devDependencies
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Build en modo production cargando .env.production
RUN npm run build -- --mode production

# Stage "prod": sirve estático con serve
FROM node:24.1.0-slim AS prod
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist /app
EXPOSE 8080
CMD ["serve", "-s", "/app", "-l", "8080"]
