# Use official MongoDB image
FROM mongo:6.0

# Define build-time arguments (optional, overridden by ENV at runtime)
ARG MONGO_USER=admin
ARG MONGO_PASSWORD=secret
ARG MONGO_DB=mydatabase

# Set environment variables (use ARG as default if not provided by Docker Compose)
ENV MONGO_INITDB_ROOT_USERNAME=${MONGO_USER}
ENV MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD}
ENV MONGO_INITDB_DATABASE=${MONGO_DB}

# Copy any initialization scripts
COPY ./mongodb/init-db.js /docker-entrypoint-initdb.d/

# Expose MongoDB default port
EXPOSE 27017

# Start MongoDB
CMD ["mongod"]
