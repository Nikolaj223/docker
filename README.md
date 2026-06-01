# Nginx Docker Task

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Nikolaj223/docker)

Учебное задание: собрать nginx со своим сайтом в двух вариантах.

## Что сдавать наставнику

Основные файлы для проверки:

- `bind-mount/Dockerfile` — nginx + сайт подключается папкой с диска.
- `copy-image/Dockerfile` — nginx + сайт копируется внутрь образа.

Дополнительно в проекте есть:

- `site/` — файлы сайта.
- `site/js/data.js` — контент учебного стенда.
- `site/js/render.js` — отрисовка карточек, статей и команд.
- `site/js/interactions.js` — фильтры, раскрытие статей и копирование команд.
- `site/js/app.js` — точка входа для фронтенда.
- `nginx/default.conf` — конфиг nginx с security headers.
- `nginx/php-fpm.conf` — конфиг nginx для проксирования PHP в `php-fpm`.
- `php/index.php` — PHP-скрипт из дополнительного задания.
- `php/php.ini` — включает `short_open_tag`, чтобы работал синтаксис `<? ... ?>`.
- `scripts/scan.ps1` — сканирование образов через Docker Scout.
- `SECURITY-AUDIT.md` — краткий отчет по аудиту.

## Вариант 1: bind mount

Сайт не лежит внутри образа. Он подключается при запуске контейнера:

```powershell
docker build -f bind-mount/Dockerfile -t nginx-site-bind:secure .
docker run --rm -p 8080:8080 -v ${PWD}/site:/usr/share/nginx/html:ro nginx-site-bind:secure
```

Открыть: http://localhost:8080

Плюс: можно менять файлы в `site/`, и контейнер сразу отдаст обновленную страницу.

## Вариант 2: copy inside image

Сайт копируется внутрь образа во время сборки:

```powershell
docker build -f copy-image/Dockerfile -t nginx-site-copy:secure .
docker run --rm -p 8081:8080 nginx-site-copy:secure
```

Открыть: http://localhost:8081

Плюс: образ самодостаточный, его можно отправить в registry или передать другому человеку.

## Проверка через Compose

```powershell
docker compose up --build
```

После запуска:

- bind mount: http://localhost:8080
- copy image: http://localhost:8081
- nginx + php-fpm: http://localhost:8082

## Дополнительное задание: nginx + php-fpm

Вариант сделан через два отдельных сервиса:

- `nginx-php` — принимает HTTP-запросы и передает `.php` в FastCGI.
- `php-fpm` — выполняет `php/index.php`.

Запуск только дополнительного задания:

```powershell
docker compose up --build nginx-php php-fpm
```

Открыть:

```text
http://localhost:8082
```

Ожидаемый результат в браузере:

```text
Hello 01-06-2026
```

Дата генерируется внутри PHP-контейнера, поэтому в другой день значение будет другим.

## Что добавлено для DevSecOps

- Контейнер запускается от пользователя `nginx`, а не от root.
- Nginx слушает порт `8080`, чтобы не использовать привилегированный порт `80` внутри контейнера.
- Добавлены security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Добавлен `HEALTHCHECK`.
- В compose-варианте включены `read_only`, `cap_drop: ALL`, `no-new-privileges`.
- Добавлен скрипт сканирования уязвимостей через Docker Scout.

## Сканирование на уязвимости

```powershell
.\scripts\scan.ps1
```

Или вручную:

```powershell
docker scout cves nginx-site-bind:secure --only-fixed
docker scout cves nginx-site-copy:secure --only-fixed
docker scout cves nginx-php-gateway:secure --only-fixed
docker scout cves php-fpm-date:secure --only-fixed
```

## Deploy на Render

В репозитории есть `render.yaml`, который разворачивает production-вариант через `render/Dockerfile`.
На Render главная страница показывает учебный фронтенд, а `/php` показывает результат дополнительного PHP-задания.

Что выбрать в Render:

- Web Service
- Runtime: Docker
- Dockerfile Path: `render/Dockerfile`
- Docker Context: `.`
- Health Check Path: `/health.html`
- Port: `10000`

После deploy Render выдаст публичную ссылку вида:

```text
https://docker-study-hub.onrender.com
```

PHP-страница будет доступна по адресу:

```text
https://docker-study-hub.onrender.com/php
```
