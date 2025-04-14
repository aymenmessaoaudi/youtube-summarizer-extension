import { ICONS } from '../constants';

export class SummarizeButton {
  private button: HTMLButtonElement;

  constructor(onClick: () => void) {
    this.button = document.createElement('button');
    this.button.className = 'youtube-summary-button';
    this.button.innerHTML = `${ICONS.brain} Résumer la vidéo`;
    this.button.onclick = onClick;
  }

  public getElement(): HTMLButtonElement {
    return this.button;
  }

  public disable(): void {
    this.button.disabled = true;
    this.button.innerHTML = `${ICONS.brain} Génération en cours...`;
  }

  public enable(): void {
    this.button.disabled = false;
    this.button.innerHTML = `${ICONS.brain} Résumer la vidéo`;
  }

  public hide(): void {
    this.button.style.display = 'none';
  }

  public show(): void {
    this.button.style.display = 'flex';
  }
}
