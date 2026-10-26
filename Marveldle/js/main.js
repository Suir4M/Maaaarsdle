/* =========================================================
   Initialisation de Marveldle
   ========================================================= */

/*genre, espece, role, equipe, oeuvre, annee, format*/
document.addEventListener("DOMContentLoaded", () => {
  initialiserModeClassique({
    champs: [
      { titre: "Genre", afficher: p => p.genre, comparer: (p, c) => comparerExact(p.genre, c.genre) },
      { titre: "Espèce", afficher: p => p.espece.split("/").join("<br>"), comparer: (p, c) => comparerMultiples(p.espece, c.espece) },
      { titre: "Rôle", afficher: p => p.role, comparer: (p, c) => comparerExact(p.role, c.role) },
      { titre: "Equipe", afficher: p => p.equipe.split("/").join("<br>"), comparer: (p, c) => comparerMultiples(p.equipe, c.equipe) },
      { titre: "Oeuvre", afficher: p => p.oeuvre, comparer: (p, c) => comparerExact(p.oeuvre, c.oeuvre) },
      { titre: "Année", afficher: (p, c) => { const d = c.annee - p.annee; return `${p.annee}${d > 0 ? " ↑" : d < 0 ? " ↓" : ""}`; }, comparer: (p, c) => comparerNombre(p.annee, c.annee, 5) },
      { titre: "Format", afficher: p => p.format, comparer: (p, c) => comparerExact(p.format, c.format) },
    ],
  });
  /*creerJeuCitation("b", CITATIONS);
  creerJeuFlou("c");*/

  const nbPersonnagesCites = new Set(CITATIONS.map(c => c.personnage.nom)).size;
  const boutonCitation = document.querySelector('.cards button[data-t="b"]');

  if (nbPersonnagesCites < 3) {
    boutonCitation.disabled = true;
    boutonCitation.querySelector("small").textContent =
      "Bientôt : ajoute des répliques dans data.js";
  }

  const accueil = $("#home");
  const boutonRetour = $("#back");
  const sections = () => document.querySelectorAll("section");

  document.querySelectorAll(".cards button").forEach(bouton => {
    bouton.addEventListener("click", () => {
      accueil.hidden = true;
      boutonRetour.hidden = false;
      sections().forEach(section => section.classList.remove("on"));
      $(`#${bouton.dataset.t}`).classList.add("on");
    });
  });

  boutonRetour.addEventListener("click", () => {
    accueil.hidden = false;
    boutonRetour.hidden = true;
    sections().forEach(section => section.classList.remove("on"));
  });
});
