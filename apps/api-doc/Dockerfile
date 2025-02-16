FROM node:20.12.2-slim AS base
RUN apt-get update && apt-get install -y curl
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# https://github.com/nodejs/corepack/issues/612
RUN corepack prepare pnpm@8.9.0 --activate
COPY . /app
WORKDIR /app

FROM base AS runtime
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
CMD ["pnpm", "run", "start"]

