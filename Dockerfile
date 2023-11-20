# see https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG NODE_VERSION=node:21

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
COPY ./ .
RUN yarn build

FROM $NODE_VERSION AS production

COPY --from=production-base /app/ /app/

# Service hostname
ENV NUXT_HOST=0.0.0.0
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
# Service version
ARG NUXT_APP_VERSION
ENV NUXT_APP_VERSION=${NUXT_APP_VERSION}

ENV DATABASE_URL=file:./db.sqlite

# Run in production mode
ENV NODE_ENV=production

# start the app
WORKDIR /app
CMD yarn start
