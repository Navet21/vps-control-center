FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./

COPY apps/api/package*.json ./apps/api/

RUN npm install

COPY . .

RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

RUN npm run build --workspace api

WORKDIR /app/apps/api

EXPOSE 3000

CMD ["node", "dist/src/main.js"]