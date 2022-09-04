# Multi stage building strategy for reducing image size.
FROM golang:1.19.0-alpine3.16 AS build-env
ENV GO111MODULE=on
RUN mkdir /app

# Use "Ultimate Packer for eXecutables". ref: https://upx.github.io/
RUN apk add --no-cache --virtual .go-builddeps git gcc make build-base alpine-sdk upx
ADD . /app
WORKDIR /app    
RUN go install honnef.co/go/tools/cmd/staticcheck@latest && \
    go install github.com/pwaller/goupx && \
    go mod tidy && \
    make validate && \
    make build-linux && \
    goupx main

# If use TLS connection in container, add ca-certificates following command.
# > RUN apk add --no-cache ca-certificates
FROM alpine:3.16.2
RUN mkdir /app && \
    apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
WORKDIR /app
COPY --from=build-env /app/main /app
EXPOSE 80
ENTRYPOINT ["/app/main"]
