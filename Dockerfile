FROM node:20 AS build
WORKDIR /app

RUN apt-get update && apt-get install -y curl && apt-get install -y jq

ARG BRANCH
ARG VAULT_TOKEN
ENV BRANCH=$BRANCH
ENV VAULT_TOKEN=$VAULT_TOKEN

RUN echo "BRANCH: ${BRANCH}"


COPY package*.json ./

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
RUN /entrypoint.sh

COPY . .
RUN npm run build

FROM nginx:1.25.3-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

