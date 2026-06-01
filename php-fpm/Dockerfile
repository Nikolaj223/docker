FROM php:8.3-fpm-alpine

COPY php/php.ini /usr/local/etc/php/conf.d/date-task.ini
COPY php/ /var/www/html/

RUN apk upgrade --no-cache \
    && chown -R www-data:www-data /var/www/html

WORKDIR /var/www/html

EXPOSE 9000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD php-fpm -t || exit 1

CMD ["php-fpm"]
