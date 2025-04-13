function getVideoId(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("v");
}

async function fetchSummary(videoId: string): Promise<Record<string, string[]> | null> {
  try {
    const response = await fetch("http://localhost:5000/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId, targetLang: "fr" }),
    });
    const data = await response.json();
    const lines = data.summary.split("\n").filter((line: string) => Boolean(line));
    return {
      summary: lines,
      actions: lines.filter((line: string) => line.toLowerCase().includes("action")),
      chapters: lines.filter((line: string) => line.toLowerCase().includes("chapitre")),
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du résumé :", error);
    return null;
  }
}

function formatLine(line: string): HTMLLIElement {
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

function createTab(name: string, isSelected: boolean, onClick: () => void): HTMLDivElement {
  const tab = document.createElement("div");
  tab.textContent = name;
  tab.style.cursor = "pointer";
  tab.style.padding = "8px 14px";
  tab.style.borderRadius = "8px";
  tab.style.fontWeight = "500";
  tab.style.marginRight = "8px";
  tab.style.transition = "all 0.2s ease-in-out";
  tab.style.boxShadow = isSelected ? "0 1px 3px rgba(0,0,0,0.12)" : "";
  tab.style.backgroundColor = isSelected ? "#e6e6e6" : "transparent";
  tab.style.border = isSelected ? "1px solid #ccc" : "1px solid transparent";

  tab.onmouseenter = () => {
    tab.style.backgroundColor = "#f0f0f0";
  };
  tab.onmouseleave = () => {
    tab.style.backgroundColor = isSelected ? "#e6e6e6" : "transparent";
  };

  tab.onclick = () => {
    onClick();
    [...(tab.parentElement?.children || [])].forEach(t => {
      const el = t as HTMLElement;
      el.style.backgroundColor = "transparent";
      el.style.border = "1px solid transparent";
      el.style.boxShadow = "";
    });
    tab.style.backgroundColor = "#e6e6e6";
    tab.style.border = "1px solid #ccc";
    tab.style.boxShadow = "0 1px 3px rgba(0,0,0,0.12)";
  };

  return tab;
}

function createHeaderTabs(
  sections: Record<string, string[]>,
  contentContainer: HTMLElement
): { header: HTMLElement; renderSection: (key: string) => void } {
  const header = document.createElement("div");
  header.style.marginBottom = "12px";

  const tabs = document.createElement("div");
  tabs.style.display = "flex";
  tabs.style.flexWrap = "wrap";

  const iconMap: Record<string, string> = {
    summary: "🧠 Summary",
    actions: "📌 Actions",
    chapters: "📅 Chapters",
  };

  const renderSection = (sectionKey: string) => {
    contentContainer.innerHTML = "";
    const ul = document.createElement("ul");
    sections[sectionKey].forEach((line) => ul.appendChild(formatLine(line)));
    contentContainer.appendChild(ul);
  };

  Object.keys(sections).forEach((key, index) => {
    const label = iconMap[key] || key;
    const tab = createTab(label, index === 0, () => renderSection(key));
    tabs.appendChild(tab);
  });

  header.appendChild(tabs);
  return { header, renderSection };
}

function injectSummary(sections: Record<string, string[]>): void {
  const secondary = document.querySelector("#secondary");
  if (!secondary) {
    console.warn("Zone secondaire introuvable !");
    return;
  }

  const dark = isDarkTheme();

  const container = document.createElement("div");
  container.style.background = "var(--yt-spec-badge-chip-background)";
  container.style.borderRadius = "12px";
  container.style.marginTop = "24px";
  container.style.marginBottom = "16px";
  container.style.padding = "16px";
  container.style.fontFamily = `"Roboto", "Arial", sans-serif`;
  container.style.fontSize = "1.4rem";
  container.style.lineHeight = "2rem";
  container.style.fontWeight = "400";
  container.style.color = dark ? "rgb(255, 255, 255)" : "#000";
  container.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.08)";

  const content = document.createElement("div");

  const { header, renderSection } = createHeaderTabs(sections, content);
  container.appendChild(header);

  // Trait séparateur
  const separator = document.createElement("div");
  separator.style.height = "1px";
  separator.style.backgroundColor = "#ddd";
  separator.style.margin = "10px 0";
  container.appendChild(separator);

  container.appendChild(content);
  renderSection("summary");

  secondary.prepend(container);
}

function waitForElement(selector: string, callback: (el: Element) => void) {
  const observer = new MutationObserver(() => {
    const el = document.querySelector(selector);
    if (el) {
      observer.disconnect();
      callback(el);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

(async () => {
  const videoId = getVideoId();
  if (!videoId) return;

  const summaryData = await fetchSummary(videoId);
  if (!summaryData) return;

  waitForElement("#secondary", () => injectSummary(summaryData));
})();
