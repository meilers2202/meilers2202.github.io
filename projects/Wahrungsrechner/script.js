async function calculate() {
    const fromCurrency = document.getElementById('currency').value;
    const toCurrency = document.getElementById('currency2').value;
    const amount = parseFloat(document.getElementById("amount").value);
    const taxRate = parseFloat(document.getElementById('currency3').value) || 0;  // Steuer aus currency3 (standardmäßig 0%)

    // Validierung des Betrags
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('output').textContent = "Bitte einen gültigen Betrag eingeben.";
        return;
    }

    // URL der API für Wechselkurse
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        // Abrufen der Wechselkurse von der API
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("API konnte nicht erreicht werden.");
        
        const data = await response.json();
        
        // Prüfen, ob der Zielwechselkurs verfügbar ist
        if (data.rates[toCurrency]) {
            const exchangeRate = data.rates[toCurrency];
            const convertedAmount = amount * exchangeRate;

            // Berechnung der Wechselsteuer
            const taxAmount = (convertedAmount * taxRate) / 100;
            const totalAmount = convertedAmount - taxAmount;  // Steuer wird zum umgerechneten Betrag hinzugefügt

            // Ergebnis anzeigen
            document.getElementById('output').textContent = 
                `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency} (Wechselsteuer: ${taxAmount.toFixed(2)} ${toCurrency}, Gesamt: ${totalAmount.toFixed(2)} ${toCurrency})`;
        } else {
            // Sonderfall: Indirekte Umrechnung (z. B. über EUR für XOF/XAF)
            const euroRate = data.rates['EUR'];
            if (!euroRate) throw new Error("Zwischenwechselkurs zu EUR nicht verfügbar.");

            // Zwischenwert in EUR berechnen
            const intermediateAmount = amount * euroRate;

            // Zweiter API-Aufruf für EUR-basierte Währungen
            const secondApiUrl = `https://api.exchangerate-api.com/v4/latest/EUR`;
            const secondResponse = await fetch(secondApiUrl);
            if (!secondResponse.ok) throw new Error("API für EUR-Umrechnung konnte nicht erreicht werden.");
            
            const secondData = await secondResponse.json();
            const finalRate = secondData.rates[toCurrency];

            if (finalRate) {
                const finalAmount = intermediateAmount * finalRate;

                // Berechnung der Wechselsteuer
                const taxAmount = (finalAmount * taxRate) / 100;
                const totalAmount = finalAmount - taxAmount;  // Steuer wird zum umgerechneten Betrag hinzugefügt

                // Ergebnis anzeigen
                document.getElementById('output').textContent = 
                    `${amount} ${fromCurrency} = ${finalAmount.toFixed(2)} ${toCurrency} (Wechselsteuer: ${taxAmount.toFixed(2)} ${toCurrency}, Gesamt: ${totalAmount.toFixed(2)} ${toCurrency})`;
            } else {
                throw new Error(`Umrechnung von EUR zu ${toCurrency} nicht verfügbar.`);
            }
        }
    } catch (error) {
        // Fehleranzeige für den Benutzer
        document.getElementById('output').textContent = `Fehler: ${error.message}`;
    }
}

const texts = {
    de: {
        headline: "Willkommen auf meiner Website!",
        from: "Von",
        to: "Zu",
        tax: "Steuer",
        amount: "Betrag",
        calcbtn: "Berechnen",
        USD: "USD-Dollar",
    },
    en: {
        headline: "Welcome to my website!",
        from: "From",
        to: "to",
        tax: "Tax",
        amount: "Amount",
        calcbtn: "Calculate",
        USD: "USD-Dollar",
    },
    fr: {
        headline: "Bienvenue sur mon site web!",
        from: "De",
        to: "à",
        tax: "Taxe",
        amount: "Montant",
        calcbtn: "Calculer",
        USD: "Dollars US",
    }
};

function changeLanguage() {
    const lang = document.getElementById("languageSwitcher").value;
    document.getElementById("headline").textContent = texts[lang].headline;
    document.getElementById("from").textContent = texts[lang].from;
    document.getElementById("to").textContent = texts[lang].to;
    document.getElementById("tax").textContent = texts[lang].tax;
    document.getElementById("amount").textContent = texts[lang].amount;
    document.getElementById("calcbtn").textContent = texts[lang].calcbtn;
}