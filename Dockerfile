FROM node:18

WORKDIR user/app/src

COPY package*.json ./

RUN npm install

RUN npm install -g pm2

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

#RUN npm run build


# COPY entrypoint.sh /usr/local/bin/entrypoint.sh
# RUN chmod +x /usr/local/bin/entrypoint.sh

# ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]


CMD ["pm2-runtime", "start", "dist/index.js"]

EXPOSE 3000