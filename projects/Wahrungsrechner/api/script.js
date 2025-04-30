function searchData() {
    let searchInput = document.getElementById("searchInput").value;
    if (searchInput === "") {
        return;
    }
    console.log("Search:", searchInput);
    loadData(searchInput);
}

function loadData(pokemon) {
  console.log("Fetch");
  fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let content = document.getElementById("content");

      let pokename = document.getElementById("pokemon-name");
      pokename.innerHTML = data.name;
      
      // Bild hinzufügen
      let hp = document.createElement("hp");
      let image = document.createElement("img");
      image.src = data.sprites.front_default;
      image.className = "Bild";
      content.appendChild(image);
      
      // Statuswerte (HP etc.)
      hp.classList.add("hp");
      data.stats.forEach(element => {
        hp.innerHTML += element.stat.name + " : " + element.base_stat + "<br>";
      });
      
      // Fähigkeiten (Abilities)
      let abilities = document.createElement("abilities");
      data.abilities.forEach(element => {
        abilities.innerHTML += "<br>" + element.ability.name + "<br>";
      });
      content.appendChild(abilities);
      
      // Attacken (Moves) in einer Tabelle darstellen
      let attacken = document.createElement("div");
      attacken.className = "attack-table"; // CSS-Klasse für Styling
      
      // Dynamische Darstellung von Attacken
      let moves = data.moves.map((move) => move.move.name); // Array aller Attacken
      for (let i = 0; i < moves.length; i += 4) {
        let row = document.createElement("div");
        row.className = "row"; // CSS-Klasse für Zeile

        for (let j = 0; j < 4; j++) {
          let cell = document.createElement("div");
          cell.className = "cell"; // CSS-Klasse für Zelle
          if (moves[i + j]) { // Nur hinzufügen, wenn eine Attacke existiert
            cell.textContent = moves[i + j];
          }
          row.appendChild(cell);
        }

        attacken.appendChild(row);
      }
      content.appendChild(attacken);
    })
    .catch((error) => console.log("Error:", error));
}


async function fetchPokemonList() {
    const dropdown = document.getElementById("pokemonDropdown");
    
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010');
      const data = await response.json();

      // Füge Optionen zum Dropdown hinzu
      data.results.forEach(pokemon => {
        const option = document.createElement('option');
        option.value = pokemon.name; // Setze den Wert als Pokémon-Namen
        option.textContent = pokemon.name; // Textinhalt im Dropdown
        dropdown.appendChild(option); // Füge die Option hinzu
      });
    } catch (error) {
      console.error('Fehler beim Laden der Pokémon-Liste:', error);
      dropdown.innerHTML = '<option>Error loading Pokémon</option>';
    }
  }

  // Initialisiere das Dropdown-Menü
  fetchPokemonList();

function toggleAttacks() {
  const attackenContainer = document.getElementById("attackenContainer");
  
  // Ein- oder Ausblenden basierend auf der aktuellen Sichtbarkeit
  if (attackenContainer.style.display === "none") {
    attackenContainer.style.display = "block";
  } else {
    attackenContainer.style.display = "none";
  }
}
