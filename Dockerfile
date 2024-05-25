FROM node:18

WORKDIR user/app/src

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

#RUN npm run build

# COPY entrypoint.sh /usr/local/bin/entrypoint.sh
# RUN chmod +x /usr/local/bin/entrypoint.sh

# ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

#CMD ["npm", "start"]
#CMD ["npm", "run", "dev"]
CMD ["pm2", "start", "ecosystem.config.js"]

EXPOSE 3000