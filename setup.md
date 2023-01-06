# RaspiBesucher - System Setup 

## Motivation 

Das ist die Anleitung, wie das Betriebssystem für den Raspberry Pi aufgesetzt wird, auf dem dann der Besucherzähler entwickelt werden kann. 

Als Betriebssystem setzen wir auf die 32-bit Version von Raspberry Pi OS Lite. 

Die Version "Lite" beinhaltet keine grafische Oberfläche. Diese wird auch nicht benötigt, weil die Entwicklung über das Netzwerk z.B. von Windows oder macOS aus erfolgt. Der Raspberry Pi wird als Server betrieben, an den die Sensoren angeschlossen sind und auf dem ein Webserver laufen wird, der die Besucherzahl zur Verfügung stellt. 

Der Quellcode wird auf GitHub abgelegt. Zusätzlich ist das Verzeichnis `~/development` auf dem Raspberry Pi über die Dateifreigabe erreichbar. 

Neben `git` wird auch das Command-Line-Interface von GitHub installiert, um eine einfache Authentifizierung über den Webbrowser zu ermöglichen. 

Auf dem Raspberry Pi gibt es zunächst nur einen Benutzer `pi`, der von allen Schülern im Projektteam genutzt wird. Das Passwort ist allen bekannt. 

Für die Entwicklung nutzen wir Javascript. Um Javascript auf dem Server auszuführen brauchen wir [nodejs](https://nodejs.org). 

## Einrichtung

Mit dem Raspberry-Imager ein neues OS-Lite auf eine SD-Karte schreiben. 32bit Version.

Dann Raspberry Pi an ein Display und eine Tastatur anschließen und starten.

```
Neuer Nutzer: pi
Passwort vergeben, das im Team bekannt ist
```

Danach anmelden und die folgenden Schritte ausführen: 

### System aktualisieren

```
sudo apt-get update
sudo apt-get upgrade
```


### raspi-config

```
sudo raspi-config
```

Hier folgende Funktionen konfigurieren: 

* Interface-Options - SSH - enable ssh
* hostname: `raspibesucher`
* enable WLAN wenn verfügbar

### Reboot

Der Neustart wird normalerweise direkt von raspi-config vorgeschlagen. Fall nicht: 

```
sudo reboot now
```

### Git & GitHub 

```
sudo apt-get install git-all
```

Danach das Command Line Interface von GitHub `gh` installieren, wie in der Anleitung beschrieben: [github CLI](https://github.com/cli/cli/blob/trunk/docs/install_linux.md) 


### node.js 

NodeJs installieren: [nodesource](https://github.com/nodesource/distributions/blob/master/README.md)



### Dateifreigabe

Basierend auf dieser Seite: [https://www.elektronik-kompendium.de/sites/raspberry-pi/2007071.htm](https://www.elektronik-kompendium.de/sites/raspberry-pi/2007071.htm)


```
sudo apt-get update
sudo apt-get install samba samba-common smbclient
```


Dann prüfen wir, ob Samba läuft.

```
sudo service smbd status
sudo service nmbd status
```

Original-Konfiguration sichern:

```
sudo mv /etc/samba/smb.conf /etc/samba/smb.conf_alt
```

Neue Konfiguration anlegen und das Verzeichnis `development` für den Benutzer `pi` freigeben.

Editor für neue Konfiguration öffnen: 

```
sudo nano /etc/samba/smb.conf
```


Inhalt: 

```
[global]
workgroup = WORKGROUP
security = user
encrypt passwords = yes
client min protocol = SMB2
client max protocol = SMB3

[piDevelopment]
comment = Samba-Development-Freigabe
path = /home/pi/development
read only = no
```


SMB-Passwort für den Benutzer `pi` anlegen. 

```
sudo smbpasswd -a pi
```

Dienste neu starten:

```
sudo service smbd restart
sudo service nmbd restart
```


## GitHub-Login mit dem `gh`-CLI

[Dokumentation zum CLI
](https://cli.github.com/manual/)

Login kann ganz einfach über der Command-Line-Interface (`CLI) von guten ausgeführt werden.

Ich finde die Authentifizierung über den Browser ganz sinnvoll, weil ich so meine Github-Passwort nicht eingeben muss.


```
gh auth login
```

Am Ende kann man sich einfach abmelden: 

```
gh auth logout
```


## Repository clonen

Jetzt kann einfach ein Repository von GitHub auf des Raspberry Pi geklont werden: 

```
gh repo clone https://github.com/vincenttraxel/gpio-eins.git
```


Weil die Commits wahrscheinlich auf dem lokalen Desktop-Computer über die Dateifreigabe erstellt werden, kann man sich jetzt gerne wieder abmelden: 

```
gh auth logout
```
