FROM arm64v8/node:16-alpine as builder

RUN apk update && apk add openjdk11

WORKDIR /app

COPY . .

RUN yarn --network-timeout 600000 && yarn generate:prod && yarn build

# Production
FROM arm64v8/node:16-alpine as production

WORKDIR /app

RUN yarn global add serve

COPY --from=builder /app/build /app/

EXPOSE 3000

ENTRYPOINT serve -s .
