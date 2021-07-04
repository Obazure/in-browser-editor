FROM node:14.11.0

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn --frozen-lockfile

COPY ./tsconfig.json ./
COPY ./config-overrides.js ./
COPY ./server.js ./
COPY ./.eslintrc ./
COPY ./.prettierrc ./

COPY ./public ./public
COPY ./src ./src
RUN yarn build

ENTRYPOINT ["yarn", "serve"]
