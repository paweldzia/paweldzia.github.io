const sootField = document.querySelector("[data-soot-field]");
const openVoucherButton = document.querySelector("[data-open-voucher]");
const voucherPanel = document.querySelector("[data-voucher-panel]");
const youtubePlayer = document.querySelector("[data-youtube-player]");
const loadYoutubeButton = document.querySelector("[data-load-youtube]");
const youtubeNote = document.querySelector("[data-youtube-note]");

const sootSprites = [
  { x: "7%", y: "28%", size: "2.4rem", drift: "0.8rem", duration: "7.2s", delay: "-1s" },
  { x: "16%", y: "68%", size: "1.8rem", drift: "-0.6rem", duration: "8.4s", delay: "-4s" },
  { x: "25%", y: "18%", size: "1.25rem", drift: "0.5rem", duration: "6.5s", delay: "-2s" },
  { x: "36%", y: "76%", size: "2.2rem", drift: "0.9rem", duration: "9s", delay: "-3.5s" },
  { x: "48%", y: "24%", size: "1.5rem", drift: "-0.75rem", duration: "6.8s", delay: "-5s" },
  { x: "62%", y: "64%", size: "2rem", drift: "0.7rem", duration: "7.7s", delay: "-2.8s" },
  { x: "74%", y: "17%", size: "1.7rem", drift: "-0.9rem", duration: "8.8s", delay: "-6s" },
  { x: "84%", y: "58%", size: "2.35rem", drift: "0.6rem", duration: "7.4s", delay: "-1.8s" },
  { x: "91%", y: "35%", size: "1.25rem", drift: "-0.45rem", duration: "6.9s", delay: "-4.6s" },
  { x: "12%", y: "47%", size: "1.15rem", drift: "0.55rem", duration: "8.1s", delay: "-7s" },
  { x: "55%", y: "82%", size: "1.35rem", drift: "-0.6rem", duration: "7.9s", delay: "-3s" },
  { x: "69%", y: "42%", size: "1.1rem", drift: "0.5rem", duration: "6.2s", delay: "-2.2s" }
];

if (sootField) {
  const fragment = document.createDocumentFragment();

  sootSprites.forEach((sprite) => {
    const soot = document.createElement("span");
    soot.className = "soot";
    soot.innerHTML = `
      <span class="soot-hair"></span>
      <span class="soot-eye soot-eye-left"></span>
      <span class="soot-eye soot-eye-right"></span>
    `;
    soot.style.setProperty("--x", sprite.x);
    soot.style.setProperty("--y", sprite.y);
    soot.style.setProperty("--size", sprite.size);
    soot.style.setProperty("--drift", sprite.drift);
    soot.style.setProperty("--duration", sprite.duration);
    soot.style.setProperty("--delay", sprite.delay);
    fragment.appendChild(soot);
  });

  sootField.appendChild(fragment);
}

if (openVoucherButton && voucherPanel) {
  openVoucherButton.addEventListener("click", () => {
    const isHidden = voucherPanel.hasAttribute("hidden");
    voucherPanel.toggleAttribute("hidden", !isHidden);
    openVoucherButton.textContent = isHidden ? "Gutschein ist offen" : "Gutschein öffnen";

    if (isHidden) {
      voucherPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

function getYoutubeEmbedUrl(videoId) {
  const params = new URLSearchParams({
    autoplay: "1",
    enablejsapi: "1",
    modestbranding: "1",
    playsinline: "1",
    rel: "0"
  });

  if (window.location.protocol !== "file:" && window.location.origin !== "null") {
    params.set("origin", window.location.origin);
    params.set("widget_referrer", window.location.href);
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

if (youtubePlayer && loadYoutubeButton) {
  loadYoutubeButton.addEventListener("click", () => {
    const videoId = youtubePlayer.dataset.videoId;
    const iframe = document.createElement("iframe");

    iframe.title = "Trailer zu My Neighbour Totoro als Musical";
    iframe.src = getYoutubeEmbedUrl(videoId);
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;

    loadYoutubeButton.replaceWith(iframe);

    if (youtubeNote && window.location.protocol === "file:") {
      youtubeNote.hidden = false;
    }
  });
}
