import { Summary, CommentItem } from '../../interfaces';
import { Tab } from './Tab';

export class CommentsTab implements Tab {
  private element: HTMLElement;
  
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'youtube-summary-tab-content comments-tab';
    this.init();
  }
  
  private init(): void {
    // Initialiser le contenu par défaut
    this.element.innerHTML = `
      <div class="youtube-summary-tab-header">
        <h3>Top Comments</h3>
      </div>
      <div class="youtube-summary-tab-body">
        <p class="youtube-summary-loading-text">Cliquez sur le bouton "Résumer la vidéo" pour charger les commentaires.</p>
      </div>
    `;
  }
  
  public getElement(): HTMLElement {
    return this.element;
  }
  
  public update(data: Summary): void {
    // Si nous avons des données de commentaires, les afficher
    const bodyElement = this.element.querySelector('.youtube-summary-tab-body');
    if (!bodyElement) return;
    
    if (data && data.comments && data.comments.length > 0) {
      const commentsHTML = data.comments
        .map(comment => `
          <div class="youtube-summary-comment-item">
            <div class="youtube-summary-comment-author">${comment.author}</div>
            <div class="youtube-summary-comment-text">${comment.text}</div>
            <div class="youtube-summary-comment-metrics">
              <span class="youtube-summary-comment-likes">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ${comment.likes}
              </span>
            </div>
          </div>
        `)
        .join('');
      
      bodyElement.innerHTML = commentsHTML || '<p>Aucun commentaire disponible.</p>';
    } else {
      bodyElement.innerHTML = '<p>Aucun commentaire disponible.</p>';
    }
  }
  
  public onActivate(): void {
    // Actions à effectuer lorsque cet onglet devient actif
    this.element.classList.add('active');
  }
  
  public onDeactivate(): void {
    // Actions à effectuer lorsque cet onglet devient inactif
    this.element.classList.remove('active');
  }
}
