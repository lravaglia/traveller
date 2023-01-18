FROM node:alpine

WORKDIR /app
COPY . .

RUN [ "corepack", "enable" ]
RUN [ "corepack", "prepare", "pnpm@latest", "--activate" ]

RUN [ "pnpm", "install" ]

ENV SUPABASE_URL ""
ENV SUPABASE_KEY ""

ENTRYPOINT [ "sh" ]
CMD [ "/app/entrypoint.sh" ]
