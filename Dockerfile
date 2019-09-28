FROM node:lts-alpine as builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

RUN mkdir -p dist
RUN npm install -g typescript
RUN npm run build

FROM node:lts-alpine

WORKDIR /app
COPY --from=builder /app/dist /app/dist/
COPY --from=builder /app/node_modules /app/node_modules/
COPY --from=builder /app/package*.json /app/

EXPOSE 3000
CMD [ "npm", "start"]