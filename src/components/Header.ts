import { Summary } from '../interfaces';

export class Header {
  private element: HTMLDivElement;
  private tabs: HTMLDivElement;
  private onSectionChange: (section: keyof Summary) => void;
  private exportMenu: HTMLDivElement;
  private isExportMenuOpen: boolean = false;

  constructor(onSectionChange: (section: keyof Summary) => void) {
    this.element = document.createElement('div');
    this.element.className = 'Header_container__Q1MWC youtube-summary-header';
    this.tabs = document.createElement('div');
    this.tabs.className = 'youtube-summary-tabs';
    this.onSectionChange = onSectionChange;
    this.exportMenu = document.createElement('div');
    this.exportMenu.className = 'youtube-summary-export-menu';
    this.init();
  }

  private init(): void {
    // Header Eightify-like: left (tools), center (empty), right (actions)
    const leftSection = this.createLeftSection();
    const centerSection = this.createCenterSection();
    const rightSection = this.createRightSection();

    this.element.appendChild(leftSection);
    this.element.appendChild(centerSection);
    this.element.appendChild(rightSection);

    // Close export menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isExportMenuOpen && !this.exportMenu.contains(e.target as Node) && 
          !(e.target as Element).closest('.youtube-summary-share-button')) {
        this.toggleExportMenu(false);
      }
    });
  }

  private createLeftSection(): HTMLDivElement {
    const section = document.createElement('div');
    section.className = 'youtube-summary-header-left';
    
    // Create container for icons with background
    const iconsContainer = document.createElement('div');
    iconsContainer.className = 'youtube-summary-icons-container';
    
    // Create icon buttons like Eightify header
    const diamondButton = document.createElement('button');
    diamondButton.className = 'youtube-summary-icon-button diamond-button selected'; 
    diamondButton.title = 'Key insights'; 
    diamondButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2L20 10L12 22L4 10L12 2Z" fill="currentColor"/>
      <path d="M12 10L8 7M12 10L16 7M12 10L12 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`; 
    
    const listButton = document.createElement('button');
    listButton.className = 'youtube-summary-icon-button list-button';
    listButton.title = 'Timestamped summary'; 
    listButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 6H3.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 12H3.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 18H3.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    
    const chatButton = document.createElement('button');
    chatButton.className = 'youtube-summary-icon-button chat-button';
    chatButton.title = 'Top comments'; 
    chatButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    
    const captionButton = document.createElement('button');
    captionButton.className = 'youtube-summary-icon-button caption-button';
    captionButton.title = 'Transcript'; 
    captionButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7C2 6.46957 2.21071 5.96086 2.58579 5.58579C2.96086 5.21071 3.46957 5 4 5H20C20.5304 5 21.0391 5.21071 21.4142 5.58579C21.7893 5.96086 22 6.46957 22 7V17C22 17.5304 21.7893 18.0391 21.4142 18.4142C21.0391 18.7893 20.5304 19 20 19H4C3.46957 19 2.96086 18.7893 2.58579 18.4142C2.21071 18.0391 2 17.5304 2 17V7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 9H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 13H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    
    // Add click handlers to manage selected state
    const allButtons = [diamondButton, listButton, chatButton, captionButton];
    allButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove selected class from all buttons
        allButtons.forEach(btn => btn.classList.remove('selected'));
        // Add selected class to the clicked button
        button.classList.add('selected');
      });
    });
    
    // Add all buttons to the container
    iconsContainer.appendChild(diamondButton);
    iconsContainer.appendChild(listButton);
    iconsContainer.appendChild(chatButton);
    iconsContainer.appendChild(captionButton);
    
    // Add the container to the section
    section.appendChild(iconsContainer);
    
    return section;
  }

  private createCenterSection(): HTMLDivElement {
    const section = document.createElement('div');
    section.className = 'youtube-summary-header-center';
    // Empty center section as in Eightify header
    return section;
  }

  private createRightSection(): HTMLDivElement {
    const section = document.createElement('div');
    section.className = 'youtube-summary-header-right';
    
    // Create copy button with tooltip
    const copyButton = document.createElement('button');
    copyButton.className = 'youtube-summary-action-button youtube-summary-copy-button';
    copyButton.title = 'Copy summary';
    copyButton.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" stroke-width="2"/></svg>`;
    
    // Create share button with dropdown
    const shareButton = document.createElement('button');
    shareButton.className = 'youtube-summary-action-button youtube-summary-share-button';
    shareButton.title = 'Share summary';
    shareButton.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49M21 5C21 6.65685 19.6569 8 18 8C16.3431 8 15 6.65685 15 5C15 3.34315 16.3431 2 18 2C19.6569 2 21 3.34315 21 5ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19C15 17.3431 16.3431 16 18 16C19.6569 16 21 17.3431 21 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    shareButton.addEventListener('click', () => this.toggleExportMenu());
    
    // Create settings/options button with improved icon
    const optionsButton = document.createElement('button');
    optionsButton.className = 'youtube-summary-action-button youtube-summary-options-button';
    optionsButton.title = 'Options';
    optionsButton.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z" stroke="currentColor" stroke-width="2"/>
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2"/>
    </svg>`; 
    
    // Create user avatar
    const userAvatar = document.createElement('div');
    userAvatar.className = 'youtube-summary-user-avatar';
    userAvatar.innerHTML = `<img src="https://www.gravatar.com/avatar/?d=mp" alt="User">`;
    
    // Create export menu (dropdown)
    this.createExportMenu();
    
    section.appendChild(copyButton);
    section.appendChild(shareButton);
    section.appendChild(optionsButton);
    section.appendChild(userAvatar);
    section.appendChild(this.exportMenu);
    
    return section;
  }

  private createExportMenu(): void {
    this.exportMenu.innerHTML = '';
    
    // Create the header for the menu
    const menuHeader = document.createElement('div');
    menuHeader.className = 'youtube-summary-export-header';
    menuHeader.textContent = 'COPY';
    this.exportMenu.appendChild(menuHeader);
    
    // Add copy options
    const copyOptions = [
      { id: 'link', label: 'Link', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z" fill="currentColor"/><path d="M10 21C7.17157 21 5.24816 21 3.96864 19.7205C2.68913 18.441 2.68913 16.5176 2.68913 13.6891L2.68913 10.3109C2.68913 7.48244 2.68913 5.55903 3.96864 4.27951C5.24816 3 7.17157 3 10 3L14 3C16.8284 3 18.7518 3 20.0314 4.27951C21.3109 5.55903 21.3109 7.48244 21.3109 10.3109V13.6891C21.3109 16.5176 21.3109 18.441 20.0314 19.7205C18.7518 21 16.8284 21 14 21H10Z" stroke="currentColor" stroke-width="2"/></svg>' },
      { id: 'text', label: 'Text', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' }
    ];
    
    copyOptions.forEach(option => {
      const item = document.createElement('div');
      item.className = 'youtube-summary-export-item';
      item.innerHTML = `${option.icon} ${option.label}`;
      item.dataset.action = option.id;
      item.addEventListener('click', () => this.handleExportAction(option.id));
      this.exportMenu.appendChild(item);
    });
    
    // Create divider
    const divider = document.createElement('div');
    divider.className = 'youtube-summary-export-divider';
    this.exportMenu.appendChild(divider);
    
    // Create export header
    const exportHeader = document.createElement('div');
    exportHeader.className = 'youtube-summary-export-header';
    exportHeader.textContent = 'EXPORT';
    this.exportMenu.appendChild(exportHeader);
    
    // Add export options
    const exportOptions = [
      { id: 'txt', label: 'Txt', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8M14 2L20 8M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' },
      { id: 'doc', label: 'Doc', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 13H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 17H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 9H10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' },
      { id: 'pdf', label: 'PDF', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4Z" stroke="currentColor" stroke-width="2"/><path d="M9 11V8H11.5C12.3284 8 13 8.67157 13 9.5C13 10.3284 12.3284 11 11.5 11H9Z" stroke="currentColor" stroke-width="2"/><path d="M9 11V16" stroke="currentColor" stroke-width="2"/><path d="M15.5 11V16" stroke="currentColor" stroke-width="2"/><path d="M15.5 13.5H13.5" stroke="currentColor" stroke-width="2"/></svg>' },
      { id: 'markdown', label: 'Markdown', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 10V16" stroke="currentColor" stroke-width="2"/><path d="M8 13L12 16" stroke="currentColor" stroke-width="2"/><path d="M12 13L16 16" stroke="currentColor" stroke-width="2"/><path d="M16 10V16" stroke="currentColor" stroke-width="2"/></svg>' }
    ];
    
    exportOptions.forEach(option => {
      const item = document.createElement('div');
      item.className = 'youtube-summary-export-item';
      item.innerHTML = `${option.icon} ${option.label}`;
      item.dataset.action = option.id;
      item.addEventListener('click', () => this.handleExportAction(option.id));
      this.exportMenu.appendChild(item);
    });
  }

  private toggleExportMenu(force?: boolean): void {
    this.isExportMenuOpen = force !== undefined ? force : !this.isExportMenuOpen;
    if (this.isExportMenuOpen) {
      this.exportMenu.classList.add('show');
    } else {
      this.exportMenu.classList.remove('show');
    }
  }

  private handleExportAction(action: string): void {
    this.toggleExportMenu(false);
    // Implement the actual export functionality based on the action
    console.log(`Export action: ${action}`);
    // You would handle the actual export functionality here
  }

  public getElement(): HTMLDivElement {
    return this.element;
  }
}
