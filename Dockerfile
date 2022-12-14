# FROM node:14-alpine as base

# WORKDIR /src
# COPY package*.json /
# EXPOSE 3000

# FROM base as development
# ENV NODE_ENV=development
# RUN npm install
# COPY . /
# CMD ["node", "bin/www"]

# FROM base as dev
# ENV NODE_ENV=development
# RUN npm install -g nodemon && npm install
# COPY . /
# CMD npm run dev

FROM node:14-alpine as base
COPY ./ /app
WORKDIR /app

RUN npm install

EXPOSE 3000

CMD npm run dev
