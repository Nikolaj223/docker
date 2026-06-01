# Отчет для наставника

GitHub: https://github.com/Nikolaj223/docker

Демо фронтенда: https://docker-study-hub-ngr1.onrender.com

Демо PHP-допзадания: https://docker-study-hub-ngr1.onrender.com/php

## Задание 1: nginx в двух вариантах

Файлы, которые просили прислать:

- `bind-mount/Dockerfile` — nginx, сайт подключается с хоста через volume.
- `copy-image/Dockerfile` — nginx, сайт копируется внутрь образа.

Локальная проверка:

```bash
docker compose up --build -d nginx-bind nginx-copy
```

Ссылки:

- http://localhost:8080 — bind mount вариант.
- http://localhost:8081 — copy inside image вариант.

## Дополнительное задание: nginx + php-fpm

Реализовано отдельным сервисом `php-fpm` в `docker-compose.yml`.

Основные файлы:

- `nginx-php/Dockerfile` — nginx-шлюз для PHP.
- `php-fpm/Dockerfile` — PHP-FPM образ.
- `nginx/php-fpm.conf` — FastCGI-конфиг nginx.
- `php/index.php` — скрипт с содержимым `<? print "Hello ".date ("d-m-Y"); ?>`.
- `php/php.ini` — включает `short_open_tag=On`, чтобы короткий PHP-тег `<? ... ?>` выполнялся.

Локальная проверка:

```bash
docker compose up --build -d nginx-php php-fpm
```

Ссылка:

- http://localhost:8082

Ожидаемый результат на 1 июня 2026 года:

```text
Hello 01-06-2026
```

## Проверка всего проекта

```bash
docker compose up --build -d
docker compose ps
```

После запуска доступны:

- http://localhost:8080 — первое nginx-задание, bind mount.
- http://localhost:8081 — первое nginx-задание, copy image.
- http://localhost:8082 — дополнительное задание nginx + php-fpm.

## Render

Render-демо оставляет фронтенд на главной странице и добавляет PHP-страницу:

- `/` — учебный фронтенд по Docker.
- `/php` — вывод PHP-скрипта из дополнительного задания.
