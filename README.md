# ioBroker - visWidgetUpdater
### VIS-2 Bug Workaround: Automatische Aktualisierung von `<img>`-Elementen in Widgets

Die aktuelle stabile Version von ioBroker VIS-2 (`v2.9.64`, Stand **November 2024**) enthält einen Bug, der die automatische Aktualisierung von `<img>`-Elementen in Widgets beeinträchtigt. Dies betrifft insbesondere Bildquellen wie Webcams oder dynamische URLs.

Details zum Bug sind unter folgendem Link verfügbar:
👉 [Bug #485 auf GitHub](https://github.com/ioBroker/ioBroker.vis-2/issues/485)

## **Workaround-Beschreibung**

### **Änderungen und Neuerungen:**
1. **Keine URL im Code erforderlich:**
   - Ab der Version 25.01.006 wird die URL nicht mehr im `widgetData`-Objekt hinterlegt.
   - Stattdessen wird die URL dynamisch direkt aus dem `<img>`-Element des Widgets ausgelesen.
   - Dies erleichtert die Pflege und sorgt dafür, dass Änderungen an der URL direkt im Widget vorgenommen werden können, ohne den Code anzupassen.

2. **Dynamische Zeitstempel-Bereinigung:**
   - Das Script entfernt automatisch alte Zeitstempel aus der URL, bevor es einen neuen Zeitstempel hinzufügt. Dadurch werden Probleme mit mehrfach angehängten Parametern vermieden.

3. **Konfigurierbare Widgets:**
   - Widgets werden weiterhin über ihre `id` und `interval` (Aktualisierungsintervall) konfiguriert.
   - Zusätzlich können Widgets über das `active`-Flag aktiviert oder deaktiviert werden.

### **Installation**

#### 1. "Show attributes" aktivieren
- Aktiviere in VIS-2 oben rechts die Option **"Show attributes"**, um die Tabs **SEITE**, **WIDGET**, **CSS** und **SCRIPTE** sichtbar zu machen.

#### 2. Code einfügen
- Wechsle in den Tab **SCRIPTE**.
- Füge den Code ein.

#### 3. Updatezeit deaktivieren
- Setze die **Updatezeit** des Widgets auf **0 (deaktiviert)**, da die Aktualisierung über dieses Script erfolgt.

#### 4. Anpassungen am Code
- **Widget-IDs:** Passe die Einträge im `widgetData`-Array an, um die IDs deiner Widgets und die gewünschten Aktualisierungsintervalle festzulegen.
- **Log-Ausgabe:** Setze `loggingEnabled` auf `true`, um Debugging-Informationen in der Konsole anzuzeigen (`F12` → Tab "Konsole").
- **Aktivierung einzelner Widgets:** Über das Feld `active` kannst du Widgets bei Bedarf aktivieren oder deaktivieren.

---

### **Hinweise**
- **Keine URL mehr im Code nötig:** Die URL wird direkt aus dem Widget-Element in VIS gelesen. Änderungen an der Bildquelle können daher direkt im Widget vorgenommen werden.
- **Kompatibilität:** Das Script wurde mit der stabilen Version von VIS-2 getestet (v2.9.64).
- **Fehlerbehebung:** Sollten Widgets nicht sichtbar sein oder deaktiviert sein, überprüfe die Log-Ausgaben in der Konsole.

---

### **Beispielhafte Konfiguration**
```javascript
const widgetData = [
    { id: 'w000556', interval: 4000, active: true },  // Widget-Fenster1 webCam1
    { id: 'w000727', interval: 2000, active: true },  // Widget-Fenster2 webCam2
    { id: 'w000795', interval: 600000, active: true } // Widget-Fenster1 Regenradar
];
```
PrintScreen VIS2:
![demo_VIS2-BasicImage_Webcam](https://github.com/user-attachments/assets/83889a7c-05c9-476d-ba53-dcee450d1113)
