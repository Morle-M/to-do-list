FROM docker.io/bitnami/postgresql:15
ENV ALLOW_EMPTY_PASSWORD=yes
ENV POSTGRESQL_USERNAME=postgres
ENV POSTGRESQL_DATABASE=postgres

# Create a directory to mount the volume
RUN mkdir -p /docker-entrypoint-initdb.d

# Expose the volume
VOLUME /docker-entrypoint-initdb.d

EXPOSE 5432
