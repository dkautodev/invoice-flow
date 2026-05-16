# Plan d'Implémentation - InvoiceFlow PWA

Une application web progressive (PWA) premium pour créer des factures professionnelles de manière intuitive avec prévisualisation en temps réel et génération de PDF.

## 1. Objectifs du Projet
Créer un outil de facturation rapide, sans sauvegarde serveur, respectant les normes françaises (TVA, mentions légales) et installable sur mobile/ordinateur.

## 2. Architecture Technique
- **Base :** Vite.js + React (Structure robuste et performante).
- **Design :** CSS Vanille Moderne (Variables CSS, Flexbox, Grid) pour un contrôle total et une esthétique haut de gamme.
- **PWA :** `vite-plugin-pwa` pour le mode hors-ligne et l'installation native.
- **PDF :** `html2pdf.js` pour une conversion fidèle du rendu visuel en document PDF.
- **Icônes :** `lucide-react`.
- **Animations :** `framer-motion` pour des transitions fluides.

## 3. Structure des Composants

### A. Éditeur (Formulaire)
- **Logo :** Zone de dépôt d'image avec aperçu immédiat.
- **Émetteur (Facultatif) :** Nom entreprise, Nom/Prénom, Adresse, CP, Ville, Pays (défaut France), SIRET, TVA.
- **Client :** Nom et adresse du destinataire.
- **Détails Facture :** 
    - Numéro de facture (manuel).
    - Date d'émission (possibilité d'anti-dater, défaut : aujourd'hui).
    - Échéance (Menu déroulant : Immédiat, +7j, +15j, +30j).
- **Lignes de services :** Bouton "Ajouter une ligne" (Libellé, Détails, Quantité, Prix Unitaire).
- **Coordonnées Bancaires :** Bénéficiaire, IBAN, BIC.
- **Calculs :** Champ de taux de TVA personnalisable.

### B. Prévisualisation (Rendu A4)
- Mise en page professionnelle respectant les codes de la facture classique.
- **Logique Conditionnelle :**
    - Si TVA = 0% : Ajout automatique de la mention *"TVA non applicable selon l'article 293 B du Code Général des Impôts"*.
    - Affichage dynamique des champs (si vide, le champ n'apparaît pas sur le PDF).
    - Calcul automatique : Total HT, Montant TVA, Total TTC.

## 4. Design & UX
- **Interface Split-Screen :** Sur ordinateur, formulaire à gauche et prévisualisation à droite.
- **Aesthétique Premium :** Couleurs sobres (Indigo profond, Ardoise douce), typographie moderne (Inter), et micro-animations.

## 5. Étapes de Développement
1. Initialisation du projet Vite + React.
2. Mise en place du système de design (CSS).
3. Développement de la logique de calcul (Dates et TVA).
4. Création de l'interface d'édition.
5. Création du template de rendu PDF.
6. Intégration de la génération PDF.
7. Configuration PWA (Manifeste, Icônes, Service Worker).

## 6. Vérification & Tests
- Validation des calculs de TVA (multi-lignes).
- Test du calcul automatique de la date d'échéance.
- Vérification de la qualité du PDF généré.
- Audit PWA (Installation et accès hors-ligne).

---
**Approuvez-vous ce plan détaillé ? Une fois validé, je lancerai la génération du code.**
