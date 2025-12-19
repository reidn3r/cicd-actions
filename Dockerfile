FROM node:20.18-alpine AS build

WORKDIR /app
COPY . .

RUN npm i
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]