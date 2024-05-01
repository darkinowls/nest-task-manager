FROM node:20.12.1-alpine3.19 as build

WORKDIR /app

COPY . .

RUN rm -rf node_modules
RUN rm -rf .next

RUN npx pnpm install

RUN npx pnpm build


FROM node:20.12.1-alpine3.19

WORKDIR /app

COPY --from=build /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY ./wait_for.sh ./wait_for.sh

RUN chmod 777 ./wait_for.sh
RUN chmod 777 ./server.js

ENV NODE_ENV production
