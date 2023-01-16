FROM node:alpine

WORKDIR /app
COPY . .

RUN [ "corepack", "enable" ]
RUN [ "corepack", "prepare", "pnpm@latest", "--activate" ]

RUN [ "pnpm", "install" ]
RUN [ "pnpm", "build" ]

ENV SUPABASE_URL
ENV SUPABASE_KEY

ENTRYPOINT [ "node" ]
CMD [ "/app/.output/server/index.mjs" ]
