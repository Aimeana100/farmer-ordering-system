FROM node:latest

WORKDIR /app

COPY ./ ./
RUN ls -l
RUN npm install
RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]