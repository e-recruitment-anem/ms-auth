
FROM node:14-alpine AS BUILD_IMAGE
WORKDIR /srv/app
COPY package*.json ./
RUN npm install
COPY src ./src
COPY tsconfig.json ./tsconfig.json
RUN npx prisma generate
RUN npm run build
RUN npm prune --production

FROM node:14-alpine
WORKDIR /srv/app
COPY --from=BUILD_IMAGE /srv/app/build .
COPY --from=BUILD_IMAGE /srv/app/node_modules ./node_modules
EXPOSE 5000
CMD ["node","app.js"]