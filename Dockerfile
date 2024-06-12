FROM node:18-alpine as build
WORKDIR /app
COPY ./package*.json .
RUN npm ci
COPY .git/ ./.git/
COPY . ./
RUN npm run build

FROM nginx:1.24-alpine AS ngi
RUN rm -rf /usr/share/nginx/html/*
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
