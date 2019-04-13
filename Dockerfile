FROM skyerus/environments:httpd-centos7-php73-nodejs

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir dist

RUN npm run-script build

CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]