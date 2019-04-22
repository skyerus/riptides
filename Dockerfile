FROM skyerus/environments:httpd-centos7-nodejs-prod

COPY package*.json ./

COPY .env.prod ./.env

RUN npm install

COPY . .

RUN npm run build

CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
