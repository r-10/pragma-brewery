FROM node:9

WORKDIR /opt/pragma/frontend

COPY ./src /opt/pragma/frontend/src
COPY .angular-cli.json /opt/pragma/frontend/.angular-cli.json
COPY package.json /opt/pragma/frontend/package.json
COPY tsconfig.json /opt/pragma/frontend/tsconfig.json
COPY tslint.json /opt/pragma/frontend/tslint.json

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]
