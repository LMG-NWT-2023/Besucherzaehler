var Gpio = require('onoff').Gpio //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out') //use GPIO pin 4 as output
var sensor1 = new Gpio(17, 'in', 'both') //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var sensor2 = new Gpio(25, 'in', 'both') //use GPIO pin 25 as input, and 'both' button presses, and releases should be handled
const {States, SensorStateMachine} = require('./SensorStateMachine')
const sensorStateMachine = new SensorStateMachine()

var prevValue1 = 0
var prevValue2 = 0

 
sensor1.watch( (err, value) => { //Watch for hardware interrupts on pushButton GPIO, specify callback function

  if(err) 
  { 
    //if an error
    console.error('There was an error', err) //output error message to console
    return
  }

  
  if(value != prevValue1)
  {
    sensorStateMachine.input({ Sensor1: value, Sensor2: prevValue2 })
  }

  prevValue1 = value
})

sensor2.watch( (err, value) => {

    if(err) 
    {
        console.error(err)
        return
    } 


    if(value != prevValue2)
    {
      sensorStateMachine.input({ Sensor1: prevValue1, Sensor2: value })
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
