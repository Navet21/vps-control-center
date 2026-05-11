FROM node:20-alpine

WORKDIR /app

# Dependencias necesarias
RUN apk add --no-cache \
    openssl \
    docker-cli

# Package root
COPY package*.json ./

# Package backend workspace
COPY apps/api/package*.json ./apps/api/

# Instalar dependencias
RUN npm install

# Copiar proyecto completo
COPY . .

# Generar prisma client
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# Build backend
RUN npm run build --workspace api

# Entrar al workspace backend
WORKDIR /app/apps/api

EXPOSE 3000

CMD ["node", "dist/src/main.js"]