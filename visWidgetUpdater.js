// ioBroker visWidgetUpdater.js
// V 25.01.006

const loggingEnabled = false; // Setze auf true, um Logs zu deaktivieren

// Konfiguration für Widgets: ID, Intervall und Aktivierungsstatus
const widgetData = [
    { id: 'w000501', interval: 2000, active: true }, // Widget-VIS2-Fenster1 webCam1
    { id: 'w000502', interval: 2000, active: true }, // Widget-VIS2-Fenster1 webCam2
    { id: 'w000503', interval: 1000, active: true }, // Widget-VIS2-Fenster1 webCam3
    { id: 'w000701', interval: 2000, active: true }, // Widget-VIS2-Fenster2 webCam2
    { id: 'w000702', interval: 2000, active: true }, // Widget-VIS2-Fenster2 webCam1
    { id: 'w000101', interval: 6000000, active: true } // Widget-VIS2-Fenster2 Regenradar
];

// Funktion zum Schreiben von Logs
function logMessage(message, level = 'info') {
    if (loggingEnabled) {
        console.log(`[${level.toUpperCase()}] ${message}`);
    }
}

// Funktion zur Aktualisierung eines Widgets
function updateWidget(widget) {
    const widgetId = widget.id;
    const widgetElement = document.getElementById(widgetId);
    if (!widgetElement) {
        logMessage(`Widget mit ID "${widgetId}" ist nicht im DOM.`, 'warn');
        return;
    }

    const img = widgetElement.querySelector('img');
    if (!img) {
        logMessage(`Kein <img> Element in Widget "${widgetId}" gefunden.`, 'error');
        return;
    }

    // URL aus src lesen und Zeitstempel entfernen
    let url = img.getAttribute('src');
    if (!url) {
        logMessage(`Keine URL in <img> für Widget "${widgetId}" gefunden.`, 'error');
        return;
    }

    // Entferne alte Zeitstempel
    url = url.replace(/([?&])t=\d+/g, ''); // Entferne alte Zeitstempel
    url = url.replace(/([?&])t=\d+/g, ''); // Zusätzliche Sicherheitsschleife

    // Zusätzlicher Check auf ungültige URLs
    if (!url || url.includes('undefined') || url.includes('null')) {
        logMessage(`Ungültige URL nach Bereinigung für Widget "${widgetId}".`, 'error');
        return;
    }

    logMessage(`Bereinigte URL für Widget "${widgetId}": ${url}`, 'debug');

    const timestamp = new Date().getTime();
    const separator = url.includes('?') ? '&' : '?';
    const newUrl = `${url}${separator}t=${timestamp}`;

    // Bild aktualisieren mit Fehlerüberwachung
    img.onerror = () => {
        logMessage(`Bild für Widget "${widgetId}" konnte nicht geladen werden. URL: ${newUrl}`, 'error');
    };

    img.onload = () => {
        logMessage(`Bild für Widget "${widgetId}" erfolgreich aktualisiert: ${newUrl}`, 'info');
    };

    img.src = newUrl;
}

// Starte eigene Timer für jedes Widget, wenn aktiv
widgetData.forEach(widget => {
    if (widget.active) {
        logMessage(`Starte Update-Timer für Widget "${widget.id}" mit Intervall ${widget.interval}ms.`, 'info');
        setInterval(() => updateWidget(widget), widget.interval);
    } else {
        logMessage(`Widget "${widget.id}" ist deaktiviert. Kein Timer gestartet.`, 'info');
    }
});
