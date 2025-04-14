import './styles/summary.css';
import { SummaryContainer } from './components';
import { getVideoId } from './utils';
function createSummaryContainer() {
    const container = document.createElement('div');
    container.id = 'youtube-summary-container';
    container.className = 'youtube-summary-container';
    return container;
}
function injectLoadingState() {
    // Cibler le conteneur des vidéos suggérées (#secondary)
    const secondary = document.querySelector("#secondary");
    if (!secondary)
        return;
    // Créer le bloc embarqué comme Eightify
    const embeddedBlock = document.createElement('div');
    embeddedBlock.className = 'youtube-summary-block-embedded';
    // Créer le wrapper du contenu
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'youtube-summary-content-wrapper';
    // Créer et injecter le container
    const container = createSummaryContainer();
    contentWrapper.appendChild(container);
    embeddedBlock.appendChild(contentWrapper);
    // Insérer au début de #secondary
    secondary.insertBefore(embeddedBlock, secondary.firstChild);
    // Initialiser le SummaryContainer avec tous ses composants
    new SummaryContainer(container);
}
function waitForElement(selector, maxAttempts = 20) {
    return new Promise((resolve) => {
        let attempts = 0;
        const checkElement = () => {
            attempts++;
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }
            if (attempts >= maxAttempts) {
                resolve(null);
                return;
            }
            setTimeout(checkElement, 500);
        };
        checkElement();
    });
}
// Initialisation
async function init() {
    const videoId = getVideoId();
    if (!videoId)
        return;
    // Attendre que l'élément secondary soit disponible
    const secondary = await waitForElement("#secondary");
    if (secondary) {
        // Supprimer l'ancien container s'il existe
        const oldContainer = document.querySelector('.youtube-summary-block-embedded');
        if (oldContainer) {
            oldContainer.remove();
        }
        injectLoadingState();
    }
}
// Réessayer l'initialisation si la page change
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        init();
    }
}).observe(document.body, { subtree: true, childList: true });
// Lancer l'initialisation
init();
