FROM node:20-alpine 

WORKDIR /app
RUN npm install yarn
RUN rm package-lock.json


COPY . .
RUN yarn install
RUN yarn build

EXPOSE 5000

CMD ["yarn", "start:prod"]