/* =========================================================
   Données de Disneydle : Walt Disney Pictures
   (animation + films en prises de vues réelles ; sans Pixar ni Marvel)
   =========================================================

   Format d'une ligne :
   nom|genre|espèce|rôle|statut|œuvre|année|format

   - genre  : Homme / Femme
   - rôle   : Héros, Méchant, Allié ou Mentor
   - statut  : Roi, Reine, Prince, Princesse ou Aucun (statut dans le film)
   - année  : année de sortie du film (pour l'univers Mickey : première apparition du personnage)
   - format : Animation ou Film
   - une valeur multiple s'écrit avec "/" (ex. espèce "Humain/Sorcier")
   ========================================================= */

const PERSONNAGES_BRUTS = `
Mickey Mouse|Homme|Souris|Héros|Aucun|Mickey Mouse|1928|Animation
Minnie Mouse|Femme|Souris|Allié|Aucun|Mickey Mouse|1928|Animation
Donald Duck|Homme|Canard|Héros|Aucun|Mickey Mouse|1934|Animation
Daisy Duck|Femme|Canard|Allié|Aucun|Mickey Mouse|1940|Animation
Dingo|Homme|Chien|Allié|Aucun|Mickey Mouse|1932|Animation
Pluto|Homme|Chien|Allié|Aucun|Mickey Mouse|1930|Animation
Tic|Homme|Écureuil|Allié|Aucun|Mickey Mouse|1943|Animation
Tac|Homme|Écureuil|Allié|Aucun|Mickey Mouse|1943|Animation
Picsou|Homme|Canard|Allié|Aucun|Mickey Mouse|1947|Animation
Blanche-Neige|Femme|Humain|Héros|Princesse|Blanche-Neige et les Sept Nains|1937|Animation
La Reine (Blanche-Neige)|Femme|Humain|Méchant|Reine|Blanche-Neige et les Sept Nains|1937|Animation
Prof|Homme|Nain|Allié|Aucun|Blanche-Neige et les Sept Nains|1937|Animation
Grincheux|Homme|Nain|Allié|Aucun|Blanche-Neige et les Sept Nains|1937|Animation
Joyeux|Homme|Nain|Allié|Aucun|Blanche-Neige et les Sept Nains|1937|Animation
Dormeur|Homme|Nain|Allié|Aucun|Blanche-Neige et les Sept Nains|1937|Animation
Timide|Homme|Nain|Allié|Aucun|Blanche-Neige et les Sept Nains|1937|Animation
Simplet|Homme|Nain|Allié|Aucun|Blanche-Neige et les Sept Nains|1937|Animation
Atchoum|Homme|Nain|Allié|Aucun|Blanche-Neige et les Sept Nains|1937|Animation
Pinocchio|Homme|Marionnette|Héros|Aucun|Pinocchio|1940|Animation
Jiminy Cricket|Homme|Criquet|Mentor|Aucun|Pinocchio|1940|Animation
Geppetto|Homme|Humain|Allié|Aucun|Pinocchio|1940|Animation
Yen Sid|Homme|Sorcier|Mentor|Aucun|Fantasia|1940|Animation
Chernabog|Homme|Démon|Méchant|Aucun|Fantasia|1940|Animation
Dumbo|Homme|Éléphant|Héros|Aucun|Dumbo|1941|Animation
Timothée|Homme|Souris|Mentor|Aucun|Dumbo|1941|Animation
Madame Jumbo|Femme|Éléphant|Allié|Aucun|Dumbo|1941|Animation
Bambi|Homme|Cerf|Héros|Aucun|Bambi|1942|Animation
Panpan|Homme|Lapin|Allié|Aucun|Bambi|1942|Animation
Fleur|Homme|Mouffette|Allié|Aucun|Bambi|1942|Animation
Faline|Femme|Cerf|Allié|Aucun|Bambi|1942|Animation
José Carioca|Homme|Perroquet|Allié|Aucun|Saludos Amigos|1943|Animation
Panchito|Homme|Coq|Allié|Aucun|Les Trois Caballeros|1945|Animation
Cendrillon|Femme|Humain|Héros|Aucun|Cendrillon|1950|Animation
Prince Charmant|Homme|Humain|Allié|Prince|Cendrillon|1950|Animation
Lady Trémaine|Femme|Humain|Méchant|Aucun|Cendrillon|1950|Animation
La Fée Marraine|Femme|Fée|Mentor|Aucun|Cendrillon|1950|Animation
Jaq|Homme|Souris|Allié|Aucun|Cendrillon|1950|Animation
Gus|Homme|Souris|Allié|Aucun|Cendrillon|1950|Animation
Alice|Femme|Humain|Héros|Aucun|Alice au pays des merveilles|1951|Animation
Le Chapelier Fou|Homme|Humain|Allié|Aucun|Alice au pays des merveilles|1951|Animation
Le Chat du Cheshire|Homme|Chat|Allié|Aucun|Alice au pays des merveilles|1951|Animation
Le Lapin Blanc|Homme|Lapin|Allié|Aucun|Alice au pays des merveilles|1951|Animation
La Reine de Coeur|Femme|Humain|Méchant|Reine|Alice au pays des merveilles|1951|Animation
Peter Pan|Homme|Humain|Héros|Aucun|Peter Pan|1953|Animation
Clochette|Femme|Fée|Allié|Aucun|Peter Pan|1953|Animation
Capitaine Crochet|Homme|Humain|Méchant|Aucun|Peter Pan|1953|Animation
Monsieur Mousse|Homme|Humain|Méchant|Aucun|Peter Pan|1953|Animation
Wendy|Femme|Humain|Allié|Aucun|Peter Pan|1953|Animation
Jean|Homme|Humain|Allié|Aucun|Peter Pan|1953|Animation
Michel|Homme|Humain|Allié|Aucun|Peter Pan|1953|Animation
La Belle|Femme|Chien|Héros|Aucun|La Belle et le Clochard|1955|Animation
Le Clochard|Homme|Chien|Héros|Aucun|La Belle et le Clochard|1955|Animation
Aurore|Femme|Humain|Héros|Princesse|La Belle au bois dormant|1959|Animation
Maléfique|Femme|Fée|Méchant|Aucun|La Belle au bois dormant|1959|Animation
Prince Philippe|Homme|Humain|Allié|Prince|La Belle au bois dormant|1959|Animation
Pongo|Homme|Chien|Héros|Aucun|Les 101 Dalmatiens|1961|Animation
Perdita|Femme|Chien|Allié|Aucun|Les 101 Dalmatiens|1961|Animation
Cruella d'Enfer|Femme|Humain|Méchant|Aucun|Les 101 Dalmatiens|1961|Animation
Merlin|Homme|Sorcier|Mentor|Aucun|Merlin l'Enchanteur|1963|Animation
Arthur|Homme|Humain|Héros|Aucun|Merlin l'Enchanteur|1963|Animation
Madame Mim|Femme|Sorcier|Méchant|Aucun|Merlin l'Enchanteur|1963|Animation
Mowgli|Homme|Humain|Héros|Aucun|Le Livre de la jungle|1967|Animation
Baloo|Homme|Ours|Allié|Aucun|Le Livre de la jungle|1967|Animation
Bagheera|Homme|Panthère|Mentor|Aucun|Le Livre de la jungle|1967|Animation
Shere Khan|Homme|Tigre|Méchant|Aucun|Le Livre de la jungle|1967|Animation
Kaa|Homme|Serpent|Méchant|Aucun|Le Livre de la jungle|1967|Animation
Duchesse|Femme|Chat|Héros|Aucun|Les Aristochats|1970|Animation
Thomas O'Malley|Homme|Chat|Héros|Aucun|Les Aristochats|1970|Animation
Marie|Femme|Chat|Allié|Aucun|Les Aristochats|1970|Animation
Edgar|Homme|Humain|Méchant|Aucun|Les Aristochats|1970|Animation
Robin des Bois|Homme|Renard|Héros|Aucun|Robin des Bois|1973|Animation
Petit Jean|Homme|Ours|Allié|Aucun|Robin des Bois|1973|Animation
Prince Jean|Homme|Lion|Méchant|Prince|Robin des Bois|1973|Animation
Shérif de Nottingham|Homme|Loup|Méchant|Aucun|Robin des Bois|1973|Animation
Lady Marianne|Femme|Renard|Allié|Aucun|Robin des Bois|1973|Animation
Winnie l'Ourson|Homme|Ours|Héros|Aucun|Les Aventures de Winnie l'Ourson|1977|Animation
Porcinet|Homme|Cochon|Allié|Aucun|Les Aventures de Winnie l'Ourson|1977|Animation
Tigrou|Homme|Tigre|Allié|Aucun|Les Aventures de Winnie l'Ourson|1977|Animation
Bourriquet|Homme|Âne|Allié|Aucun|Les Aventures de Winnie l'Ourson|1977|Animation
Jean-Christophe|Homme|Humain|Allié|Aucun|Les Aventures de Winnie l'Ourson|1977|Animation
Bernard|Homme|Souris|Héros|Aucun|Les Aventures de Bernard et Bianca|1977|Animation
Bianca|Femme|Souris|Héros|Aucun|Les Aventures de Bernard et Bianca|1977|Animation
Madame Médusa|Femme|Humain|Méchant|Aucun|Les Aventures de Bernard et Bianca|1977|Animation
Rox|Homme|Renard|Héros|Aucun|Rox et Rouky|1981|Animation
Rouky|Homme|Chien|Héros|Aucun|Rox et Rouky|1981|Animation
Big Mama|Femme|Chouette|Mentor|Aucun|Rox et Rouky|1981|Animation
Basil|Homme|Souris|Héros|Aucun|Basil, détective privé|1986|Animation
Dawson|Homme|Souris|Allié|Aucun|Basil, détective privé|1986|Animation
Ratigan|Homme|Rat|Méchant|Aucun|Basil, détective privé|1986|Animation
Oliver|Homme|Chat|Héros|Aucun|Oliver & Compagnie|1988|Animation
Dodger|Homme|Chien|Allié|Aucun|Oliver & Compagnie|1988|Animation
Sykes|Homme|Humain|Méchant|Aucun|Oliver & Compagnie|1988|Animation
Ariel|Femme|Sirène|Héros|Princesse|La Petite Sirène|1989|Animation
Prince Éric|Homme|Humain|Allié|Prince|La Petite Sirène|1989|Animation
Ursula|Femme|Pieuvre|Méchant|Aucun|La Petite Sirène|1989|Animation
Sébastien|Homme|Crabe|Allié|Aucun|La Petite Sirène|1989|Animation
Polochon|Homme|Poisson|Allié|Aucun|La Petite Sirène|1989|Animation
Roi Triton|Homme|Sirène|Mentor|Roi|La Petite Sirène|1989|Animation
Belle|Femme|Humain|Héros|Aucun|La Belle et la Bête|1991|Animation
La Bête|Homme|Bête|Héros|Prince|La Belle et la Bête|1991|Animation
Gaston|Homme|Humain|Méchant|Aucun|La Belle et la Bête|1991|Animation
Lumière|Homme|Objet animé|Allié|Aucun|La Belle et la Bête|1991|Animation
Big Ben|Homme|Objet animé|Allié|Aucun|La Belle et la Bête|1991|Animation
Zip|Homme|Objet animé|Allié|Aucun|La Belle et la Bête|1991|Animation
Madame Samovar|Femme|Objet animé|Allié|Aucun|La Belle et la Bête|1991|Animation
Aladdin|Homme|Humain|Héros|Aucun|Aladdin|1992|Animation
Jasmine|Femme|Humain|Allié|Princesse|Aladdin|1992|Animation
Le Génie|Homme|Génie|Allié|Aucun|Aladdin|1992|Animation
Jafar|Homme|Humain|Méchant|Aucun|Aladdin|1992|Animation
Abu|Homme|Singe|Allié|Aucun|Aladdin|1992|Animation
Iago|Homme|Perroquet|Méchant|Aucun|Aladdin|1992|Animation
Simba|Homme|Lion|Héros|Roi|Le Roi Lion|1994|Animation
Nala|Femme|Lion|Allié|Reine|Le Roi Lion|1994|Animation
Mufasa|Homme|Lion|Mentor|Roi|Le Roi Lion|1994|Animation
Scar|Homme|Lion|Méchant|Roi|Le Roi Lion|1994|Animation
Timon|Homme|Suricate|Allié|Aucun|Le Roi Lion|1994|Animation
Pumbaa|Homme|Phacochère|Allié|Aucun|Le Roi Lion|1994|Animation
Rafiki|Homme|Mandrill|Mentor|Aucun|Le Roi Lion|1994|Animation
Pocahontas|Femme|Humain|Héros|Aucun|Pocahontas|1995|Animation
John Smith|Homme|Humain|Allié|Aucun|Pocahontas|1995|Animation
Meeko|Homme|Raton laveur|Allié|Aucun|Pocahontas|1995|Animation
Gouverneur Ratcliffe|Homme|Humain|Méchant|Aucun|Pocahontas|1995|Animation
Quasimodo|Homme|Humain|Héros|Aucun|Le Bossu de Notre-Dame|1996|Animation
Esmeralda|Femme|Humain|Allié|Aucun|Le Bossu de Notre-Dame|1996|Animation
Claude Frollo|Homme|Humain|Méchant|Aucun|Le Bossu de Notre-Dame|1996|Animation
Phoebus|Homme|Humain|Allié|Aucun|Le Bossu de Notre-Dame|1996|Animation
Hercule|Homme|Demi-dieu|Héros|Aucun|Hercule|1997|Animation
Mégara|Femme|Humain|Allié|Aucun|Hercule|1997|Animation
Hadès|Homme|Dieu|Méchant|Aucun|Hercule|1997|Animation
Philoctète|Homme|Satyre|Mentor|Aucun|Hercule|1997|Animation
Pégase|Homme|Cheval|Allié|Aucun|Hercule|1997|Animation
Mulan|Femme|Humain|Héros|Aucun|Mulan|1998|Animation
Mushu|Homme|Dragon|Allié|Aucun|Mulan|1998|Animation
Li Shang|Homme|Humain|Allié|Aucun|Mulan|1998|Animation
Shan Yu|Homme|Humain|Méchant|Aucun|Mulan|1998|Animation
Tarzan|Homme|Humain|Héros|Aucun|Tarzan|1999|Animation
Jane|Femme|Humain|Allié|Aucun|Tarzan|1999|Animation
Kala|Femme|Gorille|Allié|Aucun|Tarzan|1999|Animation
Kerchak|Homme|Gorille|Mentor|Aucun|Tarzan|1999|Animation
Clayton|Homme|Humain|Méchant|Aucun|Tarzan|1999|Animation
Kuzco|Homme|Humain|Héros|Roi|Kuzco, l'empereur mégalo|2000|Animation
Pacha|Homme|Humain|Allié|Aucun|Kuzco, l'empereur mégalo|2000|Animation
Yzma|Femme|Humain|Méchant|Aucun|Kuzco, l'empereur mégalo|2000|Animation
Kronk|Homme|Humain|Méchant|Aucun|Kuzco, l'empereur mégalo|2000|Animation
Milo|Homme|Humain|Héros|Aucun|Atlantide, l'empire perdu|2001|Animation
Kida|Femme|Humain|Allié|Princesse|Atlantide, l'empire perdu|2001|Animation
Commandant Rourke|Homme|Humain|Méchant|Aucun|Atlantide, l'empire perdu|2001|Animation
Stitch|Homme|Extraterrestre|Héros|Aucun|Lilo & Stitch|2002|Animation
Lilo|Femme|Humain|Héros|Aucun|Lilo & Stitch|2002|Animation
Nani|Femme|Humain|Allié|Aucun|Lilo & Stitch|2002|Animation
Jumba|Homme|Extraterrestre|Méchant|Aucun|Lilo & Stitch|2002|Animation
Jim Hawkins|Homme|Humain|Héros|Aucun|La Planète au trésor|2002|Animation
Long John Silver|Homme|Cyborg|Allié|Aucun|La Planète au trésor|2002|Animation
Volt|Homme|Chien|Héros|Aucun|Volt, star malgré lui|2008|Animation
Penny|Femme|Humain|Allié|Aucun|Volt, star malgré lui|2008|Animation
Rhino|Homme|Hamster|Allié|Aucun|Volt, star malgré lui|2008|Animation
Mittens|Femme|Chat|Allié|Aucun|Volt, star malgré lui|2008|Animation
Tiana|Femme|Humain|Héros|Aucun|La Princesse et la Grenouille|2009|Animation
Prince Naveen|Homme|Humain|Allié|Prince|La Princesse et la Grenouille|2009|Animation
Docteur Facilier|Homme|Humain|Méchant|Aucun|La Princesse et la Grenouille|2009|Animation
Ray|Homme|Luciole|Allié|Aucun|La Princesse et la Grenouille|2009|Animation
Louis|Homme|Alligator|Allié|Aucun|La Princesse et la Grenouille|2009|Animation
Raiponce|Femme|Humain|Héros|Princesse|Raiponce|2010|Animation
Flynn Rider|Homme|Humain|Allié|Aucun|Raiponce|2010|Animation
Mère Gothel|Femme|Humain|Méchant|Aucun|Raiponce|2010|Animation
Pascal|Homme|Caméléon|Allié|Aucun|Raiponce|2010|Animation
Maximus|Homme|Cheval|Allié|Aucun|Raiponce|2010|Animation
Ralph|Homme|Personnage de jeu vidéo|Héros|Aucun|Les Mondes de Ralph|2012|Animation
Vanellope|Femme|Personnage de jeu vidéo|Héros|Aucun|Les Mondes de Ralph|2012|Animation
Félix|Homme|Personnage de jeu vidéo|Allié|Aucun|Les Mondes de Ralph|2012|Animation
Roi Bonbon|Homme|Personnage de jeu vidéo|Méchant|Roi|Les Mondes de Ralph|2012|Animation
Elsa|Femme|Humain|Héros|Reine|La Reine des neiges|2013|Animation
Anna|Femme|Humain|Héros|Princesse|La Reine des neiges|2013|Animation
Olaf|Homme|Bonhomme de neige|Allié|Aucun|La Reine des neiges|2013|Animation
Kristoff|Homme|Humain|Allié|Aucun|La Reine des neiges|2013|Animation
Hans|Homme|Humain|Méchant|Prince|La Reine des neiges|2013|Animation
Sven|Homme|Renne|Allié|Aucun|La Reine des neiges|2013|Animation
Hiro Hamada|Homme|Humain|Héros|Aucun|Les Nouveaux Héros|2014|Animation
Baymax|Homme|Robot|Allié|Aucun|Les Nouveaux Héros|2014|Animation
Judy Hopps|Femme|Lapin|Héros|Aucun|Zootopie|2016|Animation
Nick Wilde|Homme|Renard|Héros|Aucun|Zootopie|2016|Animation
Chef Bogo|Homme|Buffle|Allié|Aucun|Zootopie|2016|Animation
Flash|Homme|Paresseux|Allié|Aucun|Zootopie|2016|Animation
Madame Bellwether|Femme|Mouton|Méchant|Aucun|Zootopie|2016|Animation
Vaiana|Femme|Humain|Héros|Princesse|Vaiana, la légende du bout du monde|2016|Animation
Maui|Homme|Demi-dieu|Allié|Aucun|Vaiana, la légende du bout du monde|2016|Animation
Heihei|Homme|Coq|Allié|Aucun|Vaiana, la légende du bout du monde|2016|Animation
Tamatoa|Homme|Crabe|Méchant|Aucun|Vaiana, la légende du bout du monde|2016|Animation
Raya|Femme|Humain|Héros|Princesse|Raya et le Dernier Dragon|2021|Animation
Sisu|Femme|Dragon|Allié|Aucun|Raya et le Dernier Dragon|2021|Animation
Namaari|Femme|Humain|Méchant|Princesse|Raya et le Dernier Dragon|2021|Animation
Mirabel|Femme|Humain|Héros|Aucun|Encanto, la fantastique famille Madrigal|2021|Animation
Bruno|Homme|Humain|Allié|Aucun|Encanto, la fantastique famille Madrigal|2021|Animation
Abuela Alma|Femme|Humain|Mentor|Aucun|Encanto, la fantastique famille Madrigal|2021|Animation
Isabela|Femme|Humain|Allié|Aucun|Encanto, la fantastique famille Madrigal|2021|Animation
Asha|Femme|Humain|Héros|Aucun|Wish, Asha et la bonne étoile|2023|Animation
Roi Magnifico|Homme|Humain|Méchant|Roi|Wish, Asha et la bonne étoile|2023|Animation
Valentino|Homme|Chèvre|Allié|Aucun|Wish, Asha et la bonne étoile|2023|Animation
Mary Poppins|Femme|Humain|Mentor|Aucun|Mary Poppins|1964|Film
Bert|Homme|Humain|Allié|Aucun|Mary Poppins|1964|Film
Benjamin Gates|Homme|Humain|Héros|Aucun|Benjamin Gates et le Trésor des Templiers|2004|Film
Riley Poole|Homme|Humain|Allié|Aucun|Benjamin Gates et le Trésor des Templiers|2004|Film
Ian Howe|Homme|Humain|Méchant|Aucun|Benjamin Gates et le Trésor des Templiers|2004|Film
Peter Pevensie|Homme|Humain|Héros|Roi|Le Monde de Narnia|2005|Film
Susan Pevensie|Femme|Humain|Allié|Reine|Le Monde de Narnia|2005|Film
Edmund Pevensie|Homme|Humain|Allié|Roi|Le Monde de Narnia|2005|Film
Lucy Pevensie|Femme|Humain|Héros|Reine|Le Monde de Narnia|2005|Film
Tumnus|Homme|Satyre|Allié|Aucun|Le Monde de Narnia|2005|Film
Aslan|Homme|Lion|Mentor|Aucun|Le Monde de Narnia|2005|Film
La Sorcière Blanche|Femme|Sorcier|Méchant|Reine|Le Monde de Narnia|2005|Film
Jack Sparrow|Homme|Humain|Héros|Aucun|Pirates des Caraïbes|2003|Film
Will Turner|Homme|Humain|Allié|Aucun|Pirates des Caraïbes|2003|Film
Elizabeth Swann|Femme|Humain|Allié|Aucun|Pirates des Caraïbes|2003|Film
Capitaine Barbossa|Homme|Humain|Méchant|Aucun|Pirates des Caraïbes|2003|Film
Davy Jones|Homme|Créature marine|Méchant|Aucun|Pirates des Caraïbes|2006|Film
Giselle|Femme|Humain|Héros|Princesse|Il était une fois|2007|Film
Prince Edward|Homme|Humain|Allié|Prince|Il était une fois|2007|Film
Reine Narissa|Femme|Humain|Méchant|Reine|Il était une fois|2007|Film
`.trim();

const PERSONNAGES = PERSONNAGES_BRUTS.split("\n").map(ligne => {
  const [nom, genre, espece, role, statut, oeuvre, annee, format] = ligne.split("|");
  return { nom, genre, espece, role, statut, oeuvre, annee: Number(annee), format };
});

function trouverPersonnage(nom) {
  return PERSONNAGES.find(personnage => personnage.nom === nom);
}


const CITATIONS = [
  ["Mickey Mouse", "Miska Moska M... !", ""],
  ["Mufasa", "Être courageux, ce n'est pas aller au-devant des ennuis", ""],
  ["Scar", "La vie est injuste n'est-ce pas ?", ""],
  ["Pumbaa", "Hakuna Matata ! Mais quelle phrase magnifique !", ""],
  ["La Reine de Coeur", "Qu'on lui coupe la tête !", ""],
  ["Peter Pan", "Seconde étoile à droite, et tout droit jusqu'au matin.", ""],
  ["Pinocchio", "Je suis un vrai petit garçon !", ""],
  ["La Reine (Blanche Neige)", "Miroir, Miroir...", ""],
  ["Jasmine", "Je ne suis le prix de personne !", ""],
  ["Le Génie", "Je suis liiiiiiibre !", ""],
  ["Olaf", "Certaines personnes valent la peine qu'on fonde pour elles.", ""],
  ["Lilo", "Ohana ça veut dire famille. Famille ça veut dire que personne n'est abandonné ni oublié.", ""],
  ["Baymax", "Je suis satisfait de mes soins.", ""],
  ["Jack Sparrow", "Mais pourquoi on a plus de rhum ?", ""],
  ["Jack Sparrow", "Tout homme qui n'est pas à sa place, reste sur place.", ""],
].map(([nom, fr, en]) => ({
  personnage: trouverPersonnage(nom),
  citation: fr,
  original: en || ""
})).filter(citation => citation.personnage);
