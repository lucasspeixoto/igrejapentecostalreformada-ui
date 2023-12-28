FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run generate


FROM nginx:1.21.5-alpine
COPY --from=build /app/out /usr/share/nginx/html
COPY dev.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]