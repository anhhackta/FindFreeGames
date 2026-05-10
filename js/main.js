import { loadEpicGames } from "./epic.js";
import { loadSteamGames } from "./steam.js";
import { filterGames } from "./filters.js";

const grid = document.querySelector("#game-grid");
const statusEl = document.querySelector("#status");
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const quickStats = document.querySelector("#quick-stats");
const claimModal = document.querySelector("#claim-modal");
const claimScriptEl = document.querySelector("#claim-script");
const copyScriptButton = document.querySelector("#copy-script-btn");
const openGameButton = document.querySelector("#open-game-btn");

let allGames = [];
let currentMode = "free";

function formatFinalPrice(game) {
  if (game.finalPrice === 0) {
    return "FREE";
  }
  if (typeof game.finalPrice === "number") {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(game.finalPrice * 25000);
  }
  return `${game.finalPrice ?? "N/A"}`;
}

function escapeHTML(input) {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createCard(game) {
  const card = document.createElement("article");
  card.className = "game-card";

  const actionLabel = game.action === "claim" ? "Nhan game" : "Den store";

  card.innerHTML = `
    <div class="cover-wrap">
      <img src="${escapeHTML(game.image)}" alt="${escapeHTML(game.title)}" loading="lazy" />
    </div>
    <h3 class="game-title">${escapeHTML(game.title)}</h3>
    <div class="prices">
      <span class="price-old">${escapeHTML(game.originalPrice)}</span>
      <span class="price-new">${formatFinalPrice(game)}</span>
    </div>
    <div class="badge-row">
      <span class="badge store-${game.store}">${game.store.toUpperCase()}</span>
      <span class="badge">-${game.discountPercent}%</span>
    </div>
    <button class="card-action" data-id="${game.id}">${actionLabel}</button>
  `;

  card.querySelector(".card-action").addEventListener("click", () => {
    if (game.action === "claim") {
      claimScriptEl.value =
        game.claimScript ||
        "/* Mo trang game Epic roi dan script claim tai day */";
      openGameButton.href = game.url;
      claimModal.showModal();
      return;
    }
    window.open(game.url, "_blank", "noopener,noreferrer");
  });

  return card;
}

function renderGames() {
  const filtered = filterGames(allGames, currentMode);
  grid.innerHTML = "";

  if (filtered.length === 0) {
    statusEl.textContent = "Khong co game nao theo bo loc nay.";
    return;
  }

  statusEl.textContent = `Tim thay ${filtered.length} game.`;
  filtered.forEach((game) => {
    grid.appendChild(createCard(game));
  });
}

function renderStats() {
  const freeCount = filterGames(allGames, "free").length;
  const gt80Count = filterGames(allGames, "gt80").length;
  const gt60Count = filterGames(allGames, "gt60").length;
  const totalCount = allGames.length;
  quickStats.textContent = `Tổng ${totalCount} game | Free: ${freeCount} | >80%: ${gt80Count} | >60%: ${gt60Count}`;

  filterButtons.forEach((button) => {
    const counter = button.querySelector(".pill-count");
    if (!counter) {
      return;
    }
    const mode = button.dataset.filter;
    const count = filterGames(allGames, mode).length;
    counter.textContent = `${count}`;
  });
}

function bindFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentMode = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderGames();
    });
  });
}

async function boot() {
  statusEl.textContent = "Dang tai du lieu...";

  const [epicResult, steamResult] = await Promise.allSettled([
    loadEpicGames(),
    loadSteamGames(),
  ]);

  const epicGames = epicResult.status === "fulfilled" ? epicResult.value : [];
  const steamGames =
    steamResult.status === "fulfilled" ? steamResult.value : [];
  allGames = [...epicGames, ...steamGames];

  if (allGames.length === 0) {
    statusEl.textContent = "Khong tai duoc du lieu. Thu reload trang.";
    return;
  }

  renderStats();
  renderGames();
}

copyScriptButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(claimScriptEl.value);
    copyScriptButton.textContent = "Da copy";
    setTimeout(() => {
      copyScriptButton.textContent = "Copy script";
    }, 1200);
  } catch {
    copyScriptButton.textContent = "Khong copy duoc";
  }
});

bindFilters();
boot();
