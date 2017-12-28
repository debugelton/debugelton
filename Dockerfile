FROM node:latest

RUN mkdir -p /usr/src/debugelton && npm install -g nodemon
WORKDIR /usr/src
COPY ./src ./debugelton
ADD package.json ./package.json
RUN npm install
CMD node ./debugelton/www
