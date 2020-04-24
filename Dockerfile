FROM node:14-slim

ENV PORT 9090
ENV BUILD_PATH /opt/app
ENV NODE_ENV production
ENV ENABLE_LOGGING true

RUN mkdir -p $BUILD_PATH
WORKDIR $BUILD_PATH

ADD ./ $BUILD_PATH

EXPOSE $PORT

HEALTHCHECK CMD curl --fail http://localhost:$PORT/health || exit 1

ENTRYPOINT [ "npm", "start" ]
