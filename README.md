# Миграция сервиса на Nest.js

## Инструкция по развертыванию на Node.js 18 LTS
1. Установить Nest js

```
npm i -g @nestjs/cli
```

2. Установить сборщик сатичныйх файлов 

```
npm install --global gulp-cli
```

3. Установить все бибилиотеки

```
npm install
```

4. Установить утилиту forever глобально для бесперебойной работы сервиса

```
npm install forever -g
```

5. Собрать приложение Nest

```
npm run build
```

6. Произвести сборку статичных файлов 

```
gulp build-all
```

6. Запустить приложение в Prod

```
npm run start:prod
```