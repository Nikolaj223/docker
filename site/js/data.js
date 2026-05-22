export const metrics = [
  {
    value: "2",
    label: "Dockerfile: bind mount и copy image",
  },
  {
    value: "2",
    label: "nginx-контейнера в одном compose-проекте",
  },
  {
    value: "0",
    label: "найденных уязвимых пакетов после Scout-аудита",
  },
  {
    value: "8080",
    label: "внутренний непривилегированный порт nginx",
  },
];

export const modules = [
  {
    index: "01",
    title: "Образ",
    summary: "Базовый `nginx:stable-alpine` расширяется конфигом и файлами сайта.",
    result: "Итог: повторяемая сборка",
    tone: "blue",
  },
  {
    index: "02",
    title: "Bind mount",
    summary: "Файлы остаются на хосте и подключаются в контейнер в режиме read-only.",
    result: "Итог: удобно для разработки",
    tone: "green",
  },
  {
    index: "03",
    title: "Copy image",
    summary: "Сайт копируется в образ, поэтому контейнер получается автономным.",
    result: "Итог: удобно для доставки",
    tone: "amber",
  },
  {
    index: "04",
    title: "Аудит",
    summary: "Docker Scout проверяет пакеты внутри образа и показывает CVE-риски.",
    result: "Итог: 0C 0H 0M 0L",
    tone: "red",
  },
];

export const articles = [
  {
    category: "docker",
    time: "5 мин",
    title: "Bind mount или COPY",
    summary: "Bind mount ускоряет локальную разработку, COPY делает образ переносимым.",
    details:
      "В задании используются оба подхода: первый показывает связь контейнера с папкой на диске, второй показывает полноценный immutable-образ.",
  },
  {
    category: "nginx",
    time: "4 мин",
    title: "Зачем nginx нужен отдельный конфиг",
    summary: "Конфиг управляет портом, root-директорией, кешированием и заголовками.",
    details:
      "В проекте nginx слушает 8080, отдает `/usr/share/nginx/html` и добавляет security headers к каждому ответу.",
  },
  {
    category: "security",
    time: "7 мин",
    title: "Почему контейнер не запускается от root",
    summary: "Меньше прав внутри контейнера снижает последствия ошибки или взлома.",
    details:
      "Dockerfile переключает процесс на пользователя `nginx`, а compose дополнительно включает no-new-privileges и cap_drop.",
  },
  {
    category: "security",
    time: "6 мин",
    title: "Что значит 0C 0H 0M 0L",
    summary: "Это краткая сводка Docker Scout по критичности найденных уязвимостей.",
    details:
      "C, H, M и L означают critical, high, medium и low. В текущих образах Docker Scout не нашел уязвимых пакетов.",
  },
];

export const commands = [
  {
    title: "Запуск стенда",
    command: "docker compose up --build -d",
  },
  {
    title: "Проверка контейнеров",
    command: "docker compose ps",
  },
  {
    title: "Аудит образов",
    command:
      "docker scout cves nginx-site-bind:secure --only-fixed\n" +
      "docker scout cves nginx-site-copy:secure --only-fixed",
  },
];

export const resources = [
  {
    type: "Docker Docs",
    title: "Get Started with Docker",
    description: "Базовый маршрут: контейнеры, образы, Dockerfile и первые команды.",
    url: "https://docs.docker.com/get-started/",
  },
  {
    type: "Docker Docs",
    title: "Building best practices",
    description: "Практики сборки образов: base image, cache, .dockerignore и безопасность.",
    url: "https://docs.docker.com/build/building/best-practices/",
  },
  {
    type: "Docker Docs",
    title: "Docker Compose",
    description: "Как описывать несколько сервисов проекта в одном compose-файле.",
    url: "https://docs.docker.com/compose/",
  },
  {
    type: "Docker Docs",
    title: "Docker Scout",
    description: "Анализ образов, поиск уязвимостей и supply chain security.",
    url: "https://docs.docker.com/scout/",
  },
  {
    type: "Docker Blog",
    title: "How to use the NGINX Docker Official Image",
    description: "Практический разбор официального nginx-образа и запуска контейнера.",
    url: "https://www.docker.com/blog/how-to-use-the-official-nginx-docker-image/",
  },
  {
    type: "OWASP",
    title: "Docker Security Cheat Sheet",
    description: "Краткий список типовых ошибок и практик защиты Docker-контейнеров.",
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html",
  },
];

export const filters = [
  { id: "all", label: "Все" },
  { id: "docker", label: "Docker" },
  { id: "nginx", label: "Nginx" },
  { id: "security", label: "Security" },
];
