# Break the Code

### Un mini-jeu web où il faut deviner le code secret de 4 lettres pour désamorcer la bombe avant la fin du temps imparti !
<img width="1614" height="892" alt="image" src="https://github.com/user-attachments/assets/e5eac1d4-c07c-401f-9427-eebbbb589836" />


## Fonctionnalités

- Le code secret de 4 lettres (A-Z) se génère aléatoirement
- Interface avec inputs, boutons de navigation par lettre (WIP), et bouton de vérification
- Chronomètre avec affichage du temps restant
- Feedback visuel pour chaque lettre correcte/incorrecte
- Blocage automatique des boutons et inputs en cas de victoire ou de défaite

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
├── constant.js
├── fonts/
│   └── (polices utilisées)

```

## Utilisation

- Clique sur **Start** pour lancer la partie.
- Utilise les flèches (In progress) ou le clavier pour entrer un code de 4 lettres.
- Clique sur **Verify** pour valider ta proposition.
- Le jeu s’arrête si tu trouves le code ou si le temps est écoulé.
