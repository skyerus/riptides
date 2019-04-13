FROM skyerus/environments:httpd-centos7-php73-nodejs

ENV NODE_ENV=production

RUN npm install
RUN npm build

CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]