![LMG Logo](./public/images/lmg.png)
# Dokumentation

## Einleitung

Dieses Dokumentation beschreibt den Werdegang unseres Projektes "Einen Besucherzähler bauen", welches wir im Zuge unseres NWT Unterrichts in der Schule und Zuhause vom 29.11.2022 bis am 22.3.2023 bearbeitet haben. Das Projekt wurde von der Bibliothekarin Frau Ehrler in Auftrag gegeben. Das Ziel war es einen Besucherzähler für die Bücherei zu bauen, der dort die Besucher zählen kann.
Es werden Erläuterungen zur Funktionsweise sowie Skizzen und Fotos von verschiedenen Bereichen der Arbeitsphase zur Veranschaulichung und Erklärung unseres Projektes dargestellt.
Ziel dieser Dokumentation ist es, den allgemeinen Prozess des Projektes, von Start- und Planungsphase bis zu Installation und Fazit unseres Projektes aufzuzeigen und zu verdeutlichen

## Start- und Planungsphase: 

Um die Personen zu erfassen, welche die Bibliothek besuchen, entschieden wir uns für zwei Infrarotsensoren. Somit brauchen wir keinen Reflektor auf der anderen Seite. Zum Auslesen dieser Daten benutzen wir einen Raspberry Pi. Am Anfang wussten wir noch nicht, wie Frau Ehrler die Daten bekommen und lesen soll. Unser Ziel war es jedoch die Daten des Besucherzählers auf einer Webseite darzustellen, damit die Besucherzahl über Computer, Handy oder Tablet erreichbar ist. Vorteilhaft an dieser Lösung ist, dass der Raspberry Pi keinen eigenen Display braucht.
Zu Beginn überlegten wir, ob wir einen schon fertigen Besucherzähler im Internet kaufen wollen und uns nur auf die Benutzeroberfläche konzentrieren, oder den Besucherzähler und die Website selber programmieren. Wir entschieden uns dafür, einen kompletten Besucherzähler zu bauen.
Nach dem Kick-Off Gespräch am 7.12.2022 schickten wir Frau Ehrler unser Projektangebot, welchem sie zustimmte. Dieses Angebot lässt sich in folgenden Muss-, Soll- und Kann-Zielen definieren.

Muss-Ziel: 
* Einen Besucherzähler programmieren und in der Bücherei installieren. Die von dem Besucherzähler erfassten Messdaten leicht abrufbar machen

Soll-Ziel: 
* Eine freundliche Benutzeroberfläche zu designen und eine handliche und schöne Hardware zu entwerfen. 

Kann-Ziel: 
* Die Messwerte möglichst auf allen Geräten in der Bücherei abrufbar machen.


## Funktionsweise

Auf dem Raspberry Pi läuft das Betriebssystem [Raspberry Pi OS Lite](https://www.raspberrypi.com/documentation/computers/getting-started.html#installing-the-operating-system), welches keine grafische Oberfläche beinhaltet. Diese wird auch nicht benötigt, weil die Entwicklung über das Netzwerk z.B. von Windows oder macOS aus erfolgt.

Als Programmiersprache nutzen wir für den Besucherzähler JavaSkript und die Webseite HTML, CSS und JavaScript. Den gesamten Source Code inclusive Dokumentation haben wir auf Git Hub abgelegt. Dadurch können wir einfach den neusten Stand untereinander austauschen.

Anfangs schrieben wir ein sehr einfaches Programm, das die Sensordaten auswertete und in die Konsole schrieb. Damit wir wissen ob eine Person die Bücherei betritt oder verlässt, benutzen wir zwei Sensoren. Je nach dem welcher Sensor als erstes aktiviert wird, wissen wir ob eine Person ein- oder austritt.
Dieses Program funktionierte ziemlich gut für langsames Ein- und Austreten, jedoch fielen uns immer mehr Sonderfälle ein, mit denen unser Programm nicht umgehen konnte. Was passiert zum Beispiel, wenn eine Person den ersten Sensor aktiviert, dann aber umdreht und wieder zurückgeht? Oder was passiert, wenn aus irgendeinem Grund beide Sensoren gleichzeitig aktiviert werden?
Nach einiger Recherche haben wir uns für eine Statemachine entschieden, um mit den Sensorzuständen besser umzugehen.

In der Datei "SensorStateMachine.js" erkennt man gut die einzelnen Zustände. Hier werden die Sensordaten ausgewertet und so die Besucher gezählt. Mit einem Test, der die verschiedenen Besuchereintritte simuliert, können wir bei Veränderungen einfach sehen, ob noch alles funktioniert.

Jedes mal wenn sich die Besucherzahl ändert, wird der alte Wert in AktuellerStand.JSON überschrieben. Somit geht die Besucherzahl nicht verloren, wenn der Raspberry Pi mal ausgeht.
Außerdem ist die Besucherzahl an das Datum gebunden und sobald ein neues Datum ist, wird diese auf Null gesetzt.

Der Raspberry Pi startet den Besucherzähler automatisch, sobald er hochgefahren ist.

Die gemessene Besucherzahl wird auf einer Webseite angezeigt. Diese läuft auf dem Raspberry Pi. Über eine WEBSocket IO wird die Besucherzahl auf der Webseite verändert, ohne dass man neu laden muss.

Sensoren und Raspberry Pi haben wir über Jumperkabel nach folgendem Steckplan verbunden:

```
Belegung Sensorpaar 
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




## Statemachine

Unsere Statemachine besteht aus zwei Pfaden „Eintreten“ und „Austreten“. Pro Pfad gibt es drei Zustände, um Ein- oder Austreten zu erkennen. Der vierte ist für die Zeitsperre notwendig. Die Inputs sind die Werte der Infrarotsensoren.

![State Machine](./public/images/StateMachine.png)

## Webseite

Nachdem wir eine gute Grundlage für das Zählen der Besucher hatten, starteten wir mit der Webseite. Grundidee war es, dass der Raspberry Pi und der Computer bzw. das Tablet im gleichen Netzwerk sind. Dafür haben wir einen eigenen Router, da wir das Schul-Netzwerk nicht wie geplant nutzen konnten. So kann man die Webseite, die auf dem Raspberry Pi läuft, von jedem Gerät im Netzwerk aus laden. Frau Ehrler kann diese Webseite auf ihrem Tablet aufrufen und die Besucherzahl sehen.

Wir überlegten uns also was alles auf die Webseite muss. Schließlich haben wir die Webseite mit Besucherzahl, Leute die sich momentan in der Bibliothek befinden, Leute die die Bibliothek verlassen haben und Banner und Schullogo entworfen.


Wir haben uns außerdem noch dazu entschieden, die Möglichkeit einzubauen, die Werte manuell zu korrigieren, für den Fall, dass der Besucherzähler einen Fehler gemacht hat.

Da es nicht möglich ist den Raspberry Pi nach unseren Vorstellungen ins Schul-Netzwerk einzubinden, entschlossen wir uns den Besucherzähler in einem eigenen Netzwerk zu betreiben. Dafür benutzen wir einen einfachen WLAN-Router.

![State Machine](./public/images/Screenshot_Website.PNG)

## Installation

Von Anfang an war klar, dass wir den Besucherzähler bzw. die zwei Sensoren an oder neben dem Türrahmen installieren wollen. Die wichtigste Frage, die wir uns dabei stellten war, in welcher Höhe wir sie anbringen sollen. Der Grund dafür waren die verschiedenen Personen die als Besucher erfasst werden sollen, z.B. kleine Kinder, große Männer, Eltern mit Kinderwägen, größere Personengruppen. Die Best mögliche Lösung erschien uns dafür ca. 30 cm über dem Boden.

Den an die Sensoren angeschlossenen Raspberry Pi wollten wir nun, zusammen mit dem Router auf den Boden neben der Tür in einer Holzbox legen. Somit ist alles kompakt und sicher angebracht. Bei einem Installationsversuch, bei dem wir die Sensoren an der beschriebenen Stelle prüfungsweise anbrachten, zählte der Besucherzähler drei echte Besucher. Dies gab uns die Versicherung, die richtige Stelle gefunden zu haben


## Schwierigkeiten

Ein anfangs großes Problem, welches beim Auslesen der Sensordaten auftrat war, dass die Werte der Sensoren beim Durchlaufen einer Person stark flackerten. Als Lösung bauten wir eine 1-Sekunden Sperre ein, die nach einem Ein- oder Austritt einsetzt. So kommt es nicht mehr zu dem Problem, dass der Besucherzähler pro Durchlauf mehr als eine Person zählt.

Ein weiteres Problem ist bei der Netzwerk für die Webseite aufgekommen. Unser Ziel war es das Schul-Netzwerk dafür zu nutzen, doch das ist leider nicht möglich, da das Schul-Netzwerk segmentiert ist. Deshalb haben wir einen eigenen Router gekauft, der das Netzwerk aufbaut. In diesem sind der Raspberry Pi und Frau Ehrlers Tablet. Der Nachteil ist, dass sie mit dem Tablet keinen Internet Zugriff mehr hat, weshalb sie nicht den Computer zum Anzeigen nutzt.


## Fazit und Reflexion:

Abschließend und zusammenfassend können wir sagen, dass dieses Projekt sehr positiv für uns verlaufen ist. Wir haben gelernt unsere Ideen zu gliedern, umzusetzen und uns eine Lösung zu überlegen, wenn etwas nicht so klappte, wie wir es uns vorstellten.

Außerdem haben wir Erfahrungen fürs Leben in den Bereichen Teamarbeit und gemeinsames Zeitmanagement gesammelt, da wir uns oft nach unserem Projektplan richten mussten und Zeitfristen setzen und einhalten mussten. Wenn also etwas nicht in der vorgesehenen Zeit funktionierte, mussten wir uns schnellst möglich Lösungen überlegen und Prioritäten setzten.

Trotzdem hatten wir generell das Problem, dass wir bei jeder Entscheidung an unserem Besucherzähler immer sehr lange überlegen mussten, da wir nie wussten welche Idee und Umsetzungsart für den Besucherzähler im Endeffekt die Beste ist.

Das Schreiben von Skripten, der Umgang mit JavaScript, CSS und HTML, so wie das praktische Zusammenbauen und Installieren war bei uns ebenfalls ein Punkt, bei dem wir dazulernen konnten, da wir viele Dinge während diesem Projekt ausprobiert, gebaut und uns ausgedacht haben, die wir normalerweise weniger ausüben.

Am meisten Spaß beim Arbeiten machte uns das kreative Lösen von Aufgaben und Hindernissen, die sich uns beim Entwickeln des Besucherzählers in den Weg stellten.
Bei einem nächsten Projekt dieser Art sollten wir uns mehr Gedanken über die Wahl der Sensoren machen, da diese oft Probleme machten und man ständig den Programmcode abändern musste, dass sie auch wirklich die Besucher zählen.
Außerdem wäre es hilfreich gewesen, zunächst Aufgaben klar zu verteilen und einen eigenen Arbeitsauftrag zu formulieren. Dies wäre für das nächste Projekt wichtig, da wir oft in die unnötige Situation kamen, dass alle Gruppenmitglieder dasselbe bearbeiteten und wir somit Zeit verschwendeten.

Trotzdem war es alles in allem ein sehr schönes Projekt bei dem man viel für die Zukunft lernen konnte. Die Aufgabenstellung war außerdem sehr passend für unsere Gruppe, aus dem Grund, dass wir uns alle für das Programmieren interessierten. Das Projekt, einen Besucherzähler zu bauen, stellte für uns alle eine Herausforderung und ein tolles Projekt dar.
