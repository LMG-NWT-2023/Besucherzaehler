# GPIO Eins Beispiel

Einfaches Beispiel, um mit node.js die GPIO-Pins auf dem Raspberry Pi zu programmieren. 

Um alle node Module local zu installieren, führe folgenden Befehl aus:

```
npm install
```

Die Anleitung, wie das Betriebssystem für den Raspberry Pi aufgesetzt findet sich in einer eigenen: [Anleitung](setup.md)

## Installation ESLint

Damit wir beim Programmieren gleich auf Fehler in Javascript hingewiesen werden, installierten wir ESLint.
Wenn man in VS Code die Probleme direkt sehen möchte braucht man die Extension ESLint.

## GPIO Belegung
Wir haben zwei Abstandssensoren vom Typ: 
EAN: 4016138969504
Bestell-Nr.: 1318255 - 62

[Sensor bei Conrad](https://www.conrad.de/de/p/joy-it-infrarot-abstandssensor-raspberry-pi-erweiterungs-platine-passend-fuer-einplatinen-computer-arduino-banana-pi-1318255.html?searchType=SearchRedirect)

[Datenblatt](https://asset.conrad.com/media10/add/160267/c1/-/en/001318255DS01/datenblatt-1318255-joy-it-infrarot-abstandssensor-raspberry-pi-erweiterungs-platine-passend-fuer-einplatinen-computer-arduino-banana-pi.pdf)

```
Belegung Sensorpaar 1: 
Sensor links:
Boardnummer:
Vcc:    4 (Stromversorgung)
GND:    9 (Ground)
Vo:     11 (GPIO 17)

Sensor rechts
Boardnummer:
Vcc:    2 (Stromversorgung)
GND:    20 (Ground)
Vo:     22 (GPIO 25)
```
```
Belegung Sensorpaar 2: 
Sensor links:
Boardnummer:
Vcc:    4 (Stromversorgung) (rot)
GND:    9 (Ground)(schwarz)
Vo:     11 (GPIO 17)(gelb)

Sensor rechts
Boardnummer:
Vcc:    2 (Stromversorgung)(rot)
GND:    20 (Ground)(baun)
Vo:     22 (GPIO 25)(orange)
```