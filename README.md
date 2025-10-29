# Save the file

### Un mini-jeu web où il faut deviner le code secret de 4 lettres pour deverouiller le coffre-forte avant la fin du temps imparti et avant qu'il ne s'auto-détruise !

<img width="1614" height="892" alt="image" src="https://github.com/user-attachments/assets/e5eac1d4-c07c-401f-9427-eebbbb589836" />

## Fonctionnalités

- Le code secret de 4 lettres (A-Z) se génère aléatoirement
- Interface avec inputs, boutons de navigation par lettre, et bouton de vérification
- Chronomètre avec affichage du temps restant
- Feedback visuel pour chaque lettre correcte/incorrecte
  - Vert : La lettre est correcte
  - Rouge : La lettre est incorrecte
- Apparition d’une pop-up lorsque le joueur gagne la partie, appel d’une API pour récompenser le joueur

## Installation

1. Clone ce dépôt ou télécharge les fichiers.
2. Ouvre `index.html` dans ton navigateur.

## Structure du projet

```
break-the-code/
│
├── index.html
├── style.css
├── script.js
├── functions.js
├── scoreboard.js
├── timer.js
├── constant.js
├── fonts/
│   └── (polices utilisées)

```

## Utilisation

- Clique sur **Start** pour lancer la partie.
- Utilise les flèches ou le clavier pour entrer un code de 4 lettres.
- Clique sur **Verify** pour valider ta proposition.
- Le jeu s’arrête si tu trouves le code ou si le temps est écoulé.
