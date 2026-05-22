# Variant 2: nginx image with website files copied into the image.
FROM nginx:stable-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/

RUN chown -R nginx:nginx /var/cache/nginx /var/run /usr/share/nginx/html

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/health.html || exit 1

CMD ["nginx", "-g", "daemon off;"]
