FROM bitnami/nginx:latest

WORKDIR /app
COPY dist /app

ENTRYPOINT nginx -g "daemon off;"