# Ссылка на хостинг сайта
-  [Главная страница](http://217.25.92.196:3000)
-  [Вход в панель администратора](http://217.25.92.196:3000/admin/login)

   > пароль: 
    ```
    admin
    ```

## Инструкция по развертыванию на Node.js

1. Установить Nest js

```
npm i -g @nestjs/cli
```

2. Установить все бибилиотеки

```
npm install
```

3. Собрать приложение Nest

```
npm run build
```

4.  Создать файл .env в корне

```
PORT=3000
HOST="http://localhost:3000"
DB_NAME="store.db"
SECRET_KEY="admin"
```

5. Запустить приложение в Prod

```
npm run start:prod
```