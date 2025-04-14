import { Summary } from '../interfaces';

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
    // Header Eightify-like: left (logo), center (tabs), right (actions)
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
    // Logo Eightify style (diamond)
    section.innerHTML = `<div class="eightify-logo" style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:10px;border:1.5px solid #e5e7eb;box-shadow:0 1px 4px 0 #0001;margin-right:8px;"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="22" height="22" rx="7" fill="#fff"/><path d="M11 4L17 11L11 18L5 11L11 4Z" fill="#111"/></svg></div>`;
    return section;
  }

  private createCenterSection(): HTMLDivElement {
    const section = document.createElement('div');
    section.className = 'youtube-summary-header-center';
    // Tabs Eightify-style
    const tabs = document.createElement('div');
    tabs.className = 'eightify-tabs';
    // Générer dynamiquement les tabs selon les clés de Summary
    const summaryKeys: (keyof Summary)[] = ['summary', 'timestampedSummary', 'transcript', 'comments'];
    const tabData: Record<keyof Summary, { icon: string; tooltip: string }> = {
      summary: {
        icon: `<svg width="18" height="18" fill="none"><rect x="3" y="4" width="12" height="10" rx="2" fill="#bbb"/><rect x="5" y="6" width="8" height="1.5" rx="0.75" fill="#fff"/><rect x="5" y="9" width="6" height="1.5" rx="0.75" fill="#fff"/></svg>`,
        tooltip: 'Résumé',
      },
      timestampedSummary: {
        icon: `<svg width="18" height="18" fill="none"><circle cx="9" cy="9" r="7" stroke="#bbb" stroke-width="2"/><path d="M9 5v4l3 2" stroke="#bbb" stroke-width="1.5" stroke-linecap="round"/></svg>`,
        tooltip: 'Points clés',
      },
      transcript: {
        icon: `<svg width="18" height="18" fill="none"><rect x="4" y="5" width="10" height="8" rx="2" fill="#bbb"/><rect x="6" y="7" width="6" height="1.5" rx="0.75" fill="#fff"/><rect x="6" y="10" width="4" height="1.5" rx="0.75" fill="#fff"/></svg>`,
        tooltip: 'Transcription',
      },
      comments: {
        icon: `<svg width="18" height="18" fill="none"><ellipse cx="9" cy="8" rx="7" ry="5" stroke="#bbb" stroke-width="2"/><path d="M9 13c-3 0-5-1.5-5-3" stroke="#bbb" stroke-width="1.5"/><circle cx="7" cy="8" r="1" fill="#bbb"/><circle cx="9" cy="8" r="1" fill="#bbb"/><circle cx="11" cy="8" r="1" fill="#bbb"/></svg>`,
        tooltip: 'Commentaires',
      },
    };
    summaryKeys.forEach((key, index) => {
      const tabDiv = document.createElement('div');
      tabDiv.className = `eightify-tab${index === 0 ? ' selected' : ''}`;
      tabDiv.title = tabData[key].tooltip;
      tabDiv.innerHTML = tabData[key].icon;
      tabDiv.onclick = () => {
        tabs.querySelectorAll('.eightify-tab').forEach(t => t.classList.remove('selected'));
        tabDiv.classList.add('selected');
        this.onSectionChange(key);
      };
      tabs.appendChild(tabDiv);
    });
    section.appendChild(tabs);
    return section;
  }

  private createRightSection(): HTMLDivElement {
    const section = document.createElement('div');
    section.className = 'youtube-summary-header-right';
    // Actions Eightify-style
    section.innerHTML = `
      <button class="eightify-action" title="Like" style="background:none;border:none;padding:6px 8px;cursor:pointer;"><svg width="20" height="20" fill="none"><path d="M6 10l4 4 4-4" stroke="#bbb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <button class="eightify-action" title="Share" style="background:none;border:none;padding:6px 8px;cursor:pointer;"><svg width="20" height="20" fill="none"><path d="M4 12v4a2 2 0 002 2h8a2 2 0 002-2v-4" stroke="#bbb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 6l-4-4-4 4" stroke="#bbb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <button class="eightify-action" title="Settings" style="background:none;border:none;padding:6px 8px;cursor:pointer;"><svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="3" stroke="#bbb" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 007.1 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82A1.65 1.65 0 013 15V15a1.65 1.65 0 00-1.51-1H1a2 2 0 010-4h.09A1.65 1.65 0 003 7.1a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 007.1 4.6a1.65 1.65 0 001.82-.33L9 4.21A2 2 0 0113 4.21l-.06.06a1.65 1.65 0 001.82.33 1.65 1.65 0 001.51 1H19a2 2 0 010 4h-.09A1.65 1.65 0 0019.4 15z" stroke="#bbb" stroke-width="2"/></svg></button>
      <div class="eightify-avatar" style="width:28px;height:28px;border-radius:50%;overflow:hidden;margin-left:8px;"><img src="https://www.gravatar.com/avatar/?d=mp" alt="User" style="width:100%;height:100%;object-fit:cover;"/></div>
    `;
    return section;
  }

  public getElement(): HTMLDivElement {
    return this.element;
  }
}
