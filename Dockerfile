FROM bitnami/nginx:latest

WORKDIR /app
COPY dist /app
COPY ui-nginx.conf /opt/bitnami/nginx/conf/server_blocks
EXPOSE 8989
ENTRYPOINT nginx -g "daemon off;"