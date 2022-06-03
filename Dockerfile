FROM node:16-slim as build
WORKDIR /opt/build
COPY src /opt/build/src
COPY config /opt/build/config
COPY package.json .npmrc .yarnrc yarn.lock nodemon.json /opt/build/
RUN yarn
RUN rm -f /opt/build/.npmrc

FROM node:16-slim as final

ENV PORT 9090
WORKDIR /opt/app
ENV NODE_ENV production

COPY --from=build /opt/build /opt/app
ADD .env.* /opt/app/
EXPOSE $PORT
HEALTHCHECK CMD curl --fail http://localhost:$PORT/health || exit 1
ENTRYPOINT [ "npm", "start" ]
