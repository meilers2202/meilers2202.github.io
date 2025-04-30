document.addEventListener('DOMContentLoaded', () => {
    const guessForm = document.getElementById('guessForm');
    const guessField = document.getElementById('guessField');
    const resultOutput = document.getElementById('resultOutput');
    
    const secretNumber = Math.floor(Math.random() * 10) + 1;
    let attempts = 0;

    guessForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userGuess = parseInt(guessField.value);
        attempts++;

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
            resultOutput.textContent = "Bitte gib eine Zahl zwischen 1 und 10 ein.";
        } else if (userGuess < secretNumber) {
            resultOutput.textContent = "Zu niedrig! Versuche es noch einmal.";
        } else if (userGuess > secretNumber) {
            resultOutput.textContent = "Zu hoch! Versuche es noch einmal.";
        } else {
            resultOutput.textContent = `Gratulation! Du hast die Zahl ${secretNumber} in ${attempts} Versuchen erraten!`;
            guessField.disabled = true;
            document.getElementById('submitGuess').disabled = true;
        }

        guessField.value = '';
        guessField.focus();
    });
});