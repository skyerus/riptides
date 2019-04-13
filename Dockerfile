FROM skyerus/environments:httpd-centos7-php73-nodejs

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
