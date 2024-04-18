FROM docker.io/bitnami/postgresql:15
ENV ALLOW_EMPTY_PASSWORD yes
ENV POSTGRESQL_USERNAME postgres
ENV POSTGRESQL_DATABASE postgres
COPY scripts/init.sql /docker-entrypoint-initdb.d/
EXPOSE 5432