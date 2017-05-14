FROM node:7-alpine

ENV PORT=3000

COPY package.json /code/
WORKDIR /code
RUN npm --silent install

RUN adduser -D app

COPY ./ /code/
RUN npm run build

RUN chown app:app /code/*

USER app

CMD ["npm", "run", "backend"]
