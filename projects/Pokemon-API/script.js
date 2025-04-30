function toggleFirst() {
  let div = getId("first");
  if (div.style.display === "none") {
    div.style.display = "block"; // Zeige das Div
  }
  else {
    div.style.display = "none";// Verstecke das Div
  }
}

function toggleSecond() {
  let div = getId("second");
  if (div.style.display === "none") {
    div.style.display = "block";// Zeige das Div
  } 
  else {
    div.style.display = "none";// Verstecke das Div
  }
}

function getId(id) { 
  return document.getElementById(id);
}

function setHtml(element, content) {
  element.innerHTML = content;
}

function searchData() {
  let searchInput = getId("searchInput").value;
  if (searchInput === "") {
    return;
  }
  console.log("Search:", searchInput);
  loadData(searchInput);
}

function searchKategorie() {
  let searchInput = getId("searchInputkategorien").value.trim().toLowerCase();
  if (searchInput === "") {
    const dropdown = getId("kategorienDropdown");
    searchInput = dropdown.value.toLowerCase();
  }
  if (searchInput === "") {
    alert("Bitte einen Pokémon-Namen eingeben.");
    return;
  }
  console.log("Search Kategorie:", searchInput);
  loadKategorie(searchInput);
}

async function loadKategorie(type) {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/type/" + type); // Ruft die Typen-API ab
    const data = await response.json(); // Konvertiert die Antwort in ein JSON-Objekt
    console.log(data); // Optional: Konsolenausgabe, um die Daten zu sehen
    let cat = document.getElementById("kategorietext");
    cat.innerHTML = data.name; // Zeigt den Namen des Typs an
    let catpoke = document.getElementById("kategorienpokemon");
    catpoke.innerHTML = ""; // Löscht den vorherigen Inhalt
    catpoke.classList.add("kategorienpokemon");    // Fügt der 'kategorienpokemon'-Klasse eine CSS-Klasse hinzu

    // Holt Pokémon-Daten und filtert nach dem angegebenen Typ
    const pokemonPromises = data.pokemon.map(async (entry) => {
      const pokemonUrl = entry.pokemon.url;
      const pokemonResponse = await fetch(pokemonUrl);
      const pokemonData = await pokemonResponse.json();

      // Überprüfe, ob einer der Typen des Pokémon mit dem gesuchten Typ übereinstimmt
      const hasType = pokemonData.types.some(typeObj => typeObj.type.name === type);

      // Wenn der Pokémon-Typ übereinstimmt, wird es zur Liste hinzugefügt
      return hasType ? entry.pokemon.name : null;
    });

    // Alle Pokémon-Namen abrufen
    const pokemonNames = await Promise.all(pokemonPromises);

    // Filtere null-Werte (Pokémon ohne den gesuchten Typ)
    const visiblePokemon = pokemonNames.filter(name => name !== null);

    // Füge sichtbare Pokémon dem DOM hinzu
    visiblePokemon.forEach((name) => {
      catpoke.innerHTML += name + "<br>";
    });

  } catch (error) {
    console.log("Error:", error); // Fehlerbehandlung
  }
}


function loadData(pokemon) {
  console.log("Fetch");
  fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
    .then((response) => { 
      return response.json(); // Die Antwort wird als JSON verarbeitet
    }) 
    .then((data) => {
      console.log(data); // Ausgabe der abgerufenen Daten in der Konsole
      setHtml(getId("pokemon-name"), data.name);
      setHtml(getId("id-id"), "Nr. " + data.id); // Ändert den HTML Inhalt von "id-id" zu data.id
      setHtml(getId("kategorie"), data.types.map((type) => type.type.name).join(", "));
      getId("Bild").src = data.sprites.front_default; // Gibt das Bild aus
      let hp = getId("hp"); // Zeigt die Statistiken des Pokémon an (z.B. HP, Angriff, Verteidigung)
      hp.innerHTML = ""; // Löscht den vorherigen Inhalt
      hp.classList.add("hp"); // Fügt der 'hp'-Klasse eine CSS-Klasse hinzu
      data.stats.forEach(element => {
        hp.innerHTML += element.stat.name + " : " + element.base_stat + "<br>";// Zeile zur Tabelle hinzufügen
      });
      searchEvolution(); // Ruft die Evolution auf, nachdem die Daten geladen sind
      
      hp.innerHTML += "Base Experience : " + data.base_experience + "<br>";// Füge base_experience zur Liste hinzu
      let abilities = getId("abilities"); // Zeigt die Fähigkeiten des Pokémon an
      abilities.innerHTML = ""; // Löscht den vorherigen Inhalt
      abilities.classList.add("abilities"); // Fügt der 'abilities'-Klasse eine CSS-Klasse hinzu
      data.abilities.forEach(element => { 
        abilities.innerHTML += "- " + element.ability.name + "<br>";// Listet jede Fähigkeit auf
      });
      let attacken = getId("attackenContainer"); // Zeigt die Attacken des Pokémon in einer Tabelle an
      attacken.className = "attack-table"; // Setzt die CSS-Klasse für das Angriffstabelle
      attacken.innerHTML = ""; // Löscht den vorherigen Inhalt
      let moves = data.moves.map((move) => move.move.name); // Holt sich die Namen der Attacken
      let maxSpalten = 4; // Maximale Anzahl der Spalten
      for (let i = 0; i < moves.length; i += maxSpalten) { // Teilt die Attacken in Zeilen
        let row = document.createElement("div"); // Erstelle Variable rows (Zeilen)
        row.className = "row"; // Definiert row für CSS als "row"
        let maxCells = Math.min(maxSpalten, moves.length - i); // Bestimmt die Anzahl der Zellen in dieser Zeile
        for (let j = 0; j < maxCells; j++) { // Maximiert die Anzahl der Zellen basierend auf den verbleibenden Attacken
          let cell = document.createElement("div");
          cell.className = "cell";
          if (moves[i + j]) { 
            cell.textContent = moves[i + j]; 
          }
          row.appendChild(cell);
        }
        attacken.appendChild(row);// Zeile zur Tabelle hinzufügen
      }
      let content = getId("content");
      content.appendChild(attacken); // Die Tabelle der Angriffe zum Container hinzufügen
    }
  )
  .catch((error) => console.log("Error:", error));
}

async function fetchKategorieList() {
  const dropdown = getId("kategorienDropdown");
  try {
    const response = await fetch('https://pokeapi.co/api/v2/type?limit=10000');// Hole die Typen (Kategorien) von der PokeAPI
    const data = await response.json();
    data.results.forEach(category => {// Füge jede Kategorie als Option im Dropdown-Menü hinzu
      const option = document.createElement('option');
      option.value = category.name;
      option.textContent = category.name;
      dropdown.appendChild(option);
    });
  } catch (error) {
    console.error('Fehler beim Laden der Kategorien:', error);
    dropdown.innerHTML = '<option>Fehler beim Laden der Kategorien</option>';
  }
}
fetchKategorieList();

async function fetchPokemonList() { // Asynchrone Funktion zum Abrufen einer Liste von Pokémon-Namen
  const dropdown = getId("pokemonDropdown"); // Dropdown-Menü für Pokémon
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025'); // Ruft die Pokémon-Liste mit einem Limit von 1025 ab
    const data = await response.json();
    data.results.forEach(pokemon => { // Füge jeden Pokémon-Namen als Option zum Dropdown-Menü hinzu
      const option = document.createElement('option');
      option.value = pokemon.name;
      option.textContent = pokemon.name;
      dropdown.appendChild(option);
    });
  } catch (error) {
    console.error('Fehler beim Laden der Pokémon-Liste:', error);
    dropdown.innerHTML = '<option>Error loading Pokémon</option>';
  }
}
fetchPokemonList();

let attackenContainer = getId("attackenContainer") // Initialisierung des Containers für die Angriffe
attackenContainer.style.display = "none"; // Setzt den Container für die Angriffe auf unsichtbar

function toggleAttacks() {
  if (attackenContainer.style.display === "none") {
    attackenContainer.style.display = "block";
  } else {
    attackenContainer.style.display = "none";
  }
}

function searchEvolution() {
  let searchInput = getId("searchInput").value.trim().toLowerCase();// Hole den Wert aus dem Eingabefeld oder dem Dropdown-Menü
  if (searchInput === "") {
    const dropdown = getId("pokemonDropdown");
    searchInput = dropdown.value.toLowerCase();
  }
  if (searchInput === "") {
    alert("Bitte einen Pokémon-Namen eingeben.");
    return;
  }
  fetchEvolutionChainByPokemonName(searchInput);// Rufe die Funktion fetchEvolutionChainByPokemonName mit dem eingegebenen Namen auf
}

async function fetchEvolutionChainByPokemonName(pokemon) {
  try {
    let evolutionDiv = getId("Evolution");// Leere die Evolutionsanzeige bevor neue Daten hinzugefügt werden
    console.log(evolutionDiv);
    evolutionDiv.innerHTML = ""; // Leert die Anzeige der Evolution
    console.log(evolutionDiv);
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);// Abrufen der Spezies-Daten des angegebenen Pokémon
    if (!speciesResponse.ok) throw new Error("Keine Evolution gefunden");
    const speciesData = await speciesResponse.json();
    const evolutionChainUrl = speciesData.evolution_chain.url;// Evolutionskette-URL abrufen
    const evolutionResponse = await fetch(evolutionChainUrl); // Abrufen der Evolutionskette
    if (!evolutionResponse.ok) throw new Error("Evolution Chain konnte nicht geladen werden.");
    const evolutionData = await evolutionResponse.json();
    const speciesNames = [];// Verarbeiten der Evolutionskette und Ausgabe aller "species"
    function extractSpecies(chain) {// Funktion, die rekursiv durch die Evolutionskette geht
      if (chain.species.name !== pokemon) {
        speciesNames.push(chain.species.name);// Füge den Namen der aktuellen Spezies hinzu, wenn es nicht das angegebene Pokémon ist
      }
      chain.evolves_to.forEach(subChain => extractSpecies(subChain));
    }// Wenn es weitere Evolutionsstufen gibt, diese ebenfalls hinzufügen
    extractSpecies(evolutionData.chain);// Starte mit der ersten Kette
    speciesNames.forEach(name => {
      evolutionDiv.innerHTML += `${name}<br>`;// Ausgabe: Jede Spezies in einer eigenen Zeile // Zeilenumbruch mit <br> hinzufügen
    });
  } catch (error) {
      console.error(error.message);
      const evolutionDiv = getId("Evolution");
      evolutionDiv.innerHTML = "Fehler: " + error.message;
  }
  setHtml(getId("searchInput").value = ""); // Leert das Suchfeld nach der Suche
}
