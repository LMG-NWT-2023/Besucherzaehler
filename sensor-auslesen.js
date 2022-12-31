var Gpio = require('onoff').Gpio //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out') //use GPIO pin 4 as output
var sensor1 = new Gpio(17, 'in', 'both') //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var sensor2 = new Gpio(25, 'in', 'both') //use GPIO pin 25 as input, and 'both' button presses, and releases should be handled


//1 wenn Sensor etwas erfasst, 0 wenn Sensor nichts erfasst
var sensor1Value = 0
var sensor2Value = 0

var prevValue1 = 0
var prevValue2 = 0

var durchlauf = false
var rückgang = false

var besucherzahl = 0
var momentaneKunden = 0
var rausgegangen = 0

var durchlaufstart
var durchlaufende = new Date()

var timeout = true


 //Funktion wenn sich ein Wert der Sensoren ändert
function logSensors() {

  //Erkennt Anfang von einem Eingang wenn alles wieder in Ausgangsposition ist
  if(sensor1Value === 0 && sensor2Value === 1 && !durchlauf && !rückgang && timeout)
  {
    durchlaufstart = new Date()
    timeout = false
    durchlauf = true
  }

  
  //Wenn eine Person von Außen nach Innen gegangen ist
  if(durchlauf && sensor1Value === 0 && sensor2Value === 0 && !rückgang)
  {
    durchlauf = false 
    besucherzahl ++

    durchlaufende = new Date()

    setTimeout(() => {timeout = true}, 1000)

    momentaneKunden = (besucherzahl - rausgegangen)
    var durchlaufdauer = (durchlaufende.getTime() -durchlaufstart.getTime()) / 1000

    //Zeigt Besucherzahl, Kunden im Moment und Durchlaufdauer an
    console.log('Besucher: ' + besucherzahl + '   ' + 'Im Moment in der Bibliothek: ' + momentaneKunden + '   ' + 'Durchlaufdauer: ' + durchlaufdauer)

    //Jetzt ist ein vollständiger Durchgang beendet
  }


  //Erkennt Anfang von einem Ausgang wenn alles wieder in Ausgangsposition ist
  if(!durchlauf && sensor1Value == 1 && sensor2Value == 0 && timeout)
  {
    rückgang = true
    timeout = false
  }
  

  //Wenn eine Person von Innen nach Außen gegangen ist
  if(rückgang && sensor1Value == 0 && sensor2Value == 0)
  {
    rückgang = false
    rausgegangen ++

    setTimeout(() => {timeout = true}, 1000)

    momentaneKunden = (besucherzahl - rausgegangen)
    console.log('Haben die Bibliothek verlassen: ' + rausgegangen + '   ' + 'Im Moment in der Bibliothek: ' + momentaneKunden)
  }
  
  console.log(`${new Date().getUTCMilliseconds()}: Sensor links: ${sensor1Value} - Sensor rechts: ${sensor2Value} }`)
}


sensor1.watch( (err, value) => { //Watch for hardware interrupts on pushButton GPIO, specify callback function

  if(err) 
  { 
    //if an error
    console.error('There was an error', err) //output error message to console
    return
  }

  sensor1Value = value

  if(sensor1Value != prevValue1)
  {
    logSensors()
  }

  prevValue1 = value
})

sensor2.watch( (err, value) => {

    if(err) 
    {
        console.error(err)
        return
    } 

    sensor2Value = value

    if(sensor2Value != prevValue2)
    {
      logSensors()
    }
    
    prevValue2 = value
})


function unexportOnClose() 
{
  //function to run when exiting program
  //LED.writeSync(0) // Turn LED off
  // LED.unexport() // Unexport LED GPIO to free resources
  sensor1.unexport() // Unexport Button GPIO to free resources
  sensor2.unexport()
  console.log('sensor auslesen beendet')
}

process.on('SIGINT', unexportOnClose) //function to run when user closes using ctrl+c
