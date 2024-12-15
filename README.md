# ioBroker - visWidgetUpdater
### VIS-2 Bug Workaround: Automatische Aktualisierung von `<img>`-Elementen in Widgets

Die aktuelle stabile Version von ioBroker VIS-2 (`v2.9.64`, Stand **November 2024**) enthält einen Bug, der die automatische Aktualisierung von `<img>`-Elementen in Widgets beeinträchtigt. Dies betrifft insbesondere Bildquellen wie Webcams oder dynamische URLs.

Details zum Bug sind unter folgendem Link verfügbar:
👉 [Bug #485 auf GitHub](https://github.com/ioBroker/ioBroker.vis-2/issues/485)

## **Workaround-Beschreibung**

Dieser Workaround aktualisiert `<img>`-Elemente in Widgets mithilfe eines Scripts im **SCRIPTE-Tab** der Widgets in VIS-2. Er verwendet DOM-Manipulation, um die Bilder regelmäßig neu zu laden.

## **Installation**

### 1. "Show attributes" aktivieren (ist bei mir srandartmäßig an)
- Aktiviere in VIS-2 oben rechts die Option **"Show attributes"**, um die Tabs **SEITE**, **WIDGET**, **CSS** und **SCRIPTE** sichtbar zu machen.

### 2. Code einfügen
- Wechsle in den Tab **SCRIPTE**.
- Füge den JS Code ein.

### 3. Updatezeit deaktivieren
- Setze die **Updatezeit** des Widgets auf **0 (deaktiviert)**, da die Aktualisierung über dieses Script erfolgt.

### 4. Anpassungen am Code
- **Widget-IDs und URLs:** Passe die Einträge im `widgetData`-Objekt an deine Widgets und Bildquellen an.
- **Log-Ausgabe:** Setze `loggingEnabled` auf `true`, um Debugging-Informationen in der Konsole anzuzeigen (`F12` → Tab "Konsole").
