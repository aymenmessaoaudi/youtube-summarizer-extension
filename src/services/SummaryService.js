export class SummaryService {
    static instance;
    apiUrl = 'http://localhost:5000/api/summarize';
    constructor() { }
    static getInstance() {
        if (!SummaryService.instance) {
            SummaryService.instance = new SummaryService();
        }
        return SummaryService.instance;
    }
    async fetchSummary(videoId) {
        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ videoId, targetLang: "fr" }),
            });
            const data = await response.json();
            // Traiter le résumé comme un tableau de points
            const summaryPoints = Array.isArray(data.summary)
                ? data.summary
                : data.summary.split('\n')
                    .map((line) => line.trim())
                    .filter((line) => line.length > 0);
            return {
                summary: summaryPoints,
                timestampedSummary: [
                    "00:00 Introduction",
                    "00:30 Faits importants",
                    "01:10 Analyse politique"
                ],
                transcript: [
                    "00:00 Lorem ipsum dolor sit amet...",
                    "00:41 Consectetur adipiscing elit...",
                    "01:22 Sed do eiusmod tempor incididunt..."
                ],
                comments: [
                    "Super vidéo, très instructif !",
                    "Excellente analyse des événements.",
                    "Merci pour ces explications détaillées."
                ]
            };
        }
        catch (error) {
            console.error("Erreur lors de la récupération du résumé :", error);
            return null;
        }
    }
    async getVideoId() {
        const url = window.location.href;
        const match = url.match(/[?&]v=([^&]+)/);
        return match ? match[1] : null;
    }
}
