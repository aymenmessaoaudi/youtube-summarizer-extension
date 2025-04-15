export class TimestampedSummaryTab {
    element;
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'youtube-summary-tab-content timestamped-summary-tab';
        this.init();
    }
    init() {
        // Initialiser le contenu par défaut
        this.element.innerHTML = `
      <div class="youtube-summary-tab-header">
        <h3>Timestamped Summary</h3>
      </div>
      <div class="youtube-summary-tab-body">
        <p class="youtube-summary-loading-text">Cliquez sur le bouton "Résumer la vidéo" pour générer un résumé temporel.</p>
      </div>
    `;
    }
    getElement() {
        return this.element;
    }
    update(data) {
        // Si nous avons des données de résumé temporel, les afficher
        const bodyElement = this.element.querySelector('.youtube-summary-tab-body');
        if (!bodyElement)
            return;
        if (data && data.timestampedSummary && data.timestampedSummary.length > 0) {
            const timestampedHTML = data.timestampedSummary
                .map(item => {
                const time = this.formatTime(item.time);
                return `
            <div class="youtube-summary-timestamped-item">
              <a href="#t=${item.seconds}" class="youtube-summary-timestamp" data-seconds="${item.seconds}">${time}</a>
              <p class="youtube-summary-timestamped-text">${item.text}</p>
            </div>
          `;
            })
                .join('');
            bodyElement.innerHTML = timestampedHTML || '<p>Aucun résumé temporel disponible.</p>';
            // Ajouter des écouteurs d'événements pour les timestamps
            const timestampElements = this.element.querySelectorAll('.youtube-summary-timestamp');
            if (timestampElements) {
                timestampElements.forEach(timestamp => {
                    timestamp.addEventListener('click', (e) => {
                        e.preventDefault();
                        const seconds = parseInt(e.currentTarget.dataset.seconds || '0', 10);
                        this.seekToTimestamp(seconds);
                    });
                });
            }
        }
        else {
            bodyElement.innerHTML = '<p>Aucun résumé temporel disponible.</p>';
        }
    }
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    seekToTimestamp(seconds) {
        // Cette fonction sera utilisée pour aller à un timestamp spécifique dans la vidéo YouTube
        console.log(`Seeking to timestamp: ${seconds} seconds`);
        // Dans une implémentation réelle, on pourrait faire :
        // chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        //   chrome.tabs.sendMessage(tabs[0].id, {action: "seekToTime", time: seconds});
        // });
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
