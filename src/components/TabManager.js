import { SummaryTab } from './tabs/SummaryTab';
import { TimestampedSummaryTab } from './tabs/TimestampedSummaryTab';
import { TranscriptTab } from './tabs/TranscriptTab';
import { CommentsTab } from './tabs/CommentsTab';
export class TabManager {
    container;
    tabs;
    activeTab;
    summaryData = null;
    constructor(container) {
        this.container = container;
        this.tabs = new Map();
        this.activeTab = 'summary';
        // Initialiser tous les onglets
        this.tabs.set('summary', new SummaryTab());
        this.tabs.set('timestampedSummary', new TimestampedSummaryTab());
        this.tabs.set('transcript', new TranscriptTab());
        this.tabs.set('comments', new CommentsTab());
        // Par défaut, on montre le premier onglet (summary)
        this.showTab('summary');
    }
    // Change l'onglet actif
    switchTab(tabType) {
        if (this.activeTab === tabType)
            return; // Ne rien faire si c'est déjà l'onglet actif
        // Désactiver l'onglet actuel
        if (this.activeTab && this.tabs.has(this.activeTab)) {
            this.tabs.get(this.activeTab)?.onDeactivate();
        }
        // Activer le nouvel onglet
        this.activeTab = tabType;
        this.showTab(tabType);
    }
    // Affiche l'onglet spécifié
    showTab(tabType) {
        // Vider le conteneur
        this.container.innerHTML = '';
        // Obtenir l'onglet spécifié
        const tab = this.tabs.get(tabType);
        if (!tab)
            return;
        // Mettre à jour l'onglet avec les données actuelles
        if (this.summaryData) {
            tab.update(this.summaryData);
        }
        // Activer l'onglet et l'ajouter au conteneur
        tab.onActivate();
        this.container.appendChild(tab.getElement());
    }
    // Met à jour les données et actualise l'onglet actif
    updateData(data) {
        this.summaryData = data;
        // Mettre à jour tous les onglets avec les nouvelles données
        this.tabs.forEach(tab => tab.update(data));
        // Réafficher l'onglet actif
        this.showTab(this.activeTab);
    }
    // Obtient l'élément DOM du gestionnaire d'onglets
    getElement() {
        return this.container;
    }
    // Retourne le type d'onglet actif
    getActiveTab() {
        return this.activeTab;
    }
}
