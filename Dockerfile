FROM node:14
RUN rm -rf .env
COPY ./ /app

WORKDIR /app
RUN npm install
WORKDIR /app
ARG ENV_MODE
RUN echo "npm run build --mode=${ENV_MODE}"
ARG ENV_MODE
RUN npm run build --mode=${ENV_MODE}
FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY docker-config/nginx.conf /etc/nginx/nginx.conf