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
Belegung: 
Sensor links:
Boardnummer:
Vcc:    4 (Stromversorgung)
Vo:     11 (GPIO 17)
GND:    9 (Ground)

Sensor rechts
Boardnummer:
Vcc:    2 (Stromversorgung)
GND:    20 (Ground)
Vo:     22 (GPIO 25)
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
````

Jetzt können wir den Test im Terminal ausführen: 

```
npx mocha
```
 