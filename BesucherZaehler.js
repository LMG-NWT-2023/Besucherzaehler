var Gpio = require('onoff').Gpio //include onoff to interact with the GPIO
const fs = require('fs')
const {States, SensorStateMachine} = require('./SensorStateMachine')

const FileNameAktuellerStand = 'AktuellerStand.json'
const sensorStateMachine = new SensorStateMachine()

var prevValue1 = 0
var prevValue2 = 0

var sensor1
var sensor2

var inDemoMode = false

// wenn wir nich auf dem Raspberry Pi laufen, nehmen wir einfach zufällige Werte

try {
    var sensor1 = new Gpio(17, 'in', 'both') //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
    var sensor2 = new Gpio(25, 'in', 'both') //use GPIO pin 25 as input, and 'both' button presses, and releases should be handled    

    sensor1.watch( (err, value) => { //Watch for hardware interrupts on pushButton GPIO, specify callback function

        if(err) 
        { 
          //if an error
          console.error('There was an error', err) //output error message to console
          return
        }
      
        if(value != prevValue1)
        {
          // logSensors()
          prevValue1 = value
          console.log(`sensor1: ${prevValue1}  sensor2: ${prevValue2}`)
          sensorStateMachine.input({Sensor1: value, Sensor2: prevValue2})
          sensorStateMachine.log()
        }
      })
      
      sensor2.watch( (err, value) => {
          if(err) 
          {
              console.error(err)
              return
          } 
      
          if(value != prevValue2)
          {
            // logSensors()
            prevValue2 = value
            console.log(`sensor1: ${prevValue1}  sensor2: ${prevValue2}`)
            sensorStateMachine.input({Sensor1: prevValue1, Sensor2: value})
            sensorStateMachine.log()
          }
      })
      
      function unexportOnClose() 
      {
        //function to run when exiting program
        //LED.writeSync(0) // Turn LED off
        // LED.unexport() // Unexport LED GPIO to free resources
        sensor1.unexport() // Unexport Button GPIO to free resources
        sensor2.unexport()
        console.log('sensor auslesen beendet')
        process.exit()
      }
      
      process.on('SIGINT', unexportOnClose) //function to run when user closes using ctrl+c      
} catch (error) {
    console.log('hier gibt es keine Sensoren. Die Besucherzahlen werden gewürfelt')
    inDemoMode = true
}

class BesucherZaehler{
    socketIO = undefined
    
    constructor() {
        fs.readFile(FileNameAktuellerStand, (err, data) => {
            if (err) {
                console.log(`Lesen des aktuellen Standes fehlgeschlagen: ${err}`)
            } else {
                try {
                    const letzterAktuellerStand = JSON.parse(data)
                    sensorStateMachine.setzeAktuellenStand(letzterAktuellerStand)
                    console.log('Besucherzähler wurde mit dem letzten Stand gesartet:', sensorStateMachine.aktuellerStand() )
                } catch (error) {
                    console.log('FEHLER: Der letzte Zäherstand konnte nicht gelesen werden.')                    
                }
            }
        })
    }
    
    setSocketIO(io) {
        this.socketIO = io

        if (inDemoMode) {
            setInterval(() => {
                const zaehlerStand = this.randomBesucher()
                console.log(`random Zählerstand: ${zaehlerStand.besucher}`)
                this.socketIO.emit('BesucherZaehler', zaehlerStand)
            }, 2000)
        } else {
            sensorStateMachine.onChange( (zaehlerStand)=> {
                console.log(`neuer Zählerstand: ${zaehlerStand.besucher}`)
                this.socketIO.emit('BesucherZaehler', zaehlerStand)
                // schreibe Aktuellen Stand in Datei, damit wir beim Neustart die Werte aufrufen können
                const aktuellerStand = JSON.stringify(zaehlerStand)
                fs.writeFile(FileNameAktuellerStand, aktuellerStand, (err) => {
                    if (err) {
                        console.log(`Schreiben des aktuellen Standes fehlgeschlagen: ${err}`)
                    }
                })
            })
        }
    }
    
    sendeAktuellenStand() {
        if (!inDemoMode && this.socketIO) {
            this.socketIO.emit('BesucherZaehler', sensorStateMachine.aktuellerStand())
        }
    }

    randomBesucher() {
        const eingetreten = Math.floor(Math.random() * 15) + 4;
        const ausgetreten = Math.floor(Math.random() * eingetreten);
        return {
            besucher: eingetreten,
            momentan: eingetreten - ausgetreten, 
            ausgetreten: ausgetreten
        }
    }

    aktuellerStand() {
        var zaehlerStand
        if (inDemoMode){
            zaehlerStand = this.randomBesucher()
        } else {
            zaehlerStand = sensorStateMachine.aktuellerStand()
        }

        return zaehlerStand
    }
}

exports.BesucherZaehler = BesucherZaehler