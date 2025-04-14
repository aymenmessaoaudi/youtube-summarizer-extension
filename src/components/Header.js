import { ICONS } from '../constants';
import { ExportMenu } from './';
export class Header {
    element;
    tabs;
    onSectionChange;
    constructor(onSectionChange) {
        this.element = document.createElement('div');
        this.element.className = 'youtube-summary-header';
        this.tabs = document.createElement('div');
        this.tabs.className = 'youtube-summary-tabs';
        this.onSectionChange = onSectionChange;
        this.init();
    }
    init() {
        const leftSection = this.createLeftSection();
        const centerSection = this.createCenterSection();
        const rightSection = this.createRightSection();
        this.element.appendChild(leftSection);
        this.element.appendChild(centerSection);
        this.element.appendChild(rightSection);
    }
    createLeftSection() {
        const section = document.createElement('div');
        section.className = 'youtube-summary-header-left';
        return section;
    }
    createCenterSection() {
        const section = document.createElement('div');
        section.className = 'youtube-summary-header-center';
        const tabsConfig = {
            summary: { icon: ICONS.brain, tooltip: 'Résumé' },
            timestampedSummary: { icon: ICONS.clock, tooltip: 'Points clés' },
            transcript: { icon: ICONS.transcript, tooltip: 'Transcription' },
            comments: { icon: ICONS.comments, tooltip: 'Top Comments' }
        };
        // Créer les tabs dans l'ordre souhaité
        const tabOrder = ['summary', 'timestampedSummary', 'transcript', 'comments'];
        tabOrder.forEach((sectionName, index) => {
            const { icon, tooltip } = tabsConfig[sectionName];
            const tab = this.createTab(icon, tooltip, index === 0, () => {
                this.tabs.querySelectorAll('.youtube-summary-tab').forEach(t => t.classList.remove('selected'));
                tab.classList.add('selected');
                this.onSectionChange(sectionName);
            });
            this.tabs.appendChild(tab);
        });
        section.appendChild(this.tabs);
        return section;
    }
    createRightSection() {
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
    createActionButton(icon, tooltip, onClick) {
        const button = document.createElement('button');
        button.className = 'youtube-summary-action-button';
        button.title = tooltip;
        button.innerHTML = icon;
        button.onclick = onClick;
        return button;
    }
    createTab(icon, tooltip, isSelected, onClick) {
        const tab = document.createElement('div');
        tab.className = `youtube-summary-tab${isSelected ? ' selected' : ''}`;
        tab.title = tooltip;
        tab.innerHTML = icon;
        tab.onclick = onClick;
        return tab;
    }
    getElement() {
        return this.element;
    }
}
