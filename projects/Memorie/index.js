let emojis = ["🎄", "🎅", "❄️", "🎁", "🕯️", "⛄", "🌟", "🧑‍🎄"];  // Hier definieren wir eine Liste von Weihnachts-Emojis, die im Spiel verwendet werden
let paarEmo = []; // Array für die gepaarten Emojis, die im Spiel angezeigt werden
let gedrehteK = []; // Array, um die Karten zu speichern, die aufgedeckt wurden
let gefundeneP = 0; // Zählt, wie viele Paare korrekt gefunden wurden
let spielfeld = document.getElementById('game-board'); // Hier bekommen wir die Referenz zum Spielfeld-Element

function starten() {// Diese Funktion startet das Spiel
    paarEmo = [...emojis, ...emojis];// Dupliziere die Emojis, um Paare zu erzeugen
    paarEmo.sort(() => Math.random() - 0.5);// Mische die Emojis zufällig, um das Spiel spannend zu machen
    paarEmo.forEach(emoji => {// Erstelle für jedes Emoji eine Karte und füge sie zum Spielfeld hinzu
        let karte = document.createElement('div'); // Erstelle ein div-Element für jede Karte
        karte.classList.add('card'); // Die Karte bekommt die Klasse 'karte'
        let emojiElement = document.createElement('span');// Erstelle das Emoji-Element, das zu Beginn unsichtbar ist
        emojiElement.classList.add('emoji');
        emojiElement.textContent = emoji; // Das Emoji wird hier gesetzt
        karte.appendChild(emojiElement);// Das Emoji-Element wird der Karte hinzugefügt
        karte.addEventListener('click', function() {// Event-Listener für den Klick auf die Karte
            if (gedrehteK.length < 2 && !karte.classList.contains('clicked')) {// Wenn weniger als zwei Karten umgedreht wurden und die Karte noch nicht angeklickt wurde
                karteUmdrehen(karte); // Funktion aufrufen, um die Karte umzudrehen
        }});
        spielfeld.appendChild(karte);// Die Karte wird dem Spielfeld hinzugefügt
    });
}

function karteUmdrehen(karte) {// Funktion, um eine Karte umzudrehen
    karte.classList.add('clicked');    // Die Karte wird umgedreht (sichtbar gemacht)
    gedrehteK.push(karte); // Die umgedrehte Karte wird zum Array der umgedrehten Karten hinzugefügt
    if (gedrehteK.length === 2) {    // Überprüfe, ob bereits zwei Karten umgedreht wurden
        let [karte1, karte2] = gedrehteK; // Die beiden umgedrehten Karten werden entpackt
        if (karte1.textContent === karte2.textContent) { // Wenn die Emojis übereinstimmen
            gefundeneP++; // Erhöhe die Anzahl der gefundenen Paare
            gedrehteK = []; // Leere das Array der umgedrehten Karten
            if (gefundeneP === emojis.length) {// Überprüfe, ob alle Paare gefunden wurden
                setTimeout(() => {// Wenn alle Paare gefunden wurden, zeige eine Gewinnnachricht an
                    let gewonnen = document.createElement('h2');
                    gewonnen.textContent = "Herzlichen Glückwunsch! Du hast alle Paare gefunden!"; 
                    h2.appendChild(gewonnen); // Zeige die Nachricht im Spielfeld an
                }, 1000); // Verzögere die Nachricht um 1 Sekunde
            }
        } else {
            setTimeout(() => {// Wenn die Emojis nicht übereinstimmen, drehe die Karten nach einer kurzen Verzögerung wieder um
                karte1.classList.remove('clicked'); // Karte 1 wird wieder umgedreht
                karte2.classList.remove('clicked'); // Karte 2 wird wieder umgedreht
                gedrehteK = []; // Leere das Array der umgedrehten Karten
            }, 1000); // Verzögere das Zurückdrehen um 1 Sekunde
        }
    }
}
starten();// Starte das Spiel