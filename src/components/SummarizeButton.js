import { ICONS } from '../constants';
export class SummarizeButton {
    button;
    constructor(onClick) {
        this.button = document.createElement('button');
        this.button.className = 'youtube-summary-button';
        this.button.innerHTML = `${ICONS.brain} Résumer la vidéo`;
        this.button.onclick = onClick;
    }
    getElement() {
        return this.button;
    }
    disable() {
        this.button.disabled = true;
        this.button.innerHTML = `${ICONS.brain} Génération en cours...`;
    }
    enable() {
        this.button.disabled = false;
        this.button.innerHTML = `${ICONS.brain} Résumer la vidéo`;
    }
    hide() {
        this.button.style.display = 'none';
    }
    show() {
        this.button.style.display = 'flex';
    }
}
