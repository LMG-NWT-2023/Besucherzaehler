var Gpio = require('onoff').Gpio //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out') //use GPIO pin 4 as output
var sensor1 = new Gpio(17, 'in', 'both') //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var sensor2 = new Gpio(25, 'in', 'both') //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

var sensor1Value = 0
var sensor2Value = 0
//var triggeredBy = 'unknown'

var prevValue1 = 0
var prevValue2 = 0

var durchlauf = false

var besucherzahl = 0


function logSensors() {
  //Funtkion wird nur ausgeführt wenn sich wert ändert 
  if(sensor1Value == 0 && sensor2Value == 1 && durchlauf == false)
  {
    durchlauf = true
  }

  if(durchlauf == true && sensor1Value == 0 && sensor2Value == 0)
  {
    durchlauf = false 
    //Ein vollständiger durchlauf
    besucherzahl ++
    console.log('Besucher:' + besucherzahl)

  }

    console.log(`${new Date().getUTCMilliseconds()}: Sensor links: ${sensor1Value} - Sensor rechts: ${sensor2Value} }`)
}

sensor1.watch( (err, value) => { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err) //output error message to console
  return
  }
//   console.log(`sensor 1: ${value}`) //turn LED on or off depending on the button state (0 or 1)
  sensor1Value = value
  triggeredBy = 'left'
  if(sensor1Value != prevValue1)
  {
    logSensors()
  }

  prevValue1 = value
})

sensor2.watch( (err, value) => {
    if (err) {
        console.error(err)
        return
    } 
    // console.log(`sensor 2: ${value}`)
    sensor2Value = value
    triggeredBy = 'right'
    if(sensor2Value != prevValue2)
    {
      logSensors()
    }
    
    prevValue2 = value
})



function unexportOnClose() { //function to run when exiting program
  //LED.writeSync(0) // Turn LED off
  // LED.unexport() // Unexport LED GPIO to free resources
  sensor1.unexport() // Unexport Button GPIO to free resources
  sensor2.unexport()
  console.log('sensor auslesen beendet')
}

process.on('SIGINT', unexportOnClose) //function to run when user closes using ctrl+c