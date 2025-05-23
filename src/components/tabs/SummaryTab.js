export class SummaryTab {
    element;
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'youtube-summary-tab-content summary-tab';
        this.init();
    }
    init() {
        // Initialiser le contenu par défaut
        this.element.innerHTML = `
      <div class="youtube-summary-tab-header">
        <h3>Key Insights</h3>
      </div>
      <div class="youtube-summary-tab-body">
        <p class="youtube-summary-loading-text">Cliquez sur le bouton "Résumer la vidéo" pour générer un résumé.</p>
      </div>
    `;
    }
    getElement() {
        return this.element;
    }
    update(data) {
        // Si nous avons des données de résumé, les afficher
        const bodyElement = this.element.querySelector('.youtube-summary-tab-body');
        if (!bodyElement)
            return;
        if (data && data.summary) {
            const summaryHTML = data.summary
                .map(item => `<p class="youtube-summary-item">${item}</p>`)
                .join('');
            bodyElement.innerHTML = summaryHTML || '<p>Aucun résumé disponible.</p>';
        }
        else {
            bodyElement.innerHTML = '<p>Aucun résumé disponible.</p>';
        }
    }
    onActivate() {
        // Actions à effectuer lorsque cet onglet devient actif
        this.element.classList.add('active');
    }
    onDeactivate() {
        // Actions à effectuer lorsque cet onglet devient inactif
        this.element.classList.remove('active');
    }
}
