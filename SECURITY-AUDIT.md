# Security Audit

Дата проверки: 2026-06-01

## Образы

- `nginx-site-bind:secure`
- `nginx-site-copy:secure`
- `nginx-php-gateway:secure`
- `php-fpm-date:secure`

## Инструмент

Docker Scout:

```powershell
docker scout cves nginx-site-bind:secure --only-fixed
docker scout cves nginx-site-copy:secure --only-fixed
docker scout cves nginx-php-gateway:secure --only-fixed
docker scout cves php-fpm-date:secure --only-fixed
```

## Фактический результат

Все четыре compose-образа были пересобраны после `apk upgrade --no-cache` и просканированы Docker Scout. Результат для каждого:

```text
vulnerabilities: 0C 0H 0M 0L
No vulnerable packages detected
```

Также локально проверен Render-образ `docker-render-demo:php`; результат: `0C 0H 0M 0L`.

Также проверено:

- HTTP-ответ сайта: `200 OK`.
- HTTP-ответ PHP-страницы: `Hello 01-06-2026`.
- PHP health endpoint отвечает JSON-статусом `ok`.
- PHP status endpoint отвечает JSON-диагностикой без раскрытия phpinfo.
- JS-модули сайта доступны через nginx.
- Security headers приходят в ответе nginx.
- Healthcheck контейнеров переходит в состояние `healthy`.
- Compose-проект поднимает три публичных варианта: bind mount, copy image и nginx + php-fpm.
- GitHub Actions workflow собирает compose-проект и проверяет frontend, PHP, health и status endpoints.

## Что сделано для снижения рисков

- Используются компактные базовые образы `nginx:stable-alpine` и `php:8.3-fpm-alpine`.
- Перед финальной сборкой выполняется `apk upgrade --no-cache`, чтобы подтянуть исправленные Alpine-пакеты.
- Контейнер запускается от пользователя `nginx`, а не от root.
- Nginx слушает непривилегированный порт `8080`.
- Добавлены security headers на уровне nginx.
- Добавлен `HEALTHCHECK`.
- Healthcheck PHP-варианта проходит через nginx в PHP-FPM, а не возвращает статический ответ nginx.
- В `docker-compose.yml` контейнеры запускаются с `read_only`, `cap_drop: ALL` и `no-new-privileges`.
- PHP-контейнер не публикует порт наружу, он доступен только внутри Docker-сети через сервис `php-fpm`.
- Для PHP включен `short_open_tag=On`, чтобы скрипт из задания с `<? ... ?>` выполнялся как PHP-код.
