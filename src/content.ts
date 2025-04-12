function getVideoId(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("v");
}

async function fetchSummary(videoId: string): Promise<string[] | null> {
  try {
    const response = await fetch("http://localhost:5000/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId, targetLang: "fr" }),
    });
    const data = await response.json();
    return data.summary.split("\n").filter((line: string) => Boolean(line));
  } catch (error) {
    console.error("Erreur lors de la récupération du résumé :", error);
    return null;
  }
}

function formatLine(line: string): HTMLElement {
  const li = document.createElement("li");
  li.style.marginBottom = "4px";
  li.style.overflow = "hidden";
  li.style.textOverflow = "ellipsis";
  li.style.whiteSpace = "normal";
  li.style.display = "-webkit-box";
  li.style.webkitBoxOrient = "vertical";
  li.style.webkitLineClamp = "2";

  const match = line.match(/^\s*[-•]?\s*(\*\*.+?\*\*)(.*)/);
  if (match) {
    const boldPart = match[1].replace(/\*\*/g, "").trim();
    const rest = match[2].trim();

    const spanBold = document.createElement("span");
    spanBold.textContent = boldPart + " ";
    spanBold.style.fontWeight = "500";
    spanBold.style.fontFamily = `"Roboto", "Arial", sans-serif`;

    const spanRest = document.createElement("span");
    spanRest.textContent = rest;

    li.appendChild(document.createTextNode("• "));
    li.appendChild(spanBold);
    li.appendChild(spanRest);
  } else {
    li.textContent = `• ${line}`;
  }

  return li;
}

function isDarkTheme(): boolean {
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--yt-spec-base-background').trim();
  return bg === '#0f0f0f' || window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function injectSummary(summaryLines: string[]): void {
  const adsPanel = document.querySelector<HTMLElement>(
    "ytd-engagement-panel-section-list-renderer[target-id='engagement-panel-ads']"
  );
  if (!adsPanel) {
    console.warn("Panneau de publicité non trouvé.");
    return;
  }

  const dark = isDarkTheme();
  const container = document.createElement("div");

  container.style.background = "var(--yt-spec-badge-chip-background)";
  container.style.borderRadius = "12px";
  container.style.marginBottom = "16px";
  container.style.padding = "12px";
  container.style.fontFamily = `"Roboto", "Arial", sans-serif`;
  container.style.fontSize = "1.4rem";
  container.style.lineHeight = "2rem";
  container.style.fontWeight = "400";
  container.style.color = dark ? "rgb(255, 255, 255)" : "#000"; // 🎯 this is key

  const title = document.createElement("h3");
  title.textContent = "🧠 Résumé de la vidéo";
  title.style.marginBottom = "8px";
  title.style.fontWeight = "500";
  title.style.fontSize = "1.6rem";
  title.style.color = dark ? "rgb(255, 255, 255)" : "#000";

  container.appendChild(title);

  const ul = document.createElement("ul");
  summaryLines.forEach((line) => {
    ul.appendChild(formatLine(line));
  });

  container.appendChild(ul);
  adsPanel.parentElement?.insertBefore(container, adsPanel);
}

(async () => {
  const videoId = getVideoId();
  if (videoId) {
    const summary = await fetchSummary(videoId);
    if (summary) injectSummary(summary);
  }
})();
