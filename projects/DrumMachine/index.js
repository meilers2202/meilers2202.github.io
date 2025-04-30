// Funktion zum Abspielen eines Sounds
function playSound(soundName) {
    // const audio = new Audio(`sounds/${soundName}.mp3`); // Annahme: Sounds sind im Ordner "sounds"
    // audio.play();
    console.log(`Sound "${soundName}" abgespielt.`);
}

// Eine Liste von Soundnamen für jede Zeile (jede Zeile hat ihren eigenen Sound)
const rowSounds = [
    "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8" // Beispielhafte Zuordnung von Sounds zu den Zeilen
];

const grid = document.getElementById('checkbox-grid');
let intervalId;
let currentColumn = 0;

// Funktion zum Erzeugen der Checkboxen
function generateCheckboxes() {
    for (let row = 1; row <= 8; row++) {
        for (let col = 1; col <= 8; col++) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('checkbox');
            
            checkbox.setAttribute('data-zeile', row);
            checkbox.setAttribute('data-spalte', col);
            
            checkbox.addEventListener('change', function() {
                // Checkbox-Status wird im Grid gespeichert, keine direkte Ausgabe notwendig
            });

            grid.appendChild(checkbox);
        }
    }
}

// Funktion zum Starten des Abspielens
function startPlaying() {
    // Alle 125ms Spalte wechseln und die gecheckten Sounds abspielen
    intervalId = setInterval(() => {
        // Alle Checkboxen der aktuellen Spalte abfragen
        for (let row = 1; row <= 8; row++) {
            const checkbox = document.querySelector(`input[data-zeile="${row}"][data-spalte="${currentColumn + 1}"]`);
            if (checkbox && checkbox.checked) {
                // Wenn die Checkbox gecheckt ist, den zugeordneten Sound abspielen
                playSound(rowSounds[row - 1]);
            }
        }

        // Spalte wechseln, wenn die letzte Spalte erreicht ist, zurück zur ersten
        currentColumn = (currentColumn + 1) % 8;
    }, 125);
}

// Funktion zum Stoppen des Abspielens
function stopPlaying() {
    clearInterval(intervalId);
}

// Event Listener für die Schaltflächen
document.getElementById('startButton').addEventListener('click', startPlaying);
document.getElementById('stopButton').addEventListener('click', stopPlaying);

// Erzeuge die Checkboxen
generateCheckboxes();