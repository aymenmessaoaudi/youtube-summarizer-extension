import { ICONS } from '../constants/icons';
import { ExportOption } from '../interfaces/Summary';

export class ExportMenu {
  private container!: HTMLDivElement;
  private menu!: HTMLDivElement;
  private button!: HTMLButtonElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.style.position = 'relative';
    this.init();
  }

  private init(): void {
    this.createButton();
    this.createMenu();
    this.setupEventListeners();
  }

  private createButton(): void {
    this.button = document.createElement('button');
    this.button.className = 'youtube-summary-action-button';
    this.button.title = 'Export';
    this.button.innerHTML = ICONS.export;
    this.container.appendChild(this.button);
  }

  private createMenu(): void {
    this.menu = document.createElement('div');
    this.menu.className = 'youtube-summary-export-menu';

    const exportOptions: ExportOption[] = [
      { icon: ICONS.link, text: 'Copy Link', format: 'link' },
      { icon: ICONS.text, text: 'Copy Text', format: 'text' },
      { icon: ICONS.text, text: 'Export as TXT', format: 'txt' },
      { icon: ICONS.text, text: 'Export as DOC', format: 'doc' },
      { icon: ICONS.text, text: 'Export as PDF', format: 'pdf' },
      { icon: ICONS.text, text: 'Export as Markdown', format: 'markdown' }
    ];

    exportOptions.forEach(option => {
      const item = document.createElement('div');
      item.className = 'youtube-summary-export-item';
      item.innerHTML = `${option.icon} ${option.text}`;
      item.onclick = () => this.handleExport(option.format);
      this.menu.appendChild(item);
    });

    this.container.appendChild(this.menu);
  }

  private setupEventListeners(): void {
    this.button.onclick = () => {
      this.menu.classList.toggle('show');
    };

    document.addEventListener('click', (e) => {
      if (!this.menu.contains(e.target as Node) && 
          !(e.target as Element).closest('.youtube-summary-action-button')) {
        this.menu.classList.remove('show');
      }
    });
  }

  private handleExport(format: string): void {
    // TODO: Implémenter l'export selon le format
    console.log('Export format:', format);
    this.menu.classList.remove('show');
  }

  public getElement(): HTMLDivElement {
    return this.container;
  }
}
