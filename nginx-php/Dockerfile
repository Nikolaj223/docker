FROM nginx:stable-alpine

COPY nginx/php-fpm.conf /etc/nginx/conf.d/default.conf

RUN apk upgrade --no-cache \
    && chown -R nginx:nginx /var/cache/nginx /var/run

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
