FROM node:10

WORKDIR /home/node

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build

CMD ["npm", "run", "dev"]
