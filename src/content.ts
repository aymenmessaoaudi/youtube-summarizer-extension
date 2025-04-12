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

function injectSummary(summaryLines: string[]): void {
  const adsPanel = document.querySelector<HTMLElement>(
    'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"]'
  );

  if (!adsPanel) {
    console.warn("Panneau de publicité non trouvé.");
    return;
  }

  // Détecter thème sombre
  const isDarkMode = document.documentElement.getAttribute("dark") !== null;

  // Choisir les couleurs selon le thème
  const backgroundColor = isDarkMode ? "#1e1e1e" : "#f9f9f9";
  const borderColor = isDarkMode ? "#333" : "#ccc";
  const textColor = isDarkMode ? "#f1f1f1" : "#000";

  // Crée un conteneur pour le résumé
  const container = document.createElement("div");
  container.style.background = backgroundColor;
  container.style.border = `1px solid ${borderColor}`;
  container.style.padding = "10px";
  container.style.marginBottom = "10px";
  container.style.borderRadius = "8px";
  container.style.color = textColor;

  // Titre
  const title = document.createElement("h3");
  title.textContent = "🧠 Résumé de la vidéo";
  title.style.marginBottom = "8px";
  title.style.fontWeight = "bold";
  title.style.color = textColor;
  container.appendChild(title);

  // Liste des points
  const ul = document.createElement("ul");
  summaryLines.forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    li.style.marginBottom = "4px";
    li.style.color = textColor;
    ul.appendChild(li);
  });

  container.appendChild(ul);

  // Injecte au-dessus du bloc pub
  adsPanel.parentElement?.insertBefore(container, adsPanel);
}


// Exécution automatique
(async () => {
  const videoId = getVideoId();
  if (videoId) {
    const summary = await fetchSummary(videoId);
    if (summary) injectSummary(summary);
  }
})();
