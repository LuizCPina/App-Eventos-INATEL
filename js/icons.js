const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"></path><path d="M5 10v10a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V10"></path></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 10h18"></path></svg>',
  bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1Z"></path></svg>',
  bookmarkFilled: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1Z"></path></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H18v18H7.5A2.5 2.5 0 0 0 5 8.5"></path><path d="M8 7h6"></path><path d="M8 11h6"></path></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-6.5-4.35-8.2-8.14A4.8 4.8 0 0 1 7.8 4.5c1.4 0 2.7.7 3.5 1.8.8-1.1 2.1-1.8 3.5-1.8a4.8 4.8 0 0 1 3.99 7.36C18.5 15.65 12 20 12 20Z"></path></svg>',
  heartFilled: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-6.5-4.35-8.2-8.14A4.8 4.8 0 0 1 7.8 4.5c1.4 0 2.7.7 3.5 1.8.8-1.1 2.1-1.8 3.5-1.8a4.8 4.8 0 0 1 3.99 7.36C18.5 15.65 12 20 12 20Z"></path></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 20a8 8 0 0 1 16 0"></path></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>',
  mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"></path><circle cx="12" cy="11" r="2.5"></circle></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"></path></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"></path></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="6"></circle><path d="m20 20-4.2-4.2"></path></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 17h8"></path><path d="M9 17v-4a3 3 0 1 1 6 0v4"></path><path d="M7 17h10"></path><path d="M10 5a2 2 0 1 1 4 0"></path></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m8 8-4 4 4 4"></path><path d="m16 8 4 4-4 4"></path><path d="m13 5-2 14"></path></svg>',
  brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4a3 3 0 0 0-2.8 4"></path><path d="M15 4a3 3 0 0 1 2.8 4"></path><path d="M4 11a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"></path><path d="M8 15v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-2"></path><path d="M10 10v1"></path><path d="M14 10v1"></path></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4H6a2 2 0 0 0-2 2v2a3 3 0 0 0 3 3h1"></path><path d="M16 4h2a2 2 0 0 1 2 2v2a3 3 0 0 1-3 3h-1"></path><path d="M12 13v6"></path><path d="M9 19h6"></path><path d="M8 13a4 4 0 0 0 8 0"></path></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></svg>',
  externalLink: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h7v7"></path><path d="M10 14 21 3"></path><path d="M21 14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"></path></svg>',
  checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="m9 12 2 2 4-4"></path></svg>',
  calendarOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h14"></path><path d="M5 4h14a1 1 0 0 1 1 1v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1Z"></path><path d="M8 3v4"></path><path d="M16 3v4"></path><path d="M3 10h4"></path><path d="M3 3 21 21"></path></svg>'
};

function renderIcon(name, extraClass = "") {
  const normalizedName = (name || "").replace(/^ti-/, "");
  const svg = ICONS[normalizedName] || "";
  const classes = ["icon", extraClass].filter(Boolean).join(" ");
  return `<span class="${classes}" aria-hidden="true">${svg}</span>`;
}

function applyInlineIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (!name) return;
    if (!el.classList.contains("icon")) {
      el.classList.add("icon");
    }
    el.innerHTML = ICONS[name] || "";
    el.setAttribute("aria-hidden", "true");
  });
}

window.ICONS = ICONS;
window.renderIcon = renderIcon;
window.applyInlineIcons = applyInlineIcons;

document.addEventListener("DOMContentLoaded", () => {
  applyInlineIcons(document);
});
