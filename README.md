# david.tucker.name

The Personal Website of David Tucker

[![Build Status](https://img.shields.io/travis/dmtucker/dmtucker.github.io.svg)](https://travis-ci.org/dmtucker/dmtucker.github.io) [![Docker Build Status](https://img.shields.io/docker/build/dmtucker/dmtucker.github.io.svg)](https://hub.docker.com/r/dmtucker/dmtucker.github.io/)

## Deployment

``` sh
docker run -p 80:80 dmtucker/dmtucker.github.io:latest
# http://localhost/
```

## Development

``` sh
docker run -p 8008:80 -v "$PWD:/usr/local/apache2/htdocs" httpd:latest
# http://localhost:8008/
```
