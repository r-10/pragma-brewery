FROM node:9

WORKDIR /opt/pragma/backend

COPY ./app /opt/pragma/backend/app
COPY ./bin /opt/pragma/backend/bin
COPY ./public /opt/pragma/backend/public
COPY app.js /opt/pragma/backend/app.js
COPY package.json /opt/pragma/backend/package.json

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
