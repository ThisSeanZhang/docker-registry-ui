# docker-registry-ui
simple docker registry ui

# how to use
## set env
in your target dir create **.env**
```shell
# user name example: BASE_AUTH_USERNAME=username
BASE_AUTH_USERNAME=admin
BASE_AUTH_PASS=$2y$05$DsPGHuNe34kVhtyEB/k31.nrv/dVyL4I84nUKbBYGU3sL2z/2HFWO
REGISTRY_DATA_PATH=/data/registry/data
```
## compose demo
@import "docker-compose.yml"

## Option: gen auth
```shell
docker run \
  --entrypoint htpasswd \
  httpd:2 -Bbn admin password > htpasswd
```