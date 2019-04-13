FROM skyerus/environments:httpd-centos7-php73-nodejs

ENV NODE_ENV=production

COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm install
COPY . .
RUN ./node_modules/.bin/webpack --config webpack.prod.js


CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]