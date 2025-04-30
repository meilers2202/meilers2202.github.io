document.addEventListener("DOMContentLoaded", () => {
    // Verweise auf die HTML-Elemente für die Anzeige von Produktinformationen
    const videoElement = document.getElementById('scanner');
    const productNameElement = document.getElementById('product-name');
    const productManufacturerElement = document.getElementById('product-manufacturer');
    const productPriceElement = document.getElementById('product-price');
    const debugElement = document.getElementById('debug-info');  // Neues Debugging-Element für Echtzeit-Logs

    let scanning = true;  // Status, ob der Scan-Prozess läuft
    let lastScanTime = 0;  // Zeit des letzten Scans, um unnötige Scans zu verhindern
    let scanCount = 0;  // Zählt, wie oft der Barcode-Scan ausgeführt wurde

    alert("Dokument geladen, Kamera wird gestartet...");  // Zeigt an, dass das Dokument geladen wurde und die Kamera gestartet wird
    updateDebugInfo("Dokument geladen, Kamera wird gestartet...");
    startCamera();  // Starte die Kamera, wenn das Dokument geladen ist

    // Funktion zum Zugriff auf die Kamera
    async function startCamera() {
        alert("Versuche, auf die Kamera zuzugreifen...");  // Debugging: Zeigt an, dass die Kameraanfrage startet
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',  // Rückkamera
                    width: { ideal: 1920 }, // Höhere Auflösung für bessere Qualität
                    height: { ideal: 1080 }
                }
            });
            alert("Kamera zugänglich!");  // Bestätigt, dass der Kamerastream erhalten wurde
            videoElement.srcObject = stream;
            videoElement.setAttribute('playsinline', true); // Für iOS
            videoElement.play(); // Sicherstellen, dass das Video gestartet wird
            console.log("Kamera gestartet!");
            alert("Kamera gestartet!");  // Zeigt an, dass die Kamera erfolgreich gestartet wurde
            debugElement.textContent = "Kamera gestartet!";
            scanBarcode(); // Startet das Scannen von Barcodes
        } catch (error) {
            console.error("Kamera konnte nicht gestartet werden:", error);
            alert("Fehler beim Zugriff auf die Kamera!");  // Fehlermeldung, falls der Zugriff auf die Kamera fehlschlägt
        }
    }

    // Funktion zum Scannen von Barcodes
    function scanBarcode() {
        alert("Starte Barcode-Scan...");  // Zeigt an, dass der Barcode-Scan-Prozess beginnt
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        function detectBarcode() {
            if (scanning && videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
                // Überprüfen, ob genug Zeit seit dem letzten Scan vergangen ist
                const now = Date.now();
                if (now - lastScanTime < 1000) {
                    // Wenn der Scan zu schnell wiederholt wird, überspringe ihn
                    requestAnimationFrame(detectBarcode);
                    return;
                }

                // Canvas-Größe an die Videoauflösung anpassen
                canvas.width = videoElement.videoWidth || 1920;
                canvas.height = videoElement.videoHeight || 1080;

                // Bilddaten vom Video-Element holen
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                // Barcode-Daten extrahieren
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                console.log("Bilddaten analysieren..."); // Debugging: Bilddaten auslesen
                alert("Bilddaten werden analysiert...");  // Zeigt an, dass die Bilddaten analysiert werden

                // Barcode-Scan durchführen
                const code = jsQR(imageData.data, canvas.width, canvas.height, {
                    inversionAttempts: "dontInvert"
                });

                if (code) {
                    console.log("Barcode erkannt: " + code.data); // Barcode-Daten ausgeben
                    alert("Barcode erkannt: " + code.data);  // Barcode-Daten anzeigen
                    lastScanTime = now;  // Setze die Zeit des letzten Scans
                    const barcode = code.data;
                    getProductInfo(barcode);  // Hole Produktinformationen
                    scanning = false;  // Stoppt den Scan-Prozess nach der Erkennung
                } else {
                    console.log("Kein Barcode erkannt!");  // Debugging: Barcode nicht erkannt
                    alert("Kein Barcode erkannt!");  // Zeigt an, dass kein Barcode erkannt wurde
                }
            }

            // Wenn noch gescannt werden soll, den Prozess fortsetzen
            if (scanning) {
                requestAnimationFrame(detectBarcode);  // Weiter scannen, wenn nicht gestoppt
            }
        }

        detectBarcode(); // Startet den Barcode-Scan
    }

    // Funktion um Produktinformationen zu holen
    function getProductInfo(barcode) {
        alert("Hole Produktinformationen für Barcode: " + barcode);  // Zeigt an, dass Produktinformationen für den Barcode abgerufen werden
        console.log("Hole Produktinformationen für Barcode: " + barcode);
        const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                alert("API-Antwort empfangen!");  // Bestätigung, dass die API-Antwort empfangen wurde
                console.log("API-Antwort empfangen!");
                if (data.product) {
                    const product = data.product;
                    productNameElement.textContent = `Produktname: ${product.product_name || 'Nicht gefunden'}`;
                    productManufacturerElement.textContent = `Hersteller: ${product.brands || 'Unbekannt'}`;
                    productPriceElement.textContent = `Preis: ${product.price || 'Preis nicht verfügbar'}`;
                    alert("Produktinformationen angezeigt!");
                } else {
                    console.log("Kein Produkt gefunden!");
                    alert("Kein Produkt gefunden!");  // Zeigt an, dass kein Produkt gefunden wurde
                    productNameElement.textContent = 'Produkt nicht gefunden';
                    productManufacturerElement.textContent = '';
                    productPriceElement.textContent = '';
                }
            })
            .catch(error => {
                console.error("Fehler beim Abrufen der Produktdaten:", error);
                alert("Fehler beim Abrufen der Produktdaten!");  // Zeigt an, dass es einen Fehler beim Abrufen der Produktdaten gab
                productNameElement.textContent = 'Fehler beim Abrufen der Produktdaten';
            });
    }

    // Funktion zur Aktualisierung von Debugging-Informationen
// Funktion zur Aktualisierung von Debugging-Informationen
    function updateDebugInfo(message) {
        const debugElement = document.getElementById('debug-info');
        
        if (debugElement) {  // Überprüfe, ob das Element existiert
            debugElement.textContent = message;
            console.log(message);  // Ausgabe in die Konsole
        } else {
            console.warn('Debugging-Element nicht gefunden!');
            console.log(message);  // Falls das Element nicht vorhanden ist, nur in die Konsole ausgeben
        }
    }


    // Funktion zur Analyse von Bilddaten und zur Durchführung von Barcode-Scans
    function analyzeImageData(imageData) {
        alert("Starte Barcode-Erkennung...");  // Zeigt an, dass die Bilddaten für den Barcode analysiert werden
        updateDebugInfo("Analyse der Bilddaten gestartet...");

        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert"
        });

        if (code) {
            updateDebugInfo("Barcode erkannt: " + code.data);
            alert("Barcode erkannt: " + code.data);  // Zeigt den erkannten Barcode an
            getProductInfo(code.data);  // Ruft Produktinformationen ab
        } else {
            updateDebugInfo("Kein Barcode erkannt.");
        }
    }
});
