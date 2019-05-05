FROM skyerus/environments:nginx-static

COPY package*.json ./

COPY .env.prod ./.env

COPY . .

