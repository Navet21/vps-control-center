FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./

COPY apps/web/package*.json ./apps/web/

RUN npm install

COPY . .

RUN npm run build --workspace web

# ------------------------------

FROM nginx:stable-alpine

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80