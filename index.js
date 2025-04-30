// Funktion zum Aktivieren/Deaktivieren des Darkmodes
function darkmode() {
    const element = document.body;
    element.classList.toggle('dark-mode'); // Die CSS-Klasse für Darkmode
    
    // Den Zustand des Darkmodes im LocalStorage speichern
    if (element.classList.contains('dark-mode')) {
      localStorage.setItem('darkmode', 'enabled');
    } else {
      localStorage.setItem('darkmode', 'disabled');
    }
  }
  
  // Beim Laden der Seite prüfen, ob Darkmode aktiv ist
  document.addEventListener('DOMContentLoaded', function () {
    const darkModeSetting = localStorage.getItem('darkmode');
    if (darkModeSetting === 'enabled') {
      document.body.classList.add('dark-mode');
    }
  });
  