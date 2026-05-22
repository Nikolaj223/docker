const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export const renderMetrics = (metrics, target) => {
  target.innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric">
          <strong>${escapeHtml(metric.value)}</strong>
          <span>${escapeHtml(metric.label)}</span>
        </article>
      `,
    )
    .join("");
};

export const renderModules = (modules, target) => {
  target.innerHTML = modules
    .map(
      (module) => `
        <article class="module-card" data-tone="${escapeHtml(module.tone)}">
          <span class="module-index">${escapeHtml(module.index)}</span>
          <h3>${escapeHtml(module.title)}</h3>
          <p>${escapeHtml(module.summary)}</p>
          <small>${escapeHtml(module.result)}</small>
        </article>
      `,
    )
    .join("");
};

export const renderFilters = (filters, target) => {
  target.innerHTML = filters
    .map(
      (filter) => `
        <button class="filter-button" type="button" data-filter="${escapeHtml(filter.id)}">
          ${escapeHtml(filter.label)}
        </button>
      `,
    )
    .join("");
};

export const renderArticles = (articles, target) => {
  target.innerHTML = articles
    .map(
      (article) => `
        <article class="article-card" data-category="${escapeHtml(article.category)}">
          <span>${escapeHtml(article.time)}</span>
          <h3>${escapeHtml(article.title)}</h3>
          <p>${escapeHtml(article.summary)}</p>
          <p class="article-more">${escapeHtml(article.details)}</p>
          <button type="button" data-expand>Развернуть</button>
        </article>
      `,
    )
    .join("");
};

export const renderCommands = (commands, target) => {
  target.innerHTML = commands
    .map(
      (item) => `
        <article class="command-card">
          <h3>${escapeHtml(item.title)}</h3>
          <pre><code>${escapeHtml(item.command)}</code></pre>
          <button type="button" data-copy="${escapeHtml(item.command)}">Скопировать</button>
        </article>
      `,
    )
    .join("");
};

export const renderResources = (resources, target) => {
  target.innerHTML = resources
    .map(
      (resource) => `
        <a class="resource-card" href="${escapeHtml(resource.url)}" target="_blank" rel="noreferrer">
          <span>${escapeHtml(resource.type)}</span>
          <h3>${escapeHtml(resource.title)}</h3>
          <p>${escapeHtml(resource.description)}</p>
        </a>
      `,
    )
    .join("");
};
