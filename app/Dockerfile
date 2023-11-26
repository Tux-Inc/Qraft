# see https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG NODE_VERSION=node:21-alpine3.17

FROM $NODE_VERSION AS dependency-base

# create destination directory
RUN mkdir -p /app
WORKDIR /app

# copy the app, note .dockerignore
COPY ./ /app
RUN yarn install

FROM dependency-base AS production-base

# build will also take care of building
# if necessary
COPY . .
RUN yarn build

FROM $NODE_VERSION AS production

COPY --from=production-base /app/.output /app/.output

# Service hostname
ENV NUXT_HOST=0.0.0.0

# Kubernetes API Node flag
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Service version
ARG NUXT_APP_VERSION
ENV NUXT_APP_VERSION=${NUXT_APP_VERSION}

ENV DATABASE_URL=file:./db.sqlite

ENV COOKIE_SECRET=secret
ENV COOKIE_NAME=session
ENV COOKIE_EXPIRES=604800000


# Run in production mode
ENV NODE_ENV=production

# start the app
CMD [ "node", "/app/.output/server/index.mjs" ]
