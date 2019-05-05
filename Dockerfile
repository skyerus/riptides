FROM skyerus/environments:nginx-static

COPY package*.json ./

COPY .env.prod ./.env

RUN npm install

COPY . .

RUN npm run build
