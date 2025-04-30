let start = 0;
let end = 0;
let sum = 0;
let früh = 0; // Declare früh variable
let lunch = 0; // Declare lunch variable
let breakStart = 0;
let breakEnd = 0;
let lunchStart = 0;
let lunchEnd = 0;
let sumpause = 0;
let skipBreaks = false;
let description = '';
let startMinutes = 0; // Declare startMinutes globally
let endMinutes = 0;   // Declare endMinutes globally

// Funktion, um alle Eingabewerte zu holen
function initialize() {
    start = document.getElementById('start').value;
    end = document.getElementById('end').value;
    breakStart = document.getElementById('breakStart').value;
    breakEnd = document.getElementById('breakEnd').value;
    lunchStart = document.getElementById('lunchStart').value;
    lunchEnd = document.getElementById('lunchEnd').value;
    description = document.getElementById('activityDescription').value;
}

// Berechnet die Stunden und Pausen
function calculateHours() {
    initialize(); // Holen aller Eingabewerte
    
    if (!start || !end) {
        alert('Bitte Start- und Endzeit eingeben!');
        return;
    }

    calculateFrüh(); // Berechnet die Frühpause
    calculateMittag(); // Berechnet die Mittagspause
    sumpause = früh + lunch; // Gesamte Pausenzeit

    start = timeToMinutes(start);
    end = timeToMinutes(end);
    
    if (start >= end) {
        alert('Die Endzeit muss nach der Startzeit liegen!');
        return;
    }

    sum = end - start;
    sum = sum / 60;  // Umrechnung in Stunden

    if (!skipBreaks) {
        sum -= sumpause; // Pausen abziehen, wenn nicht übersprungen
    }

    // Zeige das Ergebnis und verstecke die Zeit- und Pausenabschnitte
    document.getElementById('calculateBtn').style.display = 'none';
    document.querySelector('.time-section').style.display = 'none';
    document.querySelector('.break-section').style.display = 'none';
    document.getElementById('activitiesSection').style.display = 'block';
    document.getElementById('result').textContent = `Du hast ${sum} Stunden gearbeitet.`;
}

// Berechnet die Frühstückspause um
function calculateFrüh() {
    if (breakStart && breakEnd) {
        breakStart = timeToMinutes(breakStart);
        breakEnd = timeToMinutes(breakEnd);
        if (breakStart >= breakEnd) {
            alert('Die Frühpause Endzeit muss nach der Startzeit liegen!');
            return;
        }
        früh = (breakEnd - breakStart) / 60;  // Berechnet die Frühpause in Stunden
    } else {
        früh = 0;
    }
}

// Funktion um eine Aktivität hinzuzufügen
function addActivity() {
    // Hole alle Eingabewerte
    initialize();

    // Überprüfe, ob alle Felder ausgefüllt sind
    if (!description || !start || !end) {
        alert('Bitte alle Felder ausfüllen!');
        return;
    }

    // Berechne die Dauer der Tätigkeit in Minuten
    startMinutes = timeToMinutes(document.getElementById('activityStart').value);
    endMinutes = timeToMinutes(document.getElementById('activityEnd').value);

    if (startMinutes >= endMinutes) {
        alert('Die Endzeit der Tätigkeit muss nach der Startzeit liegen!');
        return;
    }

    let durationInMinutes = endMinutes - startMinutes;

    // Überprüfe, ob die Dauer der Tätigkeit gültig ist
    if (durationInMinutes <= 0) {
        alert('Ungültige Zeitangabe für die Tätigkeit!');
        return;
    }

    // Berechne die Pausen, die innerhalb der Tätigkeit liegen
    let activityBreaks = calculateActivityBreaks(startMinutes, endMinutes);

    // Abziehen der Pausenzeit von der Gesamtdauer der Tätigkeit
    let effectiveDurationInMinutes = durationInMinutes - activityBreaks;

    // Erstelle ein neues Listenelement für die Aktivität
    let listItem = document.createElement('li');
    listItem.textContent = description + ": " + (effectiveDurationInMinutes / 60).toFixed(2) + " Stunden";  // In Stunden umrechnen
    listItem.dataset.duration = (effectiveDurationInMinutes / 60).toFixed(2); // Dauer in Stunden speichern

    // Füge den Löschen-Button hinzu
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Löschen";
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', function() {
        removeActivity(listItem, effectiveDurationInMinutes); // Lösche die Aktivität
    });

    // Anhängen des Löschen-Buttons
    listItem.appendChild(deleteButton);

    // Füge das Listenelement der Aktivitätenliste hinzu
    document.getElementById('activitiesList').appendChild(listItem);

    // Berechne die gesamte Zeit der Tätigkeiten in Dezimalstunden
    updateTotalActivityTime();
    
    // Leere die Felder
    document.getElementById('activityDescription').value = '';
    document.getElementById('activityStart').value = '';
    document.getElementById('activityEnd').value = '';
}

// Funktion zum Entfernen einer Aktivität
function removeActivity(listItem, durationInMinutes) {
    document.getElementById('activitiesList').removeChild(listItem); // Entfernt das Listenelement
    updateTotalActivityTime(); // Gesamtzeit neu berechnen
}

// Berechnet die gesamte Zeit aller Tätigkeiten
function updateTotalActivityTime() {
    let totalActivityTime = 0;
    let listItems = document.querySelectorAll('#activitiesList li');
    for (let i = 0; i < listItems.length; i++) {
        totalActivityTime += parseFloat(listItems[i].dataset.duration); // Gesamtdauer der Tätigkeiten
    }

    document.getElementById('totalActivityTime').textContent = "Gesamtzeit der Tätigkeiten: " + totalActivityTime.toFixed(2) + " Stunden";
}

// Berechne die Pausen, die innerhalb des Zeitrahmens einer Tätigkeit liegen
function calculateActivityBreaks(activityStart, activityEnd) {
    let totalPause = 0;

    // Frühpause nur abziehen, wenn sie innerhalb des Tätigkeitszeitraums liegt
    if (breakStart < activityEnd && breakEnd > activityStart) {
        let overlapStart = Math.max(activityStart, breakStart);
        let overlapEnd = Math.min(activityEnd, breakEnd);
        totalPause += (overlapEnd - overlapStart); // Pausenzeit in Minuten berechnen
    }

    // Mittagspause nur abziehen, wenn sie innerhalb des Tätigkeitszeitraums liegt
    if (lunchStart < activityEnd && lunchEnd > activityStart) {
        let overlapStart = Math.max(activityStart, lunchStart);
        let overlapEnd = Math.min(activityEnd, lunchEnd);
        totalPause += (overlapEnd - overlapStart); // Pausenzeit in Minuten berechnen
    }

    return totalPause; // Gesamtpausenzeit in Minuten zurückgeben
}

// Berechnet die Mittagspause um
function calculateMittag() {
    if (lunchStart && lunchEnd) {
        lunchStart = timeToMinutes(lunchStart);
        lunchEnd = timeToMinutes(lunchEnd);
        if (lunchStart >= lunchEnd) {
            alert('Die Mittagspause Endzeit muss nach der Startzeit liegen!');
            return;
        }
        lunch = (lunchEnd - lunchStart) / 60;  // Berechnet Mittagspause in Stunden
    } else {
        lunch = 0;
    }
}

// hh:mm in min umwandeln (17:30 Uhr -> 1050 Minuten)
function timeToMinutes(time) {
    if (!time) return 0;
    const [hours, minutes] = time.split(':').map(Number);
    return (hours * 60) + minutes;
}

document.getElementById('toggleBreaksBtn').addEventListener('click', function () {
    const breakSection = document.getElementById('breakSection');
    breakSection.style.display = breakSection.style.display === 'none' ? 'block' : 'none';
    skipBreaks = !skipBreaks;
    this.textContent = skipBreaks ? 'Pausen einbeziehen' : 'Pausen überspringen';
});

document.getElementById('calculateBtn').addEventListener('click', calculateHours);
document.getElementById('addActivityBtn').addEventListener('click', addActivity);
