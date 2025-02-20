FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install


COPY . .

RUN cd /app

RUN npm run build

RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "5173"]

EXPOSE 5173

