const GEOCODING_API_KEY = 'eb55ab8c8f644094b5e8b4648760cbe8';  // Geocoding API-Key (z.B. von OpenCage)
const API_URL = 'http://localhost:3000/weather';  // Backend-Server URL
const WEATHER_API_KEY = '0d575b7df5f78777c421b5ce7afbf1fe';  // Dein OpenWeatherMap API-Key

// Funktion, um die Koordinaten der Stadt abzurufen
function getCityCoordinates(city) {
    console.log(`Koordinaten werden für Stadt gesucht: ${city}`);

    return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${GEOCODING_API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Fehler bei der Geokodierungs-Anfrage: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length === 0) {
                throw new Error('Keine Ergebnisse für die Stadt gefunden.');
            }

            const { lat, lng } = data.results[0].geometry;
            console.log(`Koordinaten für ${city}: ${lat}, ${lng}`);
            return { lat, lng };
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der Stadtkoordinaten:", error);
            alert("Es gab ein Problem beim Abrufen der Stadtkoordinaten.");
        });
}

// Funktion, um das Wetter abzurufen
function getWeatherData(city) {
    console.log(`API-Abfrage wird gesendet für Stadt: ${city}`);

    getCityCoordinates(city)
        .then(coordinates => {
            if (!coordinates) return;

            const { lat, lng } = coordinates;
            const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&lang=de`;  // URL mit deutschem Sprachparameter
            console.log('Weather API URL:', weatherAPIUrl);

            return fetch(weatherAPIUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',  // Header für JSON-Antwort
                }
            });
        })
        .then(response => {
            if (!response.ok) {
                console.error(`API-Fehler: ${response.status} - ${response.statusText}`);
                throw new Error(`Fehler bei der API-Anfrage: ${response.status} - ${response.statusText}`);
            }
            return response.json();  // JSON-Antwort parsen
        })
        .then(data => {
            console.log("Wetterdaten:", data);
            updateWeatherInfo(data);  // Wetterdaten anzeigen
        })
        .catch(error => {
            console.error("Fehler beim Abrufen der Wetterdaten:", error);
            alert("Es gab ein Problem beim Abrufen der Wetterdaten.");
        });
}

// Funktion, um die Wetterdaten darzustellen
function updateWeatherInfo(data) {
    if (!data || !data.list || data.list.length === 0) {
        console.error("Fehler: Keine Wetterdaten gefunden.");
        return;
    }

    const today = new Date();  // Aktuelles Datum

    // Die nächsten 7 Tage anzeigen
    for (let i = 0; i < 5; i++) {
        const dailyWeather = getDailyWeather(data, i);  // Wetterdaten für den i-ten Tag holen

        // Datum formatieren
        const dayDate = new Date(today);
        dayDate.setDate(today.getDate() + i);
        const formattedDate = dayDate.toLocaleDateString('de-DE', {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const dayElement = document.getElementById(`day-${i + 1}`);
        dayElement.innerHTML = `
            <h3>${formattedDate}</h3>
            <div id="daytime1">
                <div id="mor">
                    <div id="daytime">Morgens:</div>
                    <div id="daytime5">
                        <div id="temp">${dailyWeather.morning.temp}°C</div>
                        <div id="weather">
                        ${dailyWeather.morning.weather}
                        <img src="https://openweathermap.org/img/wn/${dailyWeather.morning.icon}@2x.png" alt="Wetter-Icon">
                        </div>
                    </div>
                </div>
                <div id="mit">
                    <div id="daytime">Mittags:</div>
                    <div id="daytime5">
                        <div id="temp">${dailyWeather.afternoon.temp}°C</div>
                        <div id="weather">
                        ${dailyWeather.afternoon.weather}
                        <img src="https://openweathermap.org/img/wn/${dailyWeather.afternoon.icon}@2x.png" alt="Wetter-Icon">
                        </div>
                    </div>
                </div>
                <div id="ab">
                    <div id="daytime">Abends:</div>
                    <div id="daytime5">
                        <div id="temp">${dailyWeather.evening.temp}°C</div>
                        <div id="weather">
                        ${dailyWeather.evening.weather}
                        <img src="https://openweathermap.org/img/wn/${dailyWeather.evening.icon}@2x.png" alt="Wetter-Icon">
                        </div>
                    </div>
                </div>
            </div>
        `;
        
    }
}

// Funktion, um die Wetterdaten für einen bestimmten Tag zu extrahieren
function getDailyWeather(data, dayIndex) {
    const hourlyData = data.list;

    const morningData = hourlyData[dayIndex * 8];  // Morgendaten (ca. 6 Uhr)
    const afternoonData = hourlyData[dayIndex * 8 + 4];  // Mittagsdaten (ca. 12 Uhr)
    const eveningData = hourlyData[dayIndex * 8 + 7];  // Abendsdaten (ca. 18 Uhr)

    // Fehlerfall: Keine Daten vorhanden
    if (!morningData || !afternoonData || !eveningData) {
        console.error("Keine Daten für diesen Tag.");
        return {
            morning: { temp: "Keine Daten", weather: "Unbekannt", icon: "" },
            afternoon: { temp: "Keine Daten", weather: "Unbekannt", icon: "" },
            evening: { temp: "Keine Daten", weather: "Unbekannt", icon: "" },
            warning: 'Keine besonderen Warnungen.'
        };
    }

    // Hilfsfunktion: Umwandlung von Kelvin in Celsius
    const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);

    // Wetterdaten für Morgens, Mittags und Abends zurückgeben (inkl. Icons)
    return {
        morning: {
            temp: kelvinToCelsius(morningData.main.temp),
            weather: morningData.weather[0].description,
            icon: morningData.weather[0].icon  // Icon-Code hinzufügen
        },
        afternoon: {
            temp: kelvinToCelsius(afternoonData.main.temp),
            weather: afternoonData.weather[0].description,
            icon: afternoonData.weather[0].icon
        },
        evening: {
            temp: kelvinToCelsius(eveningData.main.temp),
            weather: eveningData.weather[0].description,
            icon: eveningData.weather[0].icon
        },
        warning: 'Keine besonderen Warnungen.'
    };
}

// Funktion, die von der Eingabefunktion (cityset) aufgerufen wird
function cityset() {
    cityInput = document.getElementById('cityInput').value;
    let cityName = document.getElementById('cityName');
    cityName.innerHTML = "Wetter für: " + cityInput;
    getWeatherData(cityInput);  // Wetterdaten abrufen
}