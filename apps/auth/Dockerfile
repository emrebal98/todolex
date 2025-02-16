FROM node:20.12.2-slim AS base
# Install required libraries for Prisma, curl for healthcheck
RUN apt-get update && apt-get install -y openssl curl 
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# https://github.com/nodejs/corepack/issues/612
RUN corepack prepare pnpm@8.9.0 --activate
COPY . /app
WORKDIR /app

FROM base AS install
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
RUN pnpm run db:generate

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run db:generate
RUN pnpm run build

FROM base AS runtime
COPY --from=install /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
CMD ["pnpm", "run", "start:prod"]
