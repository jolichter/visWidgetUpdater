// ioBroker visWidgetUpdater.js
// V 24.12.003

const widgetData = {
    'w000501': {
        url: 'http://192.168.1.41:80/tmpfs/auto.jpg?usr=ioBroker&pwd=ioBroker', // Widget 1, Webcam 1
        interval: 2000 // Aktualisierungszeit in Millisekunden
    },
    'w000502': {
        url: 'http://192.168.2.41:80/tmpfs/auto.jpg?usr=ioBroker&pwd=ioBroker', // Widget 2, gleiche Webcam 1
        interval: 1000 // Aktualisierungszeit in Millisekunden
    },
    'w000503': {
        url: 'http://192.168.1.42:80/tmpfs/auto.jpg?usr=ioBroker&pwd=ioBroker', // Widget 3, Webcam 2
        interval: 2000 // Aktualisierungszeit in Millisekunden
    },
    'w000504': {
        url: 'http://192.168.1.42:80/tmpfs/auto.jpg?usr=ioBroker&pwd=ioBroker', // Widget 4, gleiche Webcam 2
        interval: 1000 // Aktualisierungszeit in Millisekunden
    },
    'w000505': {
        url:  'http://192.168.1.43:80/tmpfs/auto.jpg?usr=ioBroker&pwd=ioBroker', // Widget 5, Webcam 3
        interval: 2000 // Aktualisierungszeit in Millisekunden
    },
    'w000506': {
        url: 'https://morgenwirdes.de/api/v3/gif6.php?plz=56068', // Widget 6, Regenradar
        interval: 600000 // Aktualisierungszeit in Millisekunden
    }
};

const loggingEnabled = false; // Setze auf true, um das Logging in der Konsole (F12) zu aktivieren

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
        return; // Abbruch, wenn das Widget nicht im DOM ist
    }
const loggingEnabled = false; // Setze auf true, um das Logging in der Konsole (F12) zu aktivieren

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
        return; // Abbruch, wenn das Widget nicht im DOM ist
    }

    const img = widget.querySelector('img');
    if (!img) {
        logMessage(`Kein <img> Element in Widget "${widgetId}" gefunden.`, 'error');
        return; // Abbruch, wenn kein <img> im Widget existiert
    }

    const { url } = widgetData[widgetId];
    const newImg = new Image(); // Unsichtbares Bild zum Vorladen
    const separator = url.includes('?') ? '&' : '?'; // Prüfe, ob die URL bereits Query-Parameter enthält
    const timestamp = new Date().getTime(); // Zeitstempel zur Cache-Vermeidung

    // Vorladen des neuen Bildes
    newImg.src = `${url}${separator}t=${timestamp}`;

    newImg.onload = () => {
        logMessage(`Bild für Widget "${widgetId}" erfolgreich geladen.`, 'info');
        img.src = newImg.src; // Wechsle erst nach vollständigem Laden
    };

    newImg.onerror = () => {
        logMessage(`Bild für Widget "${widgetId}" konnte nicht geladen werden.`, 'error');
    };
}

// Starte einen eigenen Timer für jedes Widget
Object.keys(widgetData).forEach(widgetId => {
    const { interval } = widgetData[widgetId];
    logMessage(`Starte Update-Timer für Widget "${widgetId}" mit Intervall ${interval}ms.`, 'info');
    setInterval(() => updateWidget(widgetId), interval); // Eigenes Intervall pro Widget
});
