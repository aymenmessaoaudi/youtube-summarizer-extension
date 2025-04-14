import { ICONS } from '../constants';
import { TabConfig, Summary } from '../interfaces';
import { ExportMenu } from './';

export class Header {
  private element: HTMLDivElement;
  private tabs: HTMLDivElement;
  private onSectionChange: (section: keyof Summary) => void;

  constructor(onSectionChange: (section: keyof Summary) => void) {
    this.element = document.createElement('div');
    this.element.className = 'youtube-summary-header';
    this.tabs = document.createElement('div');
    this.tabs.className = 'youtube-summary-tabs';
    this.onSectionChange = onSectionChange;
    this.init();
  }

  private init(): void {
    const leftSection = this.createLeftSection();
    const centerSection = this.createCenterSection();
    const rightSection = this.createRightSection();

    this.element.appendChild(leftSection);
    this.element.appendChild(centerSection);
    this.element.appendChild(rightSection);
  }

  private createLeftSection(): HTMLDivElement {
    const section = document.createElement('div');
    section.className = 'youtube-summary-header-left';
    return section;
  }

  private createCenterSection(): HTMLDivElement {
    const section = document.createElement('div');
    section.className = 'youtube-summary-header-center';
    
    const tabsConfig: Record<keyof Summary, TabConfig> = {
      summary: { icon: ICONS.brain, tooltip: 'Résumé' },
      timestampedSummary: { icon: ICONS.clock, tooltip: 'Points clés' },
      transcript: { icon: ICONS.transcript, tooltip: 'Transcription' },
      comments: { icon: ICONS.comments, tooltip: 'Top Comments' }
    };

    // Créer les tabs dans l'ordre souhaité
    const tabOrder: (keyof Summary)[] = ['summary', 'timestampedSummary', 'transcript', 'comments'];
    
    tabOrder.forEach((sectionName, index) => {
      const { icon, tooltip } = tabsConfig[sectionName];
      const tab = this.createTab(icon, tooltip, index === 0, () => {
        this.tabs.querySelectorAll('.youtube-summary-tab').forEach(t => 
          t.classList.remove('selected')
        );
        tab.classList.add('selected');
        this.onSectionChange(sectionName);
      });
      this.tabs.appendChild(tab);
    });

    section.appendChild(this.tabs);
    return section;
  }

  private createRightSection(): HTMLDivElement {
    const section = document.createElement('div');
    section.className = 'youtube-summary-header-right';

    const exportMenu = new ExportMenu();
    const filterButton = this.createActionButton(ICONS.filter, 'Filter', () => {
      console.log('Show filter');
    });
    
    const userAvatar = document.createElement('div');
    userAvatar.className = 'youtube-summary-user-avatar';
    userAvatar.innerHTML = '<img src="https://www.gravatar.com/avatar/?d=mp" alt="User" />';

    section.appendChild(exportMenu.getElement());
    section.appendChild(filterButton);
    section.appendChild(userAvatar);

    return section;
  }

  private createActionButton(icon: string, tooltip: string, onClick: () => void): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'youtube-summary-action-button';
    button.title = tooltip;
    button.innerHTML = icon;
    button.onclick = onClick;
    return button;
  }

  private createTab(icon: string, tooltip: string, isSelected: boolean, onClick: () => void): HTMLDivElement {
    const tab = document.createElement('div');
    tab.className = `youtube-summary-tab${isSelected ? ' selected' : ''}`;
    tab.title = tooltip;
    tab.innerHTML = icon;
    tab.onclick = onClick;
    return tab;
  }

  public getElement(): HTMLDivElement {
    return this.element;
  }
}
