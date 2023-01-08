from node:alpine

workdir /app
copy . .

run [ "corepack", "enable" ]
run [ "corepack", "prepare", "pnpm@latest", "--activate" ]

run [ "pnpm", "install" ]
run [ "pnpm", "build" ]

entrypoint [ "node" ]
cmd [ "/app/.output/server/index.mjs" ]
