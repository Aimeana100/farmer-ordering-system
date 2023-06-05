FROM node:18

WORKDIR /app

COPY ./package.json ./package.json
COPY ./ ./
RUN ls -l
RUN npm install
RUN npm run build
RUN ls -li
EXPOSE 8080

CMD ["npm", "start"]