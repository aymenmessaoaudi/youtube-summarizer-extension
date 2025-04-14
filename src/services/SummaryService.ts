import { Summary } from '../interfaces/Summary';

export class SummaryService {
  private static instance: SummaryService;
  private apiUrl = 'http://localhost:5000/api/summarize';

  private constructor() {}

  public static getInstance(): SummaryService {
    if (!SummaryService.instance) {
      SummaryService.instance = new SummaryService();
    }
    return SummaryService.instance;
  }

  public async fetchSummary(videoId: string): Promise<Summary | null> {
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
          .map((line: string) => line.trim())
          .filter((line: string) => line.length > 0);

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
    } catch (error) {
      console.error("Erreur lors de la récupération du résumé :", error);
      return null;
    }
  }

  public async getVideoId(): Promise<string | null> {
    const url = window.location.href;
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  }
}
