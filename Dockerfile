FROM skyerus/environments:httpd-centos7-php73-nodejs

ENV NODE_ENV=production

COPY package-lock.json package-lock.json
RUN npm install
COPY . .
RUN npm build


CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]