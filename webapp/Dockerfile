FROM node:16.14-alpine3.15 AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN apk add --update --no-cache --virtual build-deps \
    python3 \
    g++ \
    git \
    libtool \
    automake \
    autoconf
RUN apk add --upgrade --no-cache vips-dev build-base --repository https://alpine.global.ssl.fastly.net/alpine/v3.16/community/

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:16.14-alpine3.15 as node_modules

WORKDIR /app
RUN apk add --update --no-cache --virtual build-deps \
    python3 \
    g++ \
    git \
    libtool \
    automake \
    autoconf
RUN apk add --upgrade --no-cache vips-dev build-base --repository https://alpine.global.ssl.fastly.net/alpine/v3.16/community/

COPY package.json package-lock.json ./
## prismaの起動でprisma generateの結果node_modulesに出力される定義が必要
#RUN mkdir ./db
#COPY --from=build /app/db ./db/

RUN npm ci --only=production
#    && npx blitz prisma generate

FROM node:16.14-alpine3.15
WORKDIR /app

RUN apk add --no-cache curl tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata

COPY --from=node_modules /app/node_modules /app/node_modules
COPY --from=builder /app/.next /app/.next/
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/.blitz.config.compiled.js /app/
COPY --from=builder /app/public /app/public
COPY --from=builder /app/core.json /app/core.json

# blitzのanonymous session cookieで利用
ENV SESSION_SECRET_KEY "QFNhN4R6SJfd5SwZAWixghK5D6eYmnd8"

ENV PORT 80
EXPOSE 80

CMD [ "npm","run","start:prd" ]
# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl
