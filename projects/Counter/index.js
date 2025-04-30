let countEl = document.getElementById("count-el");
let count = 0;

// Zählt alle gespeicherten Counts
let savedCounts = JSON.parse(localStorage.getItem("savedCounts")) || [];

// Zähler erhöhen
function increment() {
    count += 1;
    countEl.innerText = count;
}

// Zähler verdoppeln
function double() {
    count *= 2;
    countEl.innerText = count;
}

// Zähler verringern
function decrement() {
    count -= 1;
    countEl.innerText = count;
}

// Zähler auf 0 setzen
function reset() {
    count = 0;
    countEl.innerText = count;
}

// Zählerwert festlegen
function setCount(newCount) {
    count = newCount;
    countEl.innerText = count;
}

// Zähler speichern
function save() {
    if (savedCounts.length >= 10) {
        // Entferne den ältesten Eintrag, wenn mehr als 10 gespeichert sind
        savedCounts.shift();
    }
    savedCounts.push(count);
    localStorage.setItem("savedCounts", JSON.stringify(savedCounts));
    console.log("Saved count: " + count);

    // Liste aktualisieren, falls das Menü offen ist
    const loadOptionsDiv = document.getElementById("load-options");
    if (loadOptionsDiv.style.display === "block") {
        updateLoadList();
    }
}

// Dropdown-Menü anzeigen
function showLoadOptions() {
    const loadOptionsDiv = document.getElementById("load-options");
    loadOptionsDiv.style.display = loadOptionsDiv.style.display === "none" ? "block" : "none";

    // Liste beim Öffnen immer aktualisieren
    if (loadOptionsDiv.style.display === "block") {
        updateLoadList();
    }
}

// Gespeicherte Elemente laden und in der Liste anzeigen
function updateLoadList() {
    const loadList = document.getElementById("load-list");
    loadList.innerHTML = ""; // Alte Einträge löschen

    savedCounts.forEach((savedCount, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Save ${index + 1}: ${savedCount}`;
        listItem.style.cursor = "pointer";
        listItem.onclick = () => loadSavedCount(index);
        loadList.appendChild(listItem);
    });

    // Reset-Knopf hinzufügen
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset Saved List";
    resetButton.style.backgroundColor = "#e74c3c";
    resetButton.style.color = "#fff";
    resetButton.style.border = "none";
    resetButton.style.padding = "10px";
    resetButton.style.marginTop = "10px";
    resetButton.style.cursor = "pointer";
    resetButton.style.borderRadius = "5px";
    resetButton.onclick = resetSavedCounts;

    loadList.appendChild(resetButton);
}

// Gespeicherten Zählerwert laden
function loadSavedCount(index) {
    setCount(savedCounts[index]);
    console.log("Loaded count: " + savedCounts[index]);

    // Menü schließen
    const loadOptionsDiv = document.getElementById("load-options");
    loadOptionsDiv.style.display = "none";
}

// Liste der gespeicherten Zähler löschen
function resetSavedCounts() {
    savedCounts = [];
    localStorage.setItem("savedCounts", JSON.stringify(savedCounts));
    console.log("Saved counts reset!");

    // Liste aktualisieren
    updateLoadList();
}