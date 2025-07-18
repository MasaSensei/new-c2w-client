FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "dev", "--", "--host", "--port", "3002"]
