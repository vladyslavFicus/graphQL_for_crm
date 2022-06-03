ARG DOCKER_IMAGE=node:16-slim

# Build stage
FROM $DOCKER_IMAGE as build

WORKDIR /opt/build
COPY ./ /opt/build

RUN yarn

RUN rm -rf /opt/build/.git
RUN rm -f /opt/build/.npmrc

# Runtime stage
FROM $DOCKER_IMAGE as final

ENV PORT 9090
ENV NODE_ENV production

COPY --from=build /opt/build /opt/app

EXPOSE $PORT
HEALTHCHECK CMD curl --fail http://localhost:$PORT/health || exit 1

ENTRYPOINT [ "npm", "start" ]
