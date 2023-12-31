ARG DOCKER_IMAGE=node:16-slim

# Build stage
FROM $DOCKER_IMAGE as build

ENV NODE_ENV production

WORKDIR /opt/build
COPY ./ /opt/build

RUN yarn --network-timeout 100000

RUN rm -rf /opt/build/.git
RUN rm -f /opt/build/.npmrc /opt/build/Jenkinsfile /opt/build/Dockerfile

# Runtime stage
FROM $DOCKER_IMAGE as final

ENV PORT 9090
ENV NODE_ENV production

WORKDIR /opt/app

COPY --from=build /opt/build /opt/app

EXPOSE $PORT
HEALTHCHECK CMD curl --fail http://localhost:$PORT/health || exit 1

ENTRYPOINT [ "npm", "start" ]
