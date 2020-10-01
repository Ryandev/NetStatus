FROM node:12

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

#use npm install if debug
RUN npm ci --only=production

#Copy all src
COPY . .

ENV PORT=80
EXPOSE 80
CMD [ "npm", "start" ]
