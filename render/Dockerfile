FROM php:8.3-fpm-alpine

RUN apk add --no-cache nginx \
    && apk upgrade --no-cache \
    && mkdir -p /run/nginx /usr/share/nginx/html/php

COPY render/default.conf /etc/nginx/http.d/default.conf
COPY render/start.sh /usr/local/bin/start-render.sh
COPY site/ /usr/share/nginx/html/
COPY php/ /usr/share/nginx/html/php/
COPY php/php.ini /usr/local/etc/php/conf.d/date-task.ini

RUN chown -R www-data:www-data /usr/share/nginx/html \
    && chown -R nginx:nginx /run/nginx /var/lib/nginx /var/log/nginx \
    && chmod +x /usr/local/bin/start-render.sh

EXPOSE 10000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:10000/php/health || exit 1

CMD ["start-render.sh"]
