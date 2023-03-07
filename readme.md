# Besucherzähler
## Projekt

Das Ziel des NWT-Projektes Besucherzähler ist es, der Bibliothekarin das manuelle Zählen  der Besucher zu vereinfachen. Dafür nutzen wir einen Raspberry Pi, an dem zwei Abstandssensoren angeschlossen sind. Mit den beinden Sensoren lässt sich bestimmen, ob ein Besucher ein- oder austritt. Über eine Website, die auf dem Raspberry Pi läuft, kann die Bibliothekarin auf die Daten zugreifen. Dafür müssen beide Computer jedoch im gleichen Netzwerk sein.


## Source Code

Der komplette Source Code liegt in diesem Repository auf GitHub. Wir benutzen JavaScript auf [NodeJS](https://nodejs.org/).

Wenn man die neuste Version von GitHub zieht, muss man folgenden Befehl ausführen, um alle node Module local zu installieren:


```
npm install
```

Wenn man den Server auf einem Computer ohne GPIO-Anschlüsse laufen lässt, werden zufällige Werte angezeigt.

Der Server wird gestartet mit:

``` 
npm start
```

Die Anleitung, wie das Betriebssystem für den Raspberry Pi aufgesetzt findet sich in einer eigenen: [Anleitung](setup.md)

## Installation ESLint

Damit wir beim Programmieren gleich auf Fehler in Javascript hingewiesen werden, installierten wir ESLint.
Wenn man in VS Code die Probleme direkt sehen möchte braucht man die Extension ESLint.

## GPIO Belegung
[gpio Belegung](https://de.pinout.xyz)

Wir haben zwei Abstandssensoren vom Typ: 
EAN: 4016138969504
Bestell-Nr.: 1318255 - 62

[Sensor bei Conrad](https://www.conrad.de/de/p/joy-it-infrarot-abstandssensor-raspberry-pi-erweiterungs-platine-passend-fuer-einplatinen-computer-arduino-banana-pi-1318255.html?searchType=SearchRedirect)

[Datenblatt](https://asset.conrad.com/media10/add/160267/c1/-/en/001318255DS01/datenblatt-1318255-joy-it-infrarot-abstandssensor-raspberry-pi-erweiterungs-platine-passend-fuer-einplatinen-computer-arduino-banana-pi.pdf)

```
Belegung Sensorpaar 1: 
Sensor links:
Boardnummer:
Vcc:    4 (Stromversorgung) (rot)
GND:    9 (Ground) (braun)
Vo:     11 (GPIO 17) (orange)

Sensor rechts
Boardnummer:
Vcc:    2 (Stromversorgung) (rot)
GND:    20 (Ground) (braun)
Vo:     22 (GPIO 25) (orange)
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



## Unit Tests hinzufügen

### Test-Modul `mocha` installieren

```
npm install mocha --save-dev
```

Das installiert das Modul und schreibt die Abhängigkeit in die Datei `package.json` - in den Bereich `"devDependencies"`. Das bedeutet, dieses Modul ist nur zur Entwicklungszeit relevant. 

### Ersten Unit-Test erstellen

Dazu legen wir das Verzeichnis `test` an und erstellen dort die Datei `SendorStateMachineTest.js`: 

```
const assert = require('assert')
const {States, StateMachine} = require('../SensorStateMachine')

describe('SendorStateMachine', function () {
  describe('initialize', function () {
    it('should start with initial State S0', () => {
      const stateMachine = new StateMachine()
      assert.equal(stateMachine.state, States.S0)
    })
  })
}) 
``` 

Jetzt können wir den Test im Terminal ausführen: 

```
npx mocha
```
 
## Git cheatsheet

Wenn in einem localen Verzeichnis des Git Reposetories eine Datei verändert wurde, kann man kein `git pull` machen, da sonst die Änderung überschrieben werden würde. Es gibt drei Möglichkeiten:

* die geänderte Datei in einen Commit packen
* die Änderung stashen (die Änderung auf einen Stapel legen)
* die Änderung verwerfen ( discard changes, auf dem Raspberry Pi: `git checkout routes/index.js`)

Auf dem Raspi Dateien verschiben:
`mv gpio-eins gpio-eins.bak`

Danach eine neue Datei clonen:
`git clone URL aus Github`

## html

Hilfreiche Seiten:

[selfhtml](https://wiki.selfhtml.org/wiki/SELFHTML)

[W3schools](https://www.w3schools.com/)