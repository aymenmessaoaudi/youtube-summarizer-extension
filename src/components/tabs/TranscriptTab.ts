import { Summary, TranscriptItem } from '../../interfaces';
import { Tab } from './Tab';

export class TranscriptTab implements Tab {
  private element: HTMLElement;
  
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'youtube-summary-tab-content transcript-tab';
    this.init();
  }
  
  private init(): void {
    // Initialiser le contenu par défaut
    this.element.innerHTML = `
      <div class="youtube-summary-tab-header">
        <h3>Transcript</h3>
      </div>
      <div class="youtube-summary-tab-body">
        <p class="youtube-summary-loading-text">Cliquez sur le bouton "Résumer la vidéo" pour générer la transcription.</p>
      </div>
    `;
  }
  
  public getElement(): HTMLElement {
    return this.element;
  }
  
  public update(data: Summary): void {
    // Si nous avons des données de transcript, les afficher
    const bodyElement = this.element.querySelector('.youtube-summary-tab-body');
    if (!bodyElement) return;
    
    if (data && data.transcript && data.transcript.length > 0) {
      const transcriptHTML = data.transcript
        .map(item => {
          const time = this.formatTime(item.start);
          return `
            <div class="youtube-summary-transcript-item">
              <a href="#t=${Math.floor(item.start)}" class="youtube-summary-timestamp" data-seconds="${Math.floor(item.start)}">${time}</a>
              <p class="youtube-summary-transcript-text">${item.text}</p>
            </div>
          `;
        })
        .join('');
      
      bodyElement.innerHTML = transcriptHTML || '<p>Aucune transcription disponible.</p>';
      
      // Ajouter des écouteurs d'événements pour les timestamps
      const timestampElements = this.element.querySelectorAll('.youtube-summary-timestamp');
      if (timestampElements) {
        timestampElements.forEach(timestamp => {
          timestamp.addEventListener('click', (e) => {
            e.preventDefault();
            const seconds = parseInt((e.currentTarget as HTMLElement).dataset.seconds || '0', 10);
            this.seekToTimestamp(seconds);
          });
        });
      }
    } else {
      bodyElement.innerHTML = '<p>Aucune transcription disponible.</p>';
    }
  }
  
  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  private seekToTimestamp(seconds: number): void {
    // Cette fonction sera utilisée pour aller à un timestamp spécifique dans la vidéo YouTube
    console.log(`Seeking to timestamp: ${seconds} seconds`);
  }
  
  public onActivate(): void {
    // Actions à effectuer lorsque cet onglet devient actif
    this.element.classList.add('active');
  }
  
  public onDeactivate(): void {
    // Actions à effectuer lorsque cet onglet devient inactif
    this.element.classList.remove('active');
  }
}
