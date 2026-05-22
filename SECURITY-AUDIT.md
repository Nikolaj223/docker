# Security Audit

Дата проверки: 2026-05-22

## Образы

- `nginx-site-bind:secure`, digest `0050d8c45832`
- `nginx-site-copy:secure`, digest `d8b5085f83e6`

## Инструмент

Docker Scout:

```powershell
docker scout cves nginx-site-bind:secure --only-fixed
docker scout cves nginx-site-copy:secure --only-fixed
```

## Фактический результат

Оба образа были просканированы Docker Scout. Результат для каждого:

```text
vulnerabilities: 0C 0H 0M 0L
No vulnerable packages detected
```

Также проверено:

- HTTP-ответ сайта: `200 OK`.
- JS-модули сайта доступны через nginx.
- Security headers приходят в ответе nginx.
- Healthcheck контейнеров переходит в состояние `healthy`.
- Compose-проект поднимает два варианта: bind mount и copy image.

## Что сделано для снижения рисков

- Используется компактный базовый образ `nginx:stable-alpine`.
- Контейнер запускается от пользователя `nginx`, а не от root.
- Nginx слушает непривилегированный порт `8080`.
- Добавлены security headers на уровне nginx.
- Добавлен `HEALTHCHECK`.
- В `docker-compose.yml` контейнеры запускаются с `read_only`, `cap_drop: ALL` и `no-new-privileges`.
