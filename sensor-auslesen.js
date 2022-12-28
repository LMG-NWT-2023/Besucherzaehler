var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output
var sensor1 = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var sensor2 = new Gpio(25, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var sensor1Value = 0
var sensor2Value = 0

function logSensors() {
    console.log(`${new Date().getUTCMilliseconds()}: Sensor links: ${sensor1Value} - Sensor rechts: ${sensor2Value}`)
}

sensor1.watch( (err, value) => { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
//   console.log(`sensor 1: ${value}`); //turn LED on or off depending on the button state (0 or 1)
  sensor1Value = value
  logSensors()
});

sensor2.watch( (err, value) => {
    if (err) {
        console.error(err)
        return
    } 
    // console.log(`sensor 2: ${value}`)
    sensor2Value = value
    logSensors()
})

function unexportOnClose() { //function to run when exiting program
  //LED.writeSync(0); // Turn LED off
  // LED.unexport(); // Unexport LED GPIO to free resources
  sensor1.unexport(); // Unexport Button GPIO to free resources
  sensor2.unexport()
  console.log('sensor auslesen beenden')
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c