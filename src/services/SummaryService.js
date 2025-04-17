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
            console.log("Données de résumé récupérées :", data);
            // Traiter le résumé comme un tableau de points
            const summaryPoints = Array.isArray(data.summary)
                ? data.summary
                : data.summary.split('\n')
                    .map((line) => line.trim())
                    .filter((line) => line.length > 0);
            // Données mock formatées selon les nouveaux types
            const timestampedSummaryMock = [
                { time: 0, seconds: 0, text: "Introduction" },
                { time: 30, seconds: 30, text: "Faits importants" },
                { time: 70, seconds: 70, text: "Analyse politique" }
            ];
            const transcriptMock = [
                { start: 0, duration: 5, text: "Lorem ipsum dolor sit amet..." },
                { start: 41, duration: 6, text: "Consectetur adipiscing elit..." },
                { start: 82, duration: 8, text: "Sed do eiusmod tempor incididunt..." }
            ];
            const commentsMock = [
                { author: "UserA", text: "Super vidéo, très instructif !", likes: 42 },
                { author: "UserB", text: "Excellente analyse des événements.", likes: 27 },
                { author: "UserC", text: "Merci pour ces explications détaillées.", likes: 15 }
            ];
            return {
                summary: summaryPoints,
                timestampedSummary: timestampedSummaryMock,
                transcript: transcriptMock,
                comments: commentsMock
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
