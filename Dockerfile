FROM node:19-slim as base
WORKDIR "/app"
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

COPY ./src ./src
COPY tsconfig.json jest.config.js .eslintrc .eslintignore  ./

RUN npm run build