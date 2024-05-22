FROM node:18

WORKDIR user/app/src

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000