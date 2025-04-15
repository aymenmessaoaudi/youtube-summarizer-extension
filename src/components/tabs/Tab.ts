import { Summary } from '../../interfaces';

// Interface de base pour tous les onglets
export interface Tab {
  // Méthode pour obtenir l'élément DOM de l'onglet
  getElement(): HTMLElement;
  
  // Méthode pour mettre à jour le contenu de l'onglet
  update(data: Summary): void;
  
  // Méthode appelée quand l'onglet devient actif
  onActivate(): void;
  
  // Méthode appelée quand l'onglet devient inactif
  onDeactivate(): void;
}
