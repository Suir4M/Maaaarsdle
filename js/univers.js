/* =========================================================
   Configuration du site : nom + liste des univers
   =========================================================
   Pour ajouter un univers : copie un bloc { ... } ci-dessous,
   change les valeurs, et c'est tout.

   - id        : identifiant unique (lettres minuscules, sans espace)
   - univers   : nom de l'univers affiché en petit (ex. "Harry Potter")
   - jeu       : nom du site de jeu (ex. "Poudledle"), affiché une fois le jeu disponible
   - icone     : emoji affiché sur la carte (ou utilise "image")
   - image     : (optionnel) chemin d'une image de couverture, ex. "images/hp.jpg"
   - couleur   : couleur d'accent de la carte (hex)
   - url       : adresse du jeu (relative ou complète)
   - statut    : "disponible" ou "bientot"
   - modes     : liste des modes de jeu affichés
   - visible   : false pour cacher une carte sans la supprimer
   ========================================================= */

const SITE = {
  nom: "Maaaarsdle"
};

const UNIVERS = [
  {
    id: "harry-potter",
    univers: "Harry Potter",
    jeu: "Wizardle",
    description: "Retrouve le personnage mystère parmi les sorciers, créatures et professeurs de Poudlard.",
    icone: "⚡",
    image: "../Maaaarsdle/images/Wizardle.jpg",
    couleur: "#c9a24a",
    url: "Wizardle/index.html",
    statut: "disponible",
    modes: ["Classique", "Citation", "Flou", "Patronus", "Sortilège", "Potion", "Lieu", "Baguette","Lien"],
    visible: true
  },
  {
    id: "disney",
    univers: "Disney",
    jeu: "Disneydle",
    description: "Princes, princesses, méchants et compagnons : qui sera le personnage caché ?",
    icone: "🏰",
    image: "../Maaaarsdle/images/Disneydle.jpg",
    couleur: "#5aa2ff",
    url: "Disneydle/index.html",
    statut: "disponible",
    modes: ["Classique", "Citation", "Flou"],
    visible: true
  },
  {
    id: "marvel",
    univers: "Marvel",
    jeu: "Marveldle",
    description: "Pars à la recherche du héro, vilain ou de l'allié improbable.",
    icone: "✦",
    image: "../Maaaarsdle/images/Marveldle.jpg",
    couleur: "#e0504a",
    url: "Marveldle/index.html",
    statut: "disponible",
    modes: ["Classique"],
    visible: true
  },
  {
    id: "vampire-diaries",
    univers: "Vampire Diaries",
    jeu: "Vampiredle",
    description: "Dans un monde rempli d'humains, de vampires et de loups-garous, retrouves le bon personnage.",
    icone: "🧛",
    image: "../Maaaarsdle/images/Vampiredle.jpg",
    couleur: "#b30023",
    url: "Vampiredle/index.html",
    statut: "disponible",
    modes: ["Classique", "Citation", "Portrait flou","Lien"],
    visible: true
  },
  {
    id: "white-lotus",
    univers: "The White Lotus",
    jeu: "TWLdle",
    description: "Des clients, des employés et quelques secrets : devine qui se cache derrière chaque indice.",
    icone: "🪷",
    image: "../Maaaarsdle/images/TWLdle.jpg",
    couleur: "#4fc3a1",
    url: "TWLdle/index.html",
    statut: "disponible",
    modes: ["Classique", "Citation", "Portrait flou", "Lien"],
    visible: true
  },
];
