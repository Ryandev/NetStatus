# Stage.0 Build environment
FROM node:11.6.0-alpine as build

WORKDIR .

ENV PATH /node_modules/.bin:/usr/bin:/bin:$PATH

COPY . ./
COPY package.json ./
COPY package-lock.json ./
COPY scripts/dockerloadenv.sh /dockerloadenv.sh


# Install deps
RUN npm ci

# build website
RUN npm run build


# Stage.1 Run
FROM nginx:1.19.10-alpine as run

# Copy production environment
COPY --from=build /build /usr/share/nginx/html

# Install jq, needed for dockerloadenv.sh
RUN apk update \
 && apk add jq \
 && rm -rf /var/cache/apk/*

EXPOSE 80

COPY scripts/dockerloadenv.sh /dockerloadenv.sh
# Expose docker env to website index.html & then launch nginx
ENTRYPOINT ["sh", "/dockerloadenv.sh"]
CMD ["nginx", "-g", "daemon off;"]
