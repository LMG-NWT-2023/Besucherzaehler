![LMG Logo](./public/images/lmg.png)
# Dokumentation

## Einleitung

Dieses Dokumantation beschreibt den Werdegang unseres Projektes "Einen Besucherzähler bauen", welches wir im Zuge unseres NWT Unterrichts in der Schule und Zuhause vom 29.11.2022 bis am 22.3.2023 bearbeitet haben. Das Projekt wurde von der Bibliothekarin Frau Ehrler in Auftrag gegeben. Das Ziel war es einen Besucherzähler für die Bücherei zu bauen, der dort die Besucher zählen kann.
Es werden Erläuterungen zur Funktionsweise sowie Skizzen und Fotos von verschiedenen Bereichen der Arbeitsphase zur Veranschaulichung und Erklärung unseres Projektes dargestellt.
Ziel dieser Dokumentation ist es, den allgemeinen Prozess des Projektes, von Start- und Planungsphase bis zu Installation und Fazit unseres Projektes aufzuzeigen und zu verdeutlichen











## Start- und Planungsphase: 

Um die Personen zu erfassen, welche die Bibliothek besuchen, entschieden wir uns für zwei Infrarotsensoren. Somit brauchen wir keinen Reflektor auf der anderen Seite. Zum Auslesen dieser Daten benutzen wir einen Raspberry Pi. Am Anfang wussten wir noch nicht, wie Frau Ehler die Daten bekommen und lesen soll. Unser Ziel war es jedoch die Daten des Besucherzählers auf einer Webseite darzustellen, damit die Besucherzahl über Computer, Handy oder Tablet erreichbar ist. Vorteilhaft an dieser Lösung ist, dass der Raspberry Pi keinen eigenen Display braucht.
Zu Beginn überlegten wir, ob wir einen schon fertigen Besucherzähler im Internet kaufen wollen und uns nur auf die Benutzeroberfläche konzentrieren, oder den Besucherzähler und die Website selber programmieren. Wir entschieden uns dafür, einen kompletten Besucherzähler zu bauen.
Nach dem Kick-Off Gespräch am 7.12.2022 schickten wir Frau Ehrler unser Projektangebot, welchem sie zustimmte. Dieses Angebot lässt sich in folgenden Muss-, Soll- und Kann-Zielen definieren.

Muss-Ziel: 
* Einen Besucherzähler programmieren und in der Bücherei installieren. Die von dem Besucherzähler erfassten Messdaten leicht abrufbar machen

Soll-Ziel: 
* Eine freundliche Benutzeroberfläche zu designen und eine handliche und schöne Hardware zu entwerfen. 

Kann-Ziel: 
* Die Messwerte möglichst auf allen Geräten in der Bücherei abrufbar machen.

Ein automatisches Auswerten der Messwerte
Des Weiteren entwarfen wir einen Projektstrukturplan, in dem wir alle anstehenden Aufgaben zeitlich einteilten zum allgemeinen Überblick unseres Projektes. Mit unserem von Frau Ehrler gestellten Budget von 250 Euro erstellten wir uns nun einen Kostenplan. Zunächst benötigten wir zwei Sensoren, einen Raspberry Pi, der uns als Computer dienen soll und evtl. Strom- und LAN-Kabel zur Installation in der Bücherei. Außerdem versuchten wir in einer Risikoanalyse zu veranschaulichen welche möglichen Risiken und Probleme während des Projektes uns zum Verhängnis werden könnten und welche Möglichkeit wir haben diesen vorrausschauend aus dem Weg zu gehen. Dazu hatten wir noch die sinnvolle Idee Github zum gleichzeitigen Arbeiten, Austauschen von Daten und zur Projektübersicht zu nutzen.

## Start der Entwicklung

Als wir uns zum ersten Mal trafen, um an dem Projekt zu arbeiten, hatten wir einen Raspberry Pi, zwei Infrarotsensoren und einige Kabel sowie Widerstände etc. zur Verfügung. Der aller erste Schritt war es, erstmal irgendwelche Daten aus den Sensoren ablesen zu können. Also folgten wir einer Anleitung im Internet und hatten nach ca. 30 Minuten die Sensoren an dem Raspberry Pi angeschlossen, welcher wiederum an einen Computer angeschlossen war. In JavaScript haben wir dann ein kleines Skript geschrieben, welches die elektrischen Signale der Sensoren in Nullen und Einsen umwandelt. Auf einer Konsole konnten wir dann sehen, ob die Sensoren etwas erfassen oder nicht.
Damit wir wissen ob eine Person die Bücherei betritt oder verlässt, benutzen wir zwei Sensoren. Je nach dem welcher Sensor als erstes aktiviert wird, wissen wir ob eine Person ein- oder austretet.
Noch am selben Tag hatten wir ein Prototyp-Skript geschrieben, welches bereits eintretende und austretende Besucher erkennen konnte und die Anzahl der Besucher erfassen konnte.

Wir haben uns dazu entschieden in der Programmiersprache JavaScript zu schreiben, da wir später im Projekt die Besucherdaten auf eine Webseite hochladen wollen, damit Frau Ehrler einfach auf sie zugreifen kann. In der Webentwicklung arbeitet man üblich mit den Sprachen HTML, CSS und JavaScript zusammen.

Unser Prototyp-Skript funktionierte ziemlich gut für einen langsamen Ein- und Austritt, jedoch fielen uns langsam immer mehr und mehr Einzelfälle ein, mit denen unser Skript nicht klarkommen würde. Was passiert zum Beispiel, wenn eine Person den ersten Sensor aktiviert, dann aber umdreht und wieder zurückgeht? Oder was passiert, wenn aus irgendeinem Grund beide Sensoren gleichzeitig aktiviert werden?
Nach einiger Recherche haben wir herausgefunden, dass es sinnvoll wäre eine Statemachine zu entwickeln.

## Funktionsweise

Auf dem Raspberry Pi läuft das Betriebssystem [Raspberry Pi OS Lite](https://www.raspberrypi.com/documentation/computers/getting-started.html#installing-the-operating-system), welches keine grafische Oberfläche beinhaltet. Diese wird auch nicht benötigt, weil die Entwicklung über das Netzwerk z.B. von Windows oder macOS aus erfolgt.

Als Programmiersprache nutzen wir für den Besucherzähler JavaSkript und die Webseite HTML, CSS und JavaScript. Den gesamten Sorce Code inclusive Dokumentation haben wir auf Git Hub Abgelegt. Dadurch konnten wir einfach den neusten Stand untereinander austauschen.

Anfangs schrieben wir ein sehr einfaches Programm, das die Sensordaten auswertete. Dieses funktionierte ziemlich gut für langsames ein- und austreten, jedoch fielen uns immer mehr Sonderfälle ein, mit denen unser Programm nicht umgehen konnte. Was passiert zum Beispiel, wenn eine Person den ersten Sensor aktiviert, dann aber umdreht und wieder zurückgeht? Oder was passiert, wenn aus irgendeinem Grund beide Sensoren gleichzeitig aktiviert werden?
Nach einiger Recherche haben wir uns für eine Statemachine entschieden, um mit den Sensorzuständen besser umzugehen.

In der Datei "SensorStateMachine.js" erkennt man gut die einzelnen Zustände. 
## Statemachine

Eine Statemachine kann verschiedene Zustände haben. Manche Zustände können nur erreicht werden, wenn ein bestimmter Zustand herrscht und dazu eine Bedingung erfüllt wird.
Als Beispiel haben wir eine Pflanze die den Zustand „Samen“ hat. Wenn nun die Bedingung „Regen“ erfüllt wird, wechselt die Pflanze in den Zustand „Sprosse“.
Durch diese Zustände und Bedingungen können sich Pfade entwickeln.
Bei unserem Besucherzähler haben wir die Pfade „Eintreten“ und „Austreten“.

Als wir dieses ganze Konzept in die Praxis umgesetzt hatten, ließen wir einige Tests laufen. Diese Testdurchläufe liefen überraschend gut.

## Webseite

Nachdem wir eine gute Grundlage für das Zählen der Besucher hatten, starteten wir mit der Webseite. Grundidee war es, dass der Raspberry Pi und der Computer bzw. das Tablet im gleichen Netzwerk sind. So kann man die Webseite, die auf dem Raspberry Pi läuft, von jedem Gerät im Netzwerk aus laden. Frau Ehrler kann diese Webseite auf ihrem Tablet aufrufen und die Besucherzahl sehen.
Wir überlegten uns also was alles auf die Webseite muss. Schließlich haben wir die Webseite mit Besucherzahl, Leute die sich momentan in der Bibliothek befinden, Leute die die Bibliothek verlassen haben, Banner und Schullogo entworfen.

Wir haben uns außerdem noch dazu entschieden, die Möglichkeit einzubauen, die Werte manuell zu korrigieren, für den Fall, dass der Besucherzähler einen Fehler gemacht hat.

Da es nicht möglich ist den Raspberry Pi nach unseren Vorstellungen ins Schul-Netzwerk einzubinden, entschlossen wir uns den Besucherzähler in einem eigenen Netzwerk zu betreiben. Dafür benutzen wir einen einfachen WLAN-Router.

## Installation

Von Anfang an war klar, dass wir den Besucherzähler bzw. die zwei Sensoren an oder neben dem Türrahmen installieren wollen. Die wichtigste Frage, die wir uns dabei stellten war, in welcher Höhe wir sie anbringen sollen. Der Grund dafür waren die verschiedenen Personen die als Besucher erfasst werden sollen, z.B. kleine Kinder, große Männer, Eltern mit Kinderwägen, größere Personengruppen. Die Best mögliche Lösung erschien uns dafür ca. 30 cm über dem Boden.

Den an die Sensoren angeschlossenen Raspberry Pi wollten wir nun, zusammen mit dem Router auf den Boden neben der Tür in einer Holzbox legen. Somit ist alles kompakt und sicher angebracht. Bei einem Installationsversuch, bei dem wir die Sensoren an der beschriebenen Stelle prüfungsweise anbrachten, zählte der Besucherzähler drei echte Besucher. Dies gab uns die Versicherung, die richtige Stelle gefunden zu haben


## Schwierigkeiten/Risiken 

Ein anfangs sehr großes Problem welches beim Programmieren der Sensoren auftrat war, dass die Anzeigewerte der Sensoren beim Durchlaufen einer Person enorm flackerten. Nach längerem Überlegen kam uns die Idee, eine 1-Sekunden Sperre einzubauen, nachdem eine Person durch die Sensoren läuft. So kam es nicht mehr zu dem Problem, dass der Besucherzähler pro Person mehrere 100 Male Werte anzeigte und außerdem verhinderte es, dass mehrere Personen gleichzeitig unübersichtlich aufgezeigt werden, sondern nur eine Person pro Sekunde durchlaufen kann.

Ein weiteres Problem lag darin, dass wir für das Installieren des Besucherzählers in der Bibliothek eigentlich planten, mit einem LAN-Kabel oder mit WLAN ins gleiche Netzwerk wie Frau Ehrler mit ihrem Computer zu gehen. Dies hatte das Ziel, dass sie dadurch mit der Webseite des Besucherzählers die Messwerte aufrufen kann. Allerdings mussten wir für diesen Zugang erst an Erlaubnis gelangen, weswegen wir mit Herrn Baumhof korrespondierten. Leider erfuhren wir von ihm, dass es unter keinen Umständen möglich sein würde, in dasselbe Netzwerk wie Frau Ehrler mit ihrem Computer zu kommen.
Letztendlich haben wir uns dazu entschlossen unseren Raspberry Pi in unserem eigenen Netzwerk zu lassen und dazu in der Bibliothek unseren eigenen Router mit anzubringen. Dadurch kann sich Frau Ehrler mit einem anderen Gerät in unser Netzwerk einloggen und bekommt dadurch Zugriff auf die Messdaten auf der Webseite.


## Fazit und Reflexion:

Abschließend und zusammenfassend können wir sagen, dass dieses Projekt sehr positiv für uns verlaufen ist. Wir haben gelernt unsere Ideen zu gliedern, umzusetzen und uns eine Lösung zu überlegen, wenn etwas nicht so klappte, wie wir es uns vorstellten.

Außerdem haben wir Erfahrungen fürs Leben in den Bereichen Teamarbeit und gemeinsames Zeitmanagement gesammelt, da wir uns oft nach unserem Zeitprojektplan richten mussten und Zeitfristen setzen und einhalten mussten. Wenn also etwas nicht in der vorgesehenen Zeit funktionierte, mussten wir uns schnellst möglich Lösungen überlegen und Prioritäten setzten.

Trotzdem hatten wir generell das Problem, dass wir bei jeder Entscheidung an unserem Besucherzähler immer sehr lange überlegen mussten, da wir nie wussten welche Idee und Umsetzungsart für den Besucherzähler im Endeffekt die Beste ist.

Das Schreiben von Skripten, der Umgang mit JavaScript, CSS und HTML, so wie das praktische Zusammenbauen und Installieren war bei uns ebenfalls ein Punkt, bei dem wir dazulernen konnten, da wir viele Dinge während diesem Projekt ausprobiert, gebaut und uns ausgedacht haben, die wir normalerweise weniger ausüben.

Am meisten Spaß beim Arbeiten machte uns das kreative Lösen von Aufgaben und Hindernissen, die sich uns beim Entwickeln des Besucherzählers in den Weg stellten.
Bei einem nächsten Projekt dieser Art sollten wir uns mehr Gedanken über die Wahl der Sensoren machen, da diese oft Probleme machten und man ständig den Programmcode abändern musste, dass sie auch wirklich die Besucher zählen.
Außerdem wäre es hilfreich gewesen, zunächst Aufgaben klar zu verteilen und einen eigenen Arbeitsauftrag zu formulieren. Dies wäre für das nächste Projekt wichtig, da wir oft in die unnötige Situation kamen, dass alle Gruppenmitglieder dasselbe bearbeiteten und wir somit Zeit verschwendeten.

Trotzdem war es alles in allem ein sehr schönes Projekt bei dem man viel für die Zukunft lernen konnte. Die Aufgabenstellung war außerdem sehr passend für unsere Gruppe, aus dem Grund, dass wir uns alle für das Programmieren interessierten. Das Projekt, einen Besucherzähler zu bauen, stellte für uns alle eine Herausforderung und ein tolles Projekt dar.