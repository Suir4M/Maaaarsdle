/* =========================================================
   Données de Marvelle : Marvel Cinematic Universe
   (films et séries uniquement, pas de comics)
   =========================================================

   Format d'une ligne :
   nom|genre|espèce|rôle|équipe|œuvre|année|format

   - genre  : Homme / Femme
   - espèce : Humain, Super-soldat, Sorcier, Asgardien, Alien, Mutant, Android…
              (une valeur multiple s'écrit avec "/", ex. "Humain/Sorcier")
   - rôle   : Héros, Allié, Mentor, Méchant ou Anti-héros
   - équipe : Avengers, S.H.I.E.L.D., Hydra, Asgard, Wakanda, Gardiens de la Galaxie,
              Ravageurs, Sorciers, Thunderbolts, Quatre Fantastiques, Dix Anneaux, TVA,
              ou "Aucune" (plusieurs valeurs séparées par "/")
   - œuvre  : film ou série de la PREMIÈRE apparition du personnage dans le MCU
   - année  : année de sortie de cette œuvre
   - format : Film ou Série

   Les séries Netflix (Daredevil, Kingpin, Punisher) sont comptées comme
   faisant partie du MCU (elles sont revenues sur Disney+).
   ========================================================= */

/* =========================================================
   Données de Marvelle : Marvel Cinematic Universe
   (films et séries uniquement, pas de comics)
   =========================================================

   Format d'une ligne :
   nom|genre|espèce|rôle|équipe|œuvre|année|format

   - genre  : Homme / Femme
   - espèce : Humain, Super-soldat, Sorcier, Asgardien, Alien, Mutant, Android…
              (une valeur multiple s'écrit avec "/", ex. "Humain/Sorcier")
   - rôle   : Héros, Allié, Mentor, Méchant ou Anti-héros
   - équipe : Avengers, S.H.I.E.L.D., Hydra, Asgard, Wakanda, Gardiens de la Galaxie,
              Ravageurs, Sorciers, Thunderbolts, Quatre Fantastiques, Dix Anneaux, TVA,
              ou "Aucune" (plusieurs valeurs séparées par "/")
   - œuvre  : film ou série de la PREMIÈRE apparition du personnage dans le MCU
   - année  : année de sortie de cette œuvre
   - format : Film ou Série

   Les séries Netflix (Daredevil, Kingpin, Punisher) sont comptées comme
   faisant partie du MCU (elles sont revenues sur Disney+).
   ========================================================= */

const PERSONNAGES_BRUTS = `
Logan (Wolverine)|Male|Mutant|Hero|X-Men|X-Men|2000|Film
Peter Parker (Spider-Man)|Male|Human|Hero|Avengers|Spider-Man|2002|Film
Bruce Banner (Hulk)|Male|Human|Hero|Avengers|Hulk|2003|Film
Matt Murdock (Daredevil)|Male|Human|Hero|None|Daredevil|2003|Film
Wilson Fisk (Kingpin)|Male|Human|Villain|None|Daredevil|2003|Film
Tony Stark (Iron Man)|Male|Human|Hero|Avengers|Iron Man|2008|Film
Nick Fury|Male|Human|Mentor|S.H.I.E.L.D.|Iron Man|2008|Film
Wade Wilson (Deadpool)|Male|Mutant|Anti-hero|None|X-Men Origins: Wolverine|2009|Film
Natasha Romanoff (Black Widow)|Female|Human|Hero|Avengers/S.H.I.E.L.D.|Iron Man 2|2010|Film
Thor|Male|Asgardian|Hero|Avengers/Asgard|Thor|2011|Film
Loki|Male|Asgardian/Frost Giant|Villain|Asgard|Thor|2011|Film
Clint Barton (Hawkeye)|Male|Human|Hero|Avengers/S.H.I.E.L.D.|Thor|2011|Film
Steve Rogers (Captain America)|Male|Human/Super-soldier|Hero|Avengers|Captain America: The First Avenger|2011|Film
Bucky Barnes (Winter Soldier)|Male|Human/Super-soldier|Ally|Hydra/Avengers|Captain America: The First Avenger|2011|Film
Johann Schmidt (Red Skull)|Male|Human|Villain|Hydra|Captain America: The First Avenger|2011|Film
Thanos|Male|Titan|Villain|None|The Avengers|2012|Film
Sam Wilson (Falcon)|Male|Human|Ally|Avengers|Captain America: The Winter Soldier|2014|Film
Wanda Maximoff (Scarlet Witch)|Female|Human/Sorcerer|Hero|Avengers|Captain America: The Winter Soldier|2014|Film
Peter Quill (Star-Lord)|Male|Human/Alien|Hero|Guardians of the Galaxy|Guardians of the Galaxy|2014|Film
Gamora|Female|Alien|Ally|Guardians of the Galaxy|Guardians of the Galaxy|2014|Film
Drax|Male|Alien|Ally|Guardians of the Galaxy|Guardians of the Galaxy|2014|Film
Rocket|Male|Animal|Ally|Guardians of the Galaxy|Guardians of the Galaxy|2014|Film
Groot|Male|Flora|Ally|Guardians of the Galaxy|Guardians of the Galaxy|2014|Film
Vision|Male|Android|Ally|Avengers|Avengers: Age of Ultron|2015|Film
Ultron|Male|Android/AI|Villain|None|Avengers: Age of Ultron|2015|Film
Scott Lang (Ant-Man)|Male|Human|Hero|Avengers|Ant-Man|2015|Film
T'Challa (Black Panther)|Male|Human|Hero|Wakanda/Avengers|Captain America: Civil War|2016|Film
Stephen Strange (Doctor Strange)|Male|Human/Sorcerer|Hero|Sorcerers/Avengers|Doctor Strange|2016|Film
Wong|Male|Human/Sorcerer|Ally|Sorcerers|Doctor Strange|2016|Film
Hela|Female|Asgardian|Villain|Asgard|Thor: Ragnarok|2017|Film
Shuri|Female|Human|Hero|Wakanda|Black Panther|2018|Film
Erik Killmonger|Male|Human|Villain|None|Black Panther|2018|Film
Carol Danvers (Captain Marvel)|Female|Human/Alien|Hero|Avengers|Captain Marvel|2019|Film
Shang-Chi|Male|Human|Hero|Ten Rings|Shang-Chi and the Legend of the Ten Rings|2021|Film
`.trim();

const PERSONNAGES = PERSONNAGES_BRUTS.split("\n").map(line => {
  const [nom, genre, espece, role, equipe, oeuvre, annee, format] = line.split("|");
  return { nom, genre, espece, role, equipe, oeuvre, annee: Number(annee), format };
});

function trouverPersonnage(nom) {
  return PERSONNAGES.find(personnage => personnage.nom === nom);
}

const CITATIONS = [

].map(([nom, fr, en]) => ({
  personnage: trouverPersonnage(nom),
  citation: fr,
  original: en || ""
})).filter(citation => citation.personnage);

