# syntax=docker/dockerfile:1
FROM node:16.18.0 
ENV NODE_ENV=production 
WORKDIR .
COPY ["package.json", "package-lock.json*", "./"] ]
RUN npm install  
COPY . .
CMD [ "npm", "run", "start"]
