FROM python:3.5-stretch AS test
RUN apt update && apt install -y gnupg openjdk-8-jre
RUN pip install 'html5validator ~= 0.3.1'
RUN gpg --recv-keys A3E0EF6CECB33C342AA6EC7C5508153A6E7FC5FB
WORKDIR david.tucker.name
COPY . .
RUN gpg --verify index.html.asc index.html
RUN html5validator --show-warnings --match index.html --root .

FROM httpd:2.4
COPY --from=test david.tucker.name/* /usr/local/apache2/htdocs/
