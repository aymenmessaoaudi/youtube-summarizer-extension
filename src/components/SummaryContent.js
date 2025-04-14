export class SummaryContent {
    element;
    loadingElement;
    contentList;
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'youtube-summary-content';
        this.loadingElement = this.createLoadingElement();
        this.contentList = this.createContentList();
        this.element.appendChild(this.loadingElement);
        this.element.appendChild(this.contentList);
    }
    createLoadingElement() {
        const loading = document.createElement('div');
        loading.className = 'youtube-summary-loading';
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        loading.appendChild(spinner);
        const text = document.createElement('div');
        text.className = 'loading-text';
        text.textContent = 'Génération du résumé en cours...';
        loading.appendChild(text);
        return loading;
    }
    createContentList() {
        const list = document.createElement('ul');
        list.className = 'youtube-summary-list';
        return list;
    }
    getElement() {
        return this.element;
    }
    showLoading() {
        this.contentList.style.display = 'none';
        this.loadingElement.classList.add('show');
    }
    hideLoading() {
        this.loadingElement.classList.remove('show');
        this.contentList.style.display = 'block';
    }
    render(items) {
        this.hideLoading();
        this.contentList.innerHTML = '';
        // Remove loading button if present
        const loadingButton = this.element.querySelector('.youtube-summary-loading-btn');
        if (loadingButton)
            loadingButton.remove();
        // Remove the loader from DOM
        if (this.loadingElement && this.loadingElement.parentElement) {
            this.loadingElement.parentElement.removeChild(this.loadingElement);
        }
        // Remove the bottom button container if present
        let parent = this.element.parentElement;
        if (parent) {
            const btnContainer = parent.querySelector('.youtube-summary-button-container');
            if (btnContainer)
                btnContainer.remove();
            // Expand the parent app container if possible
            if (parent.classList.contains('youtube-summary-app') || parent.id === 'youtube-summary-container') {
                parent.classList.add('expanded');
                parent.style.height = '600px';
                parent.style.maxHeight = '600px';
            }
        }
        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'youtube-summary-item';
            li.textContent = item;
            this.contentList.appendChild(li);
        });
    }
    showError(message) {
        this.hideLoading();
        this.contentList.innerHTML = `
      <div class="youtube-summary-error">
        ${message}
      </div>
    `;
    }
}
