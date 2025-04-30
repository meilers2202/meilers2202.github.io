const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn'); // Korrektur des Selektors
const gameWidth = gameBoard.width; // Breite des Spielfelds
const gameHeight = gameBoard.height; // Höhe des Spielfelds
const boardBackground = "white"; // Hintergrundfarbe des Spiels
const snakeColor = "limegreen"; // Farbe der Schlange
const snakeBorder = "black"; // Rahmenfarbe der Schlange
const foodColor = "red"; // Farbe des Essens
const unitSize = 25; // Größe eines Spielfeldfeldes (Einheit)
let running = false; // Flag, ob das Spiel läuft
let xVelocity = unitSize; // Geschwindigkeit der Schlange auf der X-Achse
let yVelocity = 0; // Geschwindigkeit der Schlange auf der Y-Achse
let foodX; // X-Position des Essens
let foodY; // Y-Position des Essens
let score = 0; // Aktueller Punktestand
let scores = 0;
let snake = [ // Array, das die Positionen der Schlangenteile speichert
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);    // Event Listener für die Tastenanschläge (Steuerung der Schlange)
resetBtn.addEventListener("click", resetGame);  // Event Listener für den Reset-Button (Neustart des Spiels)
gameStart();    // Startet das Spiel

// ... existing code ...

let botRunning = false; // Zu Beginn ist der Bot-Modus deaktiviert
let botSpeed = 75; // Geschwindigkeit des Bots (Millisekunden zwischen Bewegungen)

document.querySelector('#startBot').addEventListener('click', function() {
    botRunning = !botRunning;
    if (botRunning) {
        gameStart(); // Starte das Spiel im Bot-Modus
    } else {
        resetGame(); // Setze das Spiel zurück
    }
});

function botMove() {
    if (running) {
        setTimeout(() => {
            clearBoard(); // Löscht das Spielfeld
            drawFood(); // Zeichnet das Essen
            moveSnake(); // Bewegt die Schlange
            drawSnake(); // Zeichnet die Schlange
            checkGameOver(); // Überprüft, ob das Spiel vorbei ist
            changeDirectionBot();  // Bot-Steuerung für die Richtung
            botMove();  // Wiederhole den Bot-Mechanismus
        }, botSpeed);
    } else {
        displayGameOver();  // Zeige "Game Over" an, wenn das Spiel vorbei ist
    }
}


function moveSnake() {
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity}; // Neues Kopfsegment der Schlange
    snake.unshift(head); // Füge das Kopfsegment hinzu
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.textContent = score; // Aktualisiere den Punktestand
        createFood(); // Erstelle neues Essen
    } else {
        snake.pop(); // Entferne das letzte Segment der Schlange
    }
}


function changeDirectionBot() {
    // Berechne die Richtung des Essens im Verhältnis zur Schlange
    const head = snake[0];
    const dx = foodX - head.x;
    const dy = foodY - head.y;

    // Bestimme die Richtung der Bewegung basierend auf dem Essen
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && xVelocity !== -unitSize) {
            xVelocity = unitSize;
            yVelocity = 0;
        } else if (dx < 0 && xVelocity !== unitSize) {
            xVelocity = -unitSize;
            yVelocity = 0;
        }
    } else {
        if (dy > 0 && yVelocity !== -unitSize) {
            yVelocity = unitSize;
            xVelocity = 0;
        } else if (dy < 0 && yVelocity !== unitSize) {
            yVelocity = -unitSize;
            xVelocity = 0;
        }
    }
}

function checkGameOver() {  // Function that checks if the game is over (snake hits the edge or itself)
    switch (true) {
        case (snake[0].x < 0): // Snake hits the left edge
        case (snake[0].x >= gameWidth): // Snake hits the right edge
        case (snake[0].y < 0): // Snake hits the top edge
        case (snake[0].y >= gameHeight): // Snake hits the bottom edge
            running = false; // The game is over
            break;
    }

    // Checks if the snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
}


function gameStart() {  // Funktion, die das Spiel startet
    running = true; // Das Spiel läuft
    scoreText.textContent = score; // Setzt den aktuellen Punktestand
    createFood(); // Erzeugt ein neues Stück Essen
    drawFood(); // Zeichnet das Essen auf dem Spielfeld
    nextTick(); // Beginnt die Spiellogik (Schlange bewegen)
}

function nextTick() {   // Funktion, die das Spiel jede 75ms aktualisiert
    if (running) {
        setTimeout(() => {
            clearBoard(); // Löscht das Spielfeld
            drawFood(); // Zeichnet das Essen
            moveSnake(); // Bewegt die Schlange
            drawSnake(); // Zeichnet die Schlange
            checkGameOver(); // Überprüft, ob das Spiel vorbei ist
            nextTick(); // Ruft die Funktion erneut auf, um das Spiel fortzusetzen
        }, 50)
    } else {
        displayGameOver(); // Zeigt "Game Over" an, wenn das Spiel vorbei ist
    }
}

function clearBoard() { // Funktion, die das Spielfeld löscht
    ctx.fillStyle = boardBackground; // Setzt die Hintergrundfarbe
    ctx.fillRect(0, 0, gameWidth, gameHeight); // Löscht das gesamte Spielfeld
}

function createFood() { // Funktion, die ein Stück Essen an zufälliger Position erstellt
    function randomFood(min, max) {
        // Generiert eine zufällige Zahl innerhalb eines bestimmten Bereichs
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum; // Gibt die zufällige Zahl zurück
    }
    foodX = randomFood(0, gameWidth - unitSize); // X-Position des Essens
    foodY = randomFood(0, gameHeight - unitSize); // Y-Position des Essens
}

function drawFood() {   // Funktion, die das Essen auf dem Spielfeld zeichnet
    ctx.fillStyle = foodColor; // Setzt die Farbe des Essens
    ctx.fillRect(foodX, foodY, unitSize, unitSize); // Zeichnet das Essen
}

function moveSnake() {  // Funktion, die die Schlange bewegt
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity}; // Neues Kopfsegment der Schlange
    snake.unshift(head); // Fügt das Kopfsegment am Anfang der Schlange hinzu
    // Wenn die Schlange das Essen erreicht, wird der Punktestand erhöht und neues Essen erstellt
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.textContent = score; // Aktualisiert den Punktestand
        createFood(); // Erstellt neues Essen
    } else {
        snake.pop(); // Entfernt das letzte Segment der Schlange
    }
}

function drawSnake() {  // Funktion, die die Schlange auf dem Spielfeld zeichnet
    ctx.fillStyle = snakeColor; // Setzt die Farbe der Schlange
    ctx.strokeStyle = snakeBorder; // Setzt die Farbe des Rahmens
    snake.forEach(snakePart => { // Zeichnet jedes Segment der Schlange
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}

function changeDirection(event) {// Funktion, die die Richtung der Schlange ändert
    const keyPressed = event.keyCode; // Ermittelt die gedrückte Taste
    const UP = 87; // W-Taste (nach oben)
    const DOWN = 83; // S-Taste (nach unten)
    const LEFT = 65; // A-Taste (nach links)
    const RIGHT = 68; // D-Taste (nach rechts)
    const goingUP = (yVelocity == -unitSize);
    const goingDOWN = (yVelocity == unitSize);
    const goingLEFT = (xVelocity == -unitSize);
    const goingRIGHT = (xVelocity == unitSize);
    switch (true) {
        case (keyPressed == LEFT && !goingRIGHT):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == RIGHT && !goingLEFT):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == UP && !goingDOWN):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case (keyPressed == DOWN && !goingUP):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
}

function checkGameOver() {  // Funktion, die überprüft, ob das Spiel vorbei ist
    switch (true) {
        case (snake[0].x < 0): // Schlange trifft den linken Rand
        case (snake[0].x >= gameWidth): // Schlange trifft den rechten Rand
        case (snake[0].y < 0): // Schlange trifft den oberen Rand
        case (snake[0].y >= gameHeight): // Schlange trifft den unteren Rand
            running = false; // Das Spiel endet
            break;
    }

    // Überprüft, ob die Schlange sich selbst getroffen hat
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
}

function displayGameOver() {    // Funktion, die "Game Over" anzeigt, wenn das Spiel endet
    ctx.font = "50px MV Boli"; // Setzt die Schriftgröße
    ctx.fillStyle = "black"; // Setzt die Schriftfarbe
    ctx.textAlign = "center"; // Zentriert den Text
    ctx.fillText("Game Over", gameWidth / 2, gameHeight / 2); // Zeigt "Game Over" an
    running = false; // Das Spiel endet
}

function resetGame() {  // Funktion, die das Spiel zurücksetzt und neu startet
    score = 0; // Punktestand zurücksetzen
    xVelocity = unitSize; // Startgeschwindigkeit der Schlange
    yVelocity = 0;
    snake = [ // Schlange auf Anfangsposition setzen
        {x: unitSize * 4, y: 0},
        {x: unitSize * 3, y: 0},
        {x: unitSize * 2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}
    ];
    gameStart(); // Spiel neu starten
}

// Wichtig: Ändere den Reset-Button-Handler, um zu verhindern, dass der Bot-Modus nach einem Reset weiterläuft.
resetBtn.addEventListener("click", function() {
    botRunning = false;  // Stelle sicher, dass der Bot-Modus deaktiviert wird, wenn das Spiel zurückgesetzt wird
    resetGame();  // Setze das Spiel zurück
});

function displayScoreboard() {    // Funktion, die das Scoreboard anzeigt, wenn das Spiel vorbei ist
    ctx.font = "30px Arial"; // Setzt die Schriftgröße
    ctx.fillStyle = "black"; // Setzt die Schriftfarbe
    ctx.textAlign = "center"; // Zentriert den Text
    ctx.fillText("Score: " + score, gameWidth / 2, gameHeight / 2 + 60); // Zeigt den Punktestand an
}