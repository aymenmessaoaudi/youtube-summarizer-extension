import { Header } from './Header';
import { TabManager } from './TabManager';
export class YoutubeSummarizer {
    container;
    header;
    tabManager;
    contentContainer;
    summaryData = null;
    constructor(container) {
        this.container = container;
        this.contentContainer = document.createElement('div');
        this.contentContainer.className = 'youtube-summary-content';
        // Initialiser le gestionnaire d'onglets
        this.tabManager = new TabManager(this.contentContainer);
        // Initialiser l'entête avec la gestion du changement d'onglet
        this.header = new Header((tabType) => this.switchTab(tabType));
        // Construire l'interface
        this.buildUI();
    }
    buildUI() {
        // Vider le conteneur principal
        this.container.innerHTML = '';
        // Ajouter l'entête et le conteneur de contenu
        this.container.appendChild(this.header.getElement());
        this.container.appendChild(this.contentContainer);
        // Activer l'onglet par défaut (summary)
        this.switchTab('summary');
    }
    switchTab(tabType) {
        // Changer l'onglet actif dans le gestionnaire d'onglets
        this.tabManager.switchTab(tabType);
    }
    // Met à jour les données et rafraîchit l'interface
    updateData(data) {
        this.summaryData = data;
        this.tabManager.updateData(data);
    }
    // Méthode pour mettre à jour manuellement l'entête (par exemple, pour changer le titre)
    updateHeader() {
        // Mettre à jour l'entête si nécessaire
        // Exemple : this.header.setTitle(newTitle);
    }
    // Méthode pour obtenir l'élément DOM du résumé YouTube
    getElement() {
        return this.container;
    }
    // Pour les exportations et partages
    exportSummary(format) {
        // Implémenter la logique d'exportation en fonction du format demandé
        // Exemple basique :
        if (!this.summaryData)
            return '';
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
