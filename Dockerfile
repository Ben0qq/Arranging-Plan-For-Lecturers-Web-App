FROM node:8

# Create app directory
WORKDIR /api/usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]