FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN apt-get update && apt-get install -y netcat-openbsd

COPY . .
RUN npm run build

COPY entrypoint.sh ./entrypoint.sh
RUN sed -i 's/\r$//' entrypoint.sh && chmod +x entrypoint.sh

EXPOSE 3000

CMD ["./entrypoint.sh"]
