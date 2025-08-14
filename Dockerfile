FROM node:20.19.0-slim AS base
WORKDIR /app
COPY .env.production .env.production
COPY public public
COPY src src
COPY package.json package-lock.json* ./
COPY tsconfig.json tsconfig.json
COPY .eslintrc.js .eslintrc.js
COPY .prettierrc .prettierrc

FROM base AS dependencies
RUN npm config set registry https://srvverdaccio.int.cagece.com.br/
RUN npm i

FROM dependencies as build
ARG BUILD_NUMBER
RUN sed -i "s/BUILD_NUMBER/$BUILD_NUMBER/" /app/package.json
RUN npm run build --prod

# Subir para produção usando o nginx
FROM nginx:stable
WORKDIR /etc/nginx
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf .
COPY --from=build /app/build /usr/share/nginx/html/nomesistema-fe

EXPOSE 80
STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
