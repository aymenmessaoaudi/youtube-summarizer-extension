import { Summary } from '../interfaces';
import { Header } from './Header';
import { TabManager, TabType } from './TabManager';

export class YoutubeSummarizer {
  private container: HTMLElement;
  private header: Header;
  private tabManager: TabManager;
  private contentContainer: HTMLElement;
  private summaryData: Summary | null = null;
  
  constructor(container: HTMLElement) {
    this.container = container;
    this.contentContainer = document.createElement('div');
    this.contentContainer.className = 'youtube-summary-content';
    
    // Initialiser le gestionnaire d'onglets
    this.tabManager = new TabManager(this.contentContainer);
    
    // Initialiser l'entête avec la gestion du changement d'onglet
    this.header = new Header((tabType: TabType) => this.switchTab(tabType));
    
    // Construire l'interface
    this.buildUI();
  }
  
  private buildUI(): void {
    // Vider le conteneur principal
    this.container.innerHTML = '';
    
    // Ajouter l'entête et le conteneur de contenu
    this.container.appendChild(this.header.getElement());
    this.container.appendChild(this.contentContainer);
    
    // Activer l'onglet par défaut (summary)
    this.switchTab('summary');
  }
  
  private switchTab(tabType: TabType): void {
    // Changer l'onglet actif dans le gestionnaire d'onglets
    this.tabManager.switchTab(tabType);
  }
  
  // Met à jour les données et rafraîchit l'interface
  public updateData(data: Summary): void {
    this.summaryData = data;
    this.tabManager.updateData(data);
  }
  
  // Méthode pour mettre à jour manuellement l'entête (par exemple, pour changer le titre)
  public updateHeader(): void {
    // Mettre à jour l'entête si nécessaire
    // Exemple : this.header.setTitle(newTitle);
  }
  
  // Méthode pour obtenir l'élément DOM du résumé YouTube
  public getElement(): HTMLElement {
    return this.container;
  }
  
  // Pour les exportations et partages
  public exportSummary(format: string): string {
    // Implémenter la logique d'exportation en fonction du format demandé
    // Exemple basique :
    if (!this.summaryData) return '';
    
    switch (format) {
      case 'text':
        return this.summaryData.summary.join('\n\n');
      case 'markdown':
        return `# Résumé de la vidéo\n\n${this.summaryData.summary.map(item => `- ${item}`).join('\n')}`;
      default:
        return this.summaryData.summary.join('\n\n');
    }
  }
}
