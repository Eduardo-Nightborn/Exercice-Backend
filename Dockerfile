# syntax=docker/dockerfile:1

ARG NODE_VERSION=18

################################################################################
# Base stage for all subsequent stages, with Node.js and working directory set up.
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

################################################################################
# Dependencies stage for installing production dependencies.
# This stage is only relevant for preparing the production build.
FROM base as deps
# Install production dependencies only.
COPY yarn.lock package.json ./
RUN yarn install --production --frozen-lockfile

################################################################################
# Build stage for compiling the application.
FROM base as build
# Install all dependencies (including dev) for the build process.
COPY yarn.lock package.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build

################################################################################
# Migration stage to run database migrations.
FROM build as migration
CMD ["yarn", "db:migrate:up"]

################################################################################
# Development stage for setting up a local development environment.
FROM base as development
# Install all dependencies (including dev).
# This ensures that development dependencies are available for this stage.
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
# Copy all source files into the image.
COPY . .
# Expose the port for the development server.
EXPOSE 4000
EXPOSE 9229
# Command to start the development server, change as per your package.json scripts.
CMD ["yarn", "start:dev"]

################################################################################
# Final stage for running the application with minimal runtime dependencies.
FROM base as final
ENV NODE_ENV=production
USER node
COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/src/graphql/schema.graphql ./dist/graphql/schema.graphql
EXPOSE 4000
CMD ["yarn", "start"]
