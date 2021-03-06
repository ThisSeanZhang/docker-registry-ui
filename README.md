
# docker-registry-ui[![Build Status](https://drone.whileaway.io/api/badges/ThisSeanZhang/docker-registry-ui/status.svg)](https://drone.whileaway.io/ThisSeanZhang/docker-registry-ui)
simple docker registry ui

# how to use
## set env
in your target dir create **.env**
```shell
# user name example: BASE_AUTH_USERNAME=username
BASE_AUTH_USERNAME=admin
BASE_AUTH_PASS=$2y$05$DsPGHuNe34kVhtyEB/k31.nrv/dVyL4I84nUKbBYGU3sL2z/2HFWO
REGISTRY_DATA_PATH=/data/registry/data
REGISTRY_HOST=
```
## compose demo
```yaml
version: '3.5'

services:
  docker_registry_ui:
    image: thisseanzhang/docker-registry-ui:latest
    restart: always
    container_name: docker_registry_ui 
    hostname: docker_registry_ui
    networks:
      - main_net
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.registry-ui.tls=true"
      - "traefik.http.routers.registry-ui.tls.certresolver=tls"
      - "traefik.http.routers.registry-ui.entrypoints=websecure"
      - "traefik.http.routers.registry-ui.rule=Host(`${REGISTRY_HOST}`)"
      - "traefik.http.routers.registry-ui.service=registry-ui"
      - "traefik.http.services.registry-ui.loadbalancer.server.port=8989"
      - "traefik.http.routers.registry-ui.middlewares=registry"
  docker_registry:
    image: registry:2
    restart: always
    container_name: docker_registry 
    hostname: docker_registry
    networks:
      - main_net
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.registry.tls=true"
      - "traefik.http.routers.registry.tls.certresolver=tls"
      - "traefik.http.routers.registry.entrypoints=websecure"
      - "traefik.http.routers.registry.rule=Host(`${REGISTRY_HOST}`) && PathPrefix(`/v2`)"
      - "traefik.http.routers.registry.service=registry"
      - "traefik.http.services.registry.loadbalancer.server.port=5000"
      - "traefik.http.routers.registry.middlewares=registry"
      - "traefik.http.middlewares.registry.basicauth.realm=MyRealm"
      - "traefik.http.middlewares.registry.basicauth.headerField=WWW-Authenticate"
      - "traefik.http.middlewares.registry.basicauth.users=${BASE_AUTH_USERNAME:-admin}:${BASE_AUTH_PASS:-$2y$05$DsPGHuNe34kVhtyEB/k31.nrv/dVyL4I84nUKbBYGU3sL2z/2HFWO}"
    volumes:
      - ${REGISTRY_DATA_PATH:-/data/registry}/data:/var/lib/registry
networks:
  main_net:
    external: true
```

## Option: gen auth
```shell
docker run \
  --entrypoint htpasswd \
  httpd:2 -Bbn admin password > htpasswd
```