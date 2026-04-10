# Используем Node.js на базе легкого дистрибутива Linux
FROM node:20-alpine

WORKDIR /app

# Копируем только файлы зависимостей для эффективного кеширования
COPY package*.json ./

# Устанавливаем зависимости внутри контейнера
RUN npm install

# Копируем все остальные файлы проекта
COPY . .

# Прокидываем порты (8081 - Expo Web, 3000 - JSON-server)
EXPOSE 8081
EXPOSE 3000

# Мы будем запускать сервисы через docker-compose