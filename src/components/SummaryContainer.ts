import { ICONS } from '../constants';
import { SummaryContent } from './SummaryContent';
import { SummarizeButton } from './SummarizeButton';
import { SummaryService } from '../services/SummaryService';
import { Header } from './Header';
import { Summary } from '../interfaces/Summary';

// export interface Summary {
//   summary: string[];
//   timestampedSummary: string[];
//   transcript: string[];
// }

interface TabItem {
  key: keyof Summary;
  icon: string;
  text: string;
}

export class SummaryContainer {
  private container: HTMLDivElement;
  private header: HTMLDivElement;
  private content: SummaryContent;
  private button: SummarizeButton;
  private buttonContainer: HTMLDivElement;
  private sections: Summary | null = null;
  private activeTab: keyof Summary = 'summary';

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.header = new Header((tab) => this.switchTab(tab)).getElement();
    this.content = new SummaryContent();
    this.button = new SummarizeButton(() => this.startSummarization());
    this.buttonContainer = this.createButtonContainer();
    this.init();
  }

  private createButtonContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'youtube-summary-button-container';
    container.appendChild(this.button.getElement());
    return container;
  }

  private init(): void {
    const bg = getComputedStyle(document.documentElement)
      .getPropertyValue('--yt-spec-base-background')
      .trim();
    if (bg === '#0f0f0f' || window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.container.classList.add('dark');
    }

    this.container.appendChild(this.header);
    this.container.appendChild(this.content.getElement());
    this.container.appendChild(this.buttonContainer);
  }

  private switchTab(tab: keyof Summary): void {
    if (!this.sections) return;
    
    const tabs = this.header.querySelectorAll('.youtube-summary-tab');
    tabs.forEach(t => t.classList.remove('selected'));
    
    const selectedTab = Array.from(tabs).find(t => 
      t.textContent?.includes(tab === 'timestampedSummary' ? 'Points clés' : 
        tab === 'transcript' ? 'Transcription' : 'Résumé')
    );
    if (selectedTab) {
      selectedTab.classList.add('selected');
    }

    this.activeTab = tab;
    this.renderSection(tab);
  }

  private async startSummarization(): Promise<void> {
    try {
      this.container.style.height = '600px';
      this.container.classList.add('expanded');
      
      this.content.showLoading();
      this.button.disable();
      
      const videoId = await SummaryService.getInstance().getVideoId();
      if (!videoId) {
        throw new Error('Could not find video ID');
      }
      
      const sections = await SummaryService.getInstance().fetchSummary(videoId);
      if (!sections) {
        throw new Error('Failed to fetch summary');
      }

      this.sections = sections;
      this.renderSection(this.activeTab);
      this.button.hide();
    } catch (error) {
      console.error('Error:', error);
      this.container.style.height = '300px';
      this.container.classList.remove('expanded');
      this.content.showError(error instanceof Error ? error.message : 'An error occurred');
      this.button.enable();
    }
  }

  private renderSection(sectionName: keyof Summary): void {
    if (!this.sections) return;
    const items = this.sections[sectionName];
    this.content.render(items);
    // Remove the bottom button container when summary is finalized
    if (this.buttonContainer && this.buttonContainer.parentElement) {
      this.buttonContainer.parentElement.removeChild(this.buttonContainer);
    }
  }
}
