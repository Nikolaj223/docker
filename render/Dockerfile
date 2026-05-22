FROM nginx:stable-alpine

COPY render/default.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/

RUN chown -R nginx:nginx /var/cache/nginx /var/run /run /usr/share/nginx/html

USER nginx

EXPOSE 10000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:10000/health.html || exit 1

CMD ["nginx", "-g", "daemon off;"]
