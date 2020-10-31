FROM node:15.0.1-alpine3.11
  
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++
RUN npm ci --only=production
RUn apk del .gyp

RUN npm install react-scripts@3.4.1 -g

#Copy all src
COPY . .

ENV PORT=80
EXPOSE 80
CMD [ "npm", "start" ]
