# Variant 1: nginx image, website files are mounted from the host folder.
FROM nginx:stable-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /var/cache/nginx /var/run /usr/share/nginx/html

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/health.html || exit 1

CMD ["nginx", "-g", "daemon off;"]
