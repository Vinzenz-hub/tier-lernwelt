# 🐾 Tier-Lernwelt

Eine bunte, kinderfreundliche Lernwebsite über Tiere und ihre Lebensräume. Die Seite ist mit **HTML, CSS und Vanilla JavaScript** umgesetzt und benötigt kein Backend oder externe Abhängigkeiten.

## Funktionen

- Responsive Hero-Bereich mit organischen Formen und schwebenden Tiermotiven
- Neun Tierkarten mit Emoji, kindgerechtem Infotext und Lebensraum
- Live-Suche nach Tier, Lebensraum oder Beschreibung
- Interaktives Multiple-Choice-Quiz mit direktem Feedback, Fortschrittsanzeige und Auswertung
- Semantisches HTML, sichtbare Fokuszustände und Rücksicht auf reduzierte Bewegung

## Lokal starten

Einfach `index.html` in einem modernen Browser öffnen. Für die Entwicklung mit einem lokalen Server genügt zum Beispiel:

```bash
python3 -m http.server
```

Danach im Browser `http://localhost:8000` öffnen.

## GitHub Pages veröffentlichen

Das Repository ist für GitHub Pages vorbereitet: `index.html` liegt im Projektstamm und lädt nur die lokalen Dateien `style.css` und `script.js`.

1. Repository auf GitHub öffnen.
2. Unter **Settings → Pages** als Quelle **Deploy from a branch** wählen.
3. Den Branch `main` und den Ordner `/ (root)` auswählen.
4. Speichern und die angezeigte Pages-Adresse öffnen.

Die bestehenden Dateien `Index.html` und `Style.css` wurden nicht entfernt. GitHub Pages verwendet die neue, kleingeschriebene `index.html` als Einstiegspunkt.
