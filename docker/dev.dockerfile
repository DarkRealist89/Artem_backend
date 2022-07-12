FROM dimon4u/node-openssl-nginx-gost:latest

ENV DB_HOST host.docker.internal
ENV DB_PORT 5434
ENV DB_USERNAME postgres
ENV DB_PASSWORD '3122750'
ENV DB_NAME test_db

ENV DEVELOPMENT true

WORKDIR /app

CMD ["sh", "-c", "nginx && npm run start:debug"]

EXPOSE 80
# node debug port
EXPOSE 9229