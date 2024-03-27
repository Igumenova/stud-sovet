# Миграция сервиса на Nest.js

## Инструкция по развертыванию на Node.js 18 LTS
1. Установить Nest js

```
npm i -g @nestjs/cli
```

2. Установить все бибилиотеки

```
npm install
```

3.  Создать файл .env в корне

```
PORT=3000
HOST="http://localhost:3000"
DB_NAME="store.db"
SECRET_KEY="dfhyw"
```

4. Запустить приложение в Prod

```
npm run start:prod
```