export const initArticleFilters = () => {
  const buttons = [...document.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll("[data-category]")];

  const applyFilter = (filter) => {
    buttons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.filter === filter);
    });

    cards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.category === filter;
      card.hidden = !isVisible;
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter));
  });

  applyFilter("all");
};

export const initArticleExpansion = () => {
  document.querySelectorAll("[data-expand]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".article-card");
      const isExpanded = card.classList.toggle("is-expanded");
      button.textContent = isExpanded ? "Свернуть" : "Развернуть";
    });
  });
};

export const initCopyButtons = () => {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        button.textContent = "Скопировано";
      } catch {
        button.textContent = "Команда рядом";
      }

      window.setTimeout(() => {
        button.textContent = "Скопировать";
      }, 1600);
    });
  });
};

export const initActiveNavigation = () => {
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".nav a")];

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (!visible) {
        return;
      }

      links.forEach((link) => {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${visible.target.id}`,
        );
      });
    },
    { rootMargin: "-35% 0px -55% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
};
