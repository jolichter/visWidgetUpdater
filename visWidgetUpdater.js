// ioBroker visWidgetUpdater.js
// V 25.01.005

const widgetData = {
    'w000501': {
        url: 'http://192.168.1.41:80/tmpfs/auto.jpg?usr=USER&pwd=PASSWORT', // Widget 1, Webcam 1
        interval: 2000 // Aktualisierungszeit in Millisekunden
    },
    'w000502': {
        url: 'http://192.168.2.41:80/tmpfs/auto.jpg?usr=USER&pwd=PASSWORT', // Widget 2, gleiche Webcam 1
        interval: 1000 // Aktualisierungszeit in Millisekunden
    },
    'w000503': {
        url: 'http://192.168.1.42:80/tmpfs/auto.jpg?usr=USER&pwd=PASSWORT', // Widget 3, Webcam 2
        interval: 2000 // Aktualisierungszeit in Millisekunden
    },
    'w000504': {
        url: 'http://192.168.1.42:80/tmpfs/auto.jpg?usr=USER&pwd=PASSWORT', // Widget 4, gleiche Webcam 2
        interval: 1000 // Aktualisierungszeit in Millisekunden
    },
    'w000505': {
        url:  'http://192.168.1.43:80/tmpfs/auto.jpg?usr=USER&pwd=PASSWORT', // Widget 5, Webcam 3
        interval: 2000 // Aktualisierungszeit in Millisekunden
    },
    'w000506': {
        url: 'https://morgenwirdes.de/api/v3/gif6.php?plz=56068', // Widget 6, Regenradar
        interval: 600000 // Aktualisierungszeit in Millisekunden
    }
};

const loggingEnabled = true;  // Logging aktivieren/deaktivieren
const intervalIds = {};  // Zur Verwaltung der Intervalle

// Funktion zum Schreiben von Logs (abhängig von loggingEnabled)
function logMessage(message, level = 'info') {
    if (loggingEnabled) {
        console.log(`[${level.toUpperCase()}] ${message}`);
    }
}

// Funktion zur Aktualisierung eines Widgets
function updateWidget(widgetId) {
    const widget = document.getElementById(widgetId);
    if (!widget) {
        logMessage(`Widget mit ID "${widgetId}" ist momentan nicht im DOM.`, 'warn');
        return;
    }

    const img = widget.querySelector('img');
    if (!img) {
        logMessage(`Kein <img> Element in Widget "${widgetId}" gefunden.`, 'error');
        return;
    }

    const { url } = widgetData[widgetId];
    const newImg = new Image();
    const separator = url.includes('?') ? '&' : '?';
    const timestamp = new Date().getTime();

    // Bild wird erst geladen, wenn onload und onerror definiert sind
    newImg.onload = () => {
        logMessage(`Bild für Widget "${widgetId}" erfolgreich geladen.`, 'info');
        img.src = newImg.src;
    };

    newImg.onerror = (e) => {
        logMessage(`Bild für Widget "${widgetId}" konnte nicht geladen werden. URL: ${newImg.src} Fehler: ${e.type}`, 'error');
    };

    newImg.src = `${url}${separator}t=${timestamp}`;
}

// Starte einen eigenen Timer für jedes Widget, doppelte Intervalle verhindern
Object.keys(widgetData).forEach(widgetId => {
    const { interval } = widgetData[widgetId];

    // Vorherigen Timer stoppen, falls vorhanden
    if (intervalIds[widgetId]) {
        clearInterval(intervalIds[widgetId]);
    }

    logMessage(`Starte Update-Timer für Widget "${widgetId}" mit Intervall ${interval}ms.`, 'info');
    intervalIds[widgetId] = setInterval(() => updateWidget(widgetId), interval);
});
